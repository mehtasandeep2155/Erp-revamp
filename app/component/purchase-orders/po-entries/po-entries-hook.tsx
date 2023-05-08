import { poEntriesValues } from "@component/utils/form/initial-values";
import { entry } from "@api/network";
import { baseUrlPurchaseOrder } from "@api/base-url";
import { useMutation } from "react-query";
import axios from "axios";
import { Close, Delete, Edit } from "@mui/icons-material";
import { deleteBut, detailsViewBut, editIcon, flex } from "css/styles";
import { useState } from "react";
import { variantDetails } from "@component/utils/routes";
import { DeleteAlert, FailureAlert, LoadingAlert, SuccessAlert } from "@common/toastify";
import useConstant from "@component/utils/form/constant";
import Swal from "sweetalert2";
import { getRate, getPoentries, getPurchaseOrders } from "@api/get-api-queries";
import { useRouter } from "next/router";

export default function usePoEntries() {
	const [menu, setMenu] = useState(false);
	const [productDetails, setProductDetails] = useState<any>([]);
	const [poEntriesValue, setpoEntriesValue] = useState(poEntriesValues);
	const [fetchagain, setFetchAgain] = useState(false);
	const { poentries } = getPoentries();
	const { rates } = getRate();
	const { purchaseOrderds } = getPurchaseOrders();
	const [productRatelist, setProductRatelist] = useState([]);
	const [productList, setProductList] = useState([]);
	const [productUserlist, setUserlist] = useState([]);
	const [loader, setLoader] = useState(false);
	const { productColums } = useConstant();
	const columns = productColums;
	const [tableData, setTableData] = useState([]);
	const { push } = useRouter();

	const handleOnClick = (currentRowsSelected: any, allRowsSelected: any, setFieldValue: any) => {
		setFieldValue(["rateId"], productRatelist[allRowsSelected.rowIndex].name);
	};

	const handleOnClickPurchase = (currentRowsSelected: any, allRowsSelected: any, setFieldValue: any) => {
		setFieldValue(["poId"], productUserlist[allRowsSelected.rowIndex].name);
	};

	const mutation = useMutation(
		(createPorductUom: any) => {
			LoadingAlert();
			return axios.post(baseUrlPurchaseOrder + entry, createPorductUom);
		},
		{
			onSuccess: (data) => {
				Swal.close();
				SuccessAlert("Products Added SuccessFully!");
				poentries.refetch();
				setFetchAgain(true);
				setMenu(!menu);
			},
			onError: (error) => {
				let errorMsg: any = error;
				FailureAlert(errorMsg.response.data.message);
			}
		}
	);

	const mutationEdit = useMutation(
		(createPorductUom: any) => {
			LoadingAlert();
			return axios.patch(baseUrlPurchaseOrder + `${entry}/${createPorductUom.id}`, createPorductUom.value);
		},
		{
			onSuccess: () => {
				Swal.close();
				SuccessAlert("Saved Changes SuccessFully!");
				poentries.refetch();
				setFetchAgain(true);
				setMenu(!menu);
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
			return axios.delete(baseUrlPurchaseOrder + `${entry}/${createCompany.id}`);
		},
		{
			onSuccess: () => {
				Swal.close();
				SuccessAlert("Deleted SuccessFully!");
				poentries.refetch();
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
		setProductDetails([]);
		if (type == "close") {
			let valueData: any = {
				...values,
				["quantity"]: values.quantity,
				["length"]: values.quantity,
				colorId: values.colorId.id,
				["rateId"]: values.rateId.id,
				["poId"]: values.poId ? values.poId.id : ""
			};

			if (!id) {
				setLoader(true);
				mutation.mutate(valueData);
			} else {
				let formDetails: any = {
					value: {
						["quantity"]: values.quantity,
						["length"]: values.quantity,
						colorId: values.colorId.id,
						["rateId"]: values.rateId.id,
						["poId"]: values.poId ? values.poId.id : ""
					},
					id: id
				};
				setLoader(true);
				mutationEdit.mutate(formDetails);
			}
		} else if (type === "delete") {
			DeleteAlert(mutationDelete, id);
		} else {
			if (id) {
				let formDetails: any = {
					...values,
					colorId: { name: values.color.color, id: values.color.id },
					rateId: values.rate,
					poId: values.purchase_order ? values.purchase_order : {}
				};
				setpoEntriesValue(formDetails);
			} else {
				setpoEntriesValue(poEntriesValues);
			}
			setMenu(!menu);
		}
	};

	const handleView = (item: any) => {
		let path: any = {
			pathname: `${variantDetails}`,
			query: { subPath: "po-entries", id: item.id }
		};
		push(path);
	};

	const getAllProducList = async () => {
		setLoader(true);
		if (!poentries.isLoading || fetchagain) {
			let listProduct: any = [];
			let list: any = [];
			let datauom: any = await poentries.data;
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
			datauom?.forEach((item: any, index: number) => {
				let obj = { name: item, id: item.id };
				let data = [
					"",
					item.rate.product ? (
						<span className={detailsViewBut} onClick={() => handleView(item.rate)}>
							{item.rate.product.name}
						</span>
					) : (
						"_"
					),
					item.rate.coating_type
						? `${
								item.rate.coating_type.type.charAt(0).toUpperCase() +
								item.rate.coating_type.type.slice(1)
						  } #${item.rate.coating_type.code} `
						: "_",
					item.rate.rate,
					item.length,
					item.quantity,
					`${item.color.color.charAt(0).toUpperCase() + item.color.color.slice(1)} #${item.color.code} `,
					`${item.weight ? item.weight : "_"} ${item.weightUom ? item.weightUom.type : ""}`,
					<div className={flex}>
						{objModulesData.controls.includes("Edit") && (
							<Edit className={editIcon} onClick={() => onClick(item, "open", item.id)} />
						)}
						{objModulesData.controls.includes("Delete") && (
							<Delete className={deleteBut} onClick={() => onClick(item, "delete", item.id)} />
						)}
					</div>
				];
				list.push(data);
				listProduct.push(obj);
			});
			setTableData(list);
			setProductList(listProduct);
			setLoader(false);
			setFetchAgain(false);
		}
	};
	const getAllList = async () => {
		if (!rates.isLoading) {
			let ratelist: any = [];
			let datarate: any = await rates.data;
			datarate?.forEach((item: any) => {
				let obj = { name: item, id: item.id };
				ratelist.push(obj);
			});
			setProductRatelist(ratelist);
		}
		if (!purchaseOrderds.isLoading) {
			let userlist: any = [];
			let datauser: any = await purchaseOrderds.data;
			datauser?.forEach((item: any) => {
				let obj = { name: item, id: item.id };
				userlist.push(obj);
			});
			setUserlist(userlist);
		}
	};

	return {
		getAllProducList,
		onClick,
		poentries,
		productList,
		productDetails,
		columns,
		tableData,
		poEntriesValue,
		menu,
		fetchagain,
		getAllList,
		productRatelist,
		productUserlist,
		loader,
		handleOnClick,
		handleOnClickPurchase,
		handleView
	};
}
