import { InvoiceValues } from "@component/utils/form/initial-values";
import { invoice } from "@api/network";
import { baseUrlPurchaseOrder } from "@api/base-url";
import { CompanyValuesType } from "@component/utils/type/interfaces";
import axios from "axios";
import { useMutation } from "react-query";
import { Close, Delete, Edit } from "@mui/icons-material";
import { detailsViewBut, editIcon, countLine, flex, deleteBut } from "css/styles";
import { useState } from "react";
import { DeleteAlert, FailureAlert, LoadingAlert, SuccessAlert } from "@common/toastify";
import { InVoiceColums } from "@component/utils/form/constant";
import Swal from "sweetalert2";
import usePurchaseOrder from "@component/purchase-orders/purchase-order-hook";
import { getInvoice } from "@api/get-api-queries";

export default function useInVoice() {
	const [menuCustomer, setMenuCustomer] = useState(false);
	const [fetchagain, setFetchAgain] = useState(false);
	const [loader, setLoader] = useState(false);
	const [InvoiceValue, setInvoiceValue] = useState<any>(InvoiceValues);
	const { isOpenCustomer, handleCustomerView, customerObj } = usePurchaseOrder();
	const columns = InVoiceColums;
	const [IsOpenPo, setIsOpenPo] = useState(false);
	const [PoDetails, setPoDetails] = useState([]);
	const [tableData, setTableData] = useState([]);
	const [page, setPage] = useState(1);
	const [totalCount, setTotalCount] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(5);
	const handleChangePage = (event: any, newPage: any) => {
		setPage(newPage);
	};
	const handleChangeRowsPerPage = (event: any) => {
		setRowsPerPage(event.target.value);
	};
	const { invoices } = getInvoice(page, rowsPerPage);

	const handlePoView = (item: any, type: any) => {
		setIsOpenPo(!IsOpenPo);
		let list: any = [];
		if (type === "view") {
			let obj = [
				item.order_number,
				item.has_raw_material === true ? "Yes" : "No",
				item.issued_date
					? `${String(new Date(item.issued_date)).slice(3, 10)},${String(new Date(item.issued_date)).slice(
							10,
							16
					  )}`
					: "_",
				item.products ? (
					<b className={detailsViewBut}>
						Count
						<span className={countLine}></span> {item.products.length}
					</b>
				) : (
					"_"
				)
			];
			list.push(obj);
			setPoDetails(list);
		}
	};

	const mutation = useMutation(
		(createCompany: CompanyValuesType) => {
			LoadingAlert();
			return axios.post(baseUrlPurchaseOrder + invoice, createCompany);
		},
		{
			onSuccess: (temp) => {
				Swal.close();
				SuccessAlert("Invoice Added SuccessFully");
				window.open(temp.data.link);
				invoices.refetch();
				setFetchAgain(true);
				setMenuCustomer(!menuCustomer);
			},
			onError: (error) => {
				Swal.close();
				let errorMsg: any = error;
				FailureAlert(errorMsg.response.data.message);
			}
		}
	);
	const mutationEdit = useMutation(
		(createCompany: any) => {
			LoadingAlert();
			return axios.patch(baseUrlPurchaseOrder + `${invoice}/${createCompany.id}`, createCompany.name);
		},
		{
			onSuccess: () => {
				Swal.close();
				SuccessAlert("Saved Changes SuccessFully!");
				invoices.refetch();
				setFetchAgain(true);
				setMenuCustomer(!menuCustomer);
			},
			onError: (error) => {
				Swal.close();
				let errorMsg: any = error;
				FailureAlert(errorMsg.response.data.message);
			}
		}
	);

	const mutationDelete = useMutation(
		(createCompany: any) => {
			LoadingAlert();
			return axios.delete(baseUrlPurchaseOrder + `${invoice}/${createCompany.id}`);
		},
		{
			onSuccess: () => {
				Swal.close();
				SuccessAlert("Deleted SuccessFully!");
				invoices.refetch();
				setFetchAgain(true);
			},
			onError: (error) => {
				Swal.close();
				let errorMsg: any = error;
				FailureAlert(errorMsg.response.data.message);
			}
		}
	);

	const onClick = async (values: any, type: string, id: string) => {
		if (type === "customer") {
			setMenuCustomer(!menuCustomer);
		} else if (type === "delete") {
			DeleteAlert(mutationDelete, id);
		} else {
			if (type == "close") {
				if (!id) {
					let details: any = {
						associated_poId: values.associated_poId,
						cost_per_kg: values.cost_per_kg,
						coating_discount: values.coating_discount,
						tax: values.tax
					};
					mutation.mutate(details);
				} else {
					let data: any = {
						name: {
							associated_poId: values.associated_poId,
							cost_per_kg: values.cost_per_kg,
							coating_discount: values.coating_discount,
							tax: values.tax
						},
						id: id
					};
					mutationEdit.mutate(data);
				}
			} else {
				if (id) {
					setInvoiceValue({
						...InvoiceValues,
						["associated_poId"]: { name: values.associated_po, id: values.associated_po.id },
						["cost_per_kg"]: values.cost_per_kg,
						["coating_discount"]: values.coating_discount,
						["tax"]: values.tax,
						["mailToCustomer"]: values.mailToCustomer
					});
				} else {
					setInvoiceValue({ ...InvoiceValues, ["associated_poId"]: { name: {}, id: "" } });
				}
				setMenuCustomer(!menuCustomer);
			}
			setMenuCustomer(!menuCustomer);
		}
	};
	const getAllLedgerList = async () => {
		setLoader(true);
		if (!invoices.isLoading || fetchagain) {
			let list: any = [];
			let inVoiceDetails = await invoices.data;
			setTotalCount(inVoiceDetails?.count);
			const moduleData = JSON.parse(localStorage.getItem("userdata"));
			let objModulesData: any = { controls: [] };
			if (moduleData) {
				if (moduleData.user.role !== "Admin" && moduleData.user.role !== "SuperAdmin") {
					moduleData.user.modules.map((moduleValue: any) => {
						if (moduleValue.name === "PurchaseOrders") {
							objModulesData = moduleValue;
						}
					});
				} else {
					objModulesData = { controls: ["Read", "Edit", "Delete"] };
				}
			}
			inVoiceDetails?.data.forEach((item: any, index: number) => {
				let objData = [
					rowsPerPage * page + index - rowsPerPage + 1,
					<span className={detailsViewBut} onClick={() => handlePoView(item.associated_po, "view")}>
						P.O Info
					</span>,
					item.challan_number,
					item.net_weight,
					item.cost_per_kg,
					item.tax,
					item.coating_amount,
					item.coating_discount,
					item.gross_amount,
					item.net_amount,
					item.final_amount,
					item.issued_date
						? `${String(new Date(item.issued_date)).slice(3, 10)},${String(
								new Date(item.issued_date)
						  ).slice(10, 16)}`
						: "_",
					<div className={flex}>
						{objModulesData.controls.includes("Edit") && (
							<Edit className={editIcon} onClick={() => onClick(item, "open", item.id)} />
						)}
						{objModulesData.controls.includes("Delete") && (
							<Delete className={deleteBut} onClick={() => onClick(item, "delete", item.id)} />
						)}
					</div>
				];
				list.push(objData);
			});
			setTableData(list);
			setFetchAgain(false);
			setLoader(false);
		}
	};

	return {
		onClick,
		menuCustomer,
		InvoiceValue,
		columns,
		fetchagain,
		getAllLedgerList,
		invoices,
		tableData,
		loader,
		isOpenCustomer,
		handleCustomerView,
		customerObj,
		PoDetails,
		handlePoView,
		totalCount,
		page,
		rowsPerPage,
		handleChangePage,
		handleChangeRowsPerPage,
		IsOpenPo
	};
}
