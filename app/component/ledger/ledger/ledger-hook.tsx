import { LedgerValues } from "@component/utils/form/initial-values";
import { ledger } from "@api/network";
import { baseUrlLedger } from "@api/base-url";
import { CompanyValuesType } from "@component/utils/type/interfaces";
import axios from "axios";
import { useMutation } from "react-query";
import { Close, Delete, DeleteOutline, DoneOutline, Edit } from "@mui/icons-material";
import { detailsViewBut, editBut, editIcon, countLine, flex, deleteBut } from "css/styles";
import { useState } from "react";
import { DeleteAlert, FailureAlert, LoadingAlert, SuccessAlert } from "@common/toastify";
import { ledgerColums } from "@component/utils/form/constant";
import Swal from "sweetalert2";
import usePurchaseOrder from "@component/purchase-orders/purchase-order-hook";
import { getLedger } from "@api/get-api-queries";

export default function useLedger() {
	const [menuCustomer, setMenuCustomer] = useState(false);
	const [fetchagain, setFetchAgain] = useState(false);
	const [loader, setLoader] = useState(false);
	const [ledgerValue, setLedgerValue] = useState(LedgerValues);
	const { isOpenCustomer, handleCustomerView, customerObj } = usePurchaseOrder(0);
	const columns = ledgerColums;
	const [IsOpenPo, setIsOpenPo] = useState(false);
	const [PoDetails, setPoDetails] = useState([]);
	const [tableData, setTableData] = useState([]);
	const { ledgers } = getLedger();
	const [tableInprogessData, setTableInProgressData] = useState([]);
	const [tablePaidData, setTablePaidData] = useState([]);

	const handlePoView = (item: any) => {
		setIsOpenPo(!IsOpenPo);
		let list: any = [];
		if (item) {
			item.purchase_order.map((item1: any) => {
				let obj = [
					item1.order_number,
					item1.has_raw_material === true ? "Yes" : "No",
					item1.issued_date
						? `${String(new Date(item1.issued_date)).slice(3, 10)},${String(
								new Date(item1.issued_date)
						  ).slice(10, 16)}`
						: "_",
					<b className={detailsViewBut}>
						Count
						<span className={countLine}></span> {item1.products.length}
					</b>
				];
				list.push(obj);
			});
			setPoDetails(list);
		}
	};
	const mutation = useMutation(
		(createCompany: CompanyValuesType) => {
			LoadingAlert();
			return axios.post(baseUrlLedger + ledger, createCompany);
		},
		{
			onSuccess: () => {
				Swal.close();
				SuccessAlert("Ledger Added SuccessFully");
				ledgers.refetch();
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
			return axios.patch(baseUrlLedger + `${ledger}/${createCompany.id}`, createCompany.name);
		},
		{
			onSuccess: () => {
				Swal.close();
				SuccessAlert("Saved Changes SuccessFully!");
				ledgers.refetch();
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
			return axios.delete(baseUrlLedger + `${ledger}/${createCompany.id}`);
		},
		{
			onSuccess: () => {
				Swal.close();
				SuccessAlert("Deleted SuccessFully!");
				ledgers.refetch();
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
					mutation.mutate({
						...values,
						["amount"]: parseFloat(values.amount.replaceAll(",", "")),
						["customerId"]: values.customerId.id,
						["transaction_type"]: values.transaction_type.id,
						["transaction_status"]: values.transaction_status.id
					});
				} else {
					let data: any = {
						name: {
							...values,
							["amount"]: parseFloat(values.amount.replaceAll(",", "")),
							["customerId"]: values.customerId.id,
							["transaction_type"]: values.transaction_type.id,
							["transaction_status"]: values.transaction_status.id
						},
						id: id
					};
					mutationEdit.mutate(data);
				}
			} else {
				if (id) {
					setLedgerValue({
						...values,
						["amount"]: String(values.amount).replace(/\B(?=(\d{3})+(?!\d))/g, ","),
						["customerId"]: { name: values.customer.name, id: values.customer.id },
						["transaction_status"]: {
							name: values.transaction_status.includes("_")
								? values.transaction_status.replace("_", " ")
								: values.transaction_status.charAt(0).toUpperCase() +
								  values.transaction_status.slice(1),
							id: values.transaction_status
						},
						["transaction_type"]: {
							name: values.transaction_type.charAt(0).toUpperCase() + values.transaction_type.slice(1),
							id: values.transaction_type
						}
					});
				} else {
					setLedgerValue(LedgerValues);
				}
				setMenuCustomer(!menuCustomer);
			}
			setMenuCustomer(!menuCustomer);
		}
	};
	const getAllLedgerList = async () => {
		setLoader(true);
		if (!ledgers.isLoading || fetchagain) {
			let list: any = [];
			let listProgress: any = [];
			let listPaid: any = [];
			let index1 = 0;
			let index2 = 0;
			let index3 = 0;
			let ledgerDetails = await ledgers.data;
			const moduleData = JSON.parse(localStorage.getItem("userdata"));
			let objModulesData: any = { controls: [] };
			if (moduleData) {
				if (moduleData.user.role !== "Admin" && moduleData.user.role !== "SuperAdmin") {
					moduleData.user.modules.map((moduleValue: any) => {
						if (moduleValue.name === "Ledger") {
							objModulesData = moduleValue;
						}
					});
				} else {
					objModulesData = { controls: ["Read", "Edit", "Delete"] };
				}
			}
			ledgerDetails?.forEach((item: any, index: number) => {
				if (item.transaction_status === "pending") {
					index1 = index1 + 1;
					let objData = [
						index1,
						<b className={detailsViewBut} onClick={() => handleCustomerView(item.customer)}>
							Customer Info
						</b>,
						<b className={detailsViewBut} onClick={() => handlePoView(item.customer)}>
							P.O Details
						</b>,
						item.amount,
						item.transaction_type.charAt(0).toUpperCase() + item.transaction_type.slice(1),
						item.transaction_status.charAt(0).toUpperCase() + item.transaction_status.slice(1),
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
				} else if (item.transaction_status === "processing") {
					index2 = index2 + 1;
					listProgress.push([
						index2,
						<b className={detailsViewBut} onClick={() => handleCustomerView(item.customer)}>
							Customer Info
						</b>,
						<b className={detailsViewBut} onClick={() => handlePoView(item.customer)}>
							P.O Details
						</b>,
						item.amount,
						item.transaction_type.charAt(0).toUpperCase() + item.transaction_type.slice(1),
						item.transaction_status.charAt(0).toUpperCase() + item.transaction_status.slice(1),
						<div className={flex}>
							{objModulesData.controls.includes("Edit") && (
								<Edit className={editIcon} onClick={() => onClick(item, "open", item.id)} />
							)}
						</div>
					]);
				} else if (item.transaction_status === "paid") {
					index3 = index3 + 1;
					listPaid.push([
						index3,
						<b className={detailsViewBut} onClick={() => handleCustomerView(item.customer)}>
							Customer Info
						</b>,
						<b className={detailsViewBut} onClick={() => handlePoView(item.customer)}>
							P.O Details
						</b>,
						item.amount,
						item.transaction_type.charAt(0).toUpperCase() + item.transaction_type.slice(1),
						item.transaction_status.charAt(0).toUpperCase() + item.transaction_status.slice(1),
						<div className={flex}>
							<span className={editBut}>
								Paid <DoneOutline className={editIcon} />
							</span>
						</div>
					]);
				}
			});
			setTablePaidData(listPaid);
			setTableInProgressData(listProgress);
			setTableData(list);
			setFetchAgain(false);
			setLoader(false);
		}
	};

	return {
		onClick,
		menuCustomer,
		ledgerValue,
		columns,
		fetchagain,
		getAllLedgerList,
		tableData,
		loader,
		isOpenCustomer,
		handleCustomerView,
		customerObj,
		PoDetails,
		handlePoView,
		tableInprogessData,
		IsOpenPo,
		tablePaidData
	};
}
