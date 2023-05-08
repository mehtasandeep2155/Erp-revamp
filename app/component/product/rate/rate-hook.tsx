import axios from "axios";
import { useMutation } from "react-query";
import { Close, Delete, Edit } from "@mui/icons-material";
import { detailsViewBut, flex, deleteBut, editIcon } from "css/styles";
import { productRateValues } from "@component/utils/form/initial-values";
import { productRate } from "@api/network";
import { baseUrlProduct } from "@api/base-url";
import { useState } from "react";
import { DeleteAlert, FailureAlert, LoadingAlert, SuccessAlert } from "@common/toastify";
import { rateColums } from "@component/utils/form/constant";
import Swal from "sweetalert2";
import { getRate, getType, getProduct } from "@api/get-api-queries";
import { useRouter } from "next/router";
import { variantDetails } from "@component/utils/routes";

export default function useRate() {
	const [menu, setMenu] = useState(false);
	const [fetchagain, setFetchAgain] = useState(false);
	const [productVariantlist, setProductVariantlist] = useState([]);
	const [productTypelist, setTypelist] = useState([]);
	const [loader, setLoader] = useState(false);
	const [allRateList, setAllRateList] = useState([]);
	const { products } = getProduct();
	const { rates } = getRate();
	const { types } = getType();
	const { push } = useRouter();

	const handleOnClick = (currentRowsSelected: any, allRowsSelected: any, setFieldValue: any) => {
		setFieldValue(["productId"], productVariantlist[allRowsSelected.rowIndex].name);
	};

	const handleView = (item: any) => {
		let path: any = {
			pathname: `${variantDetails}`,
			query: { id: item.id }
		};
		push(path);
	};

	const columns = rateColums;
	const [tableData, setTableData] = useState();
	const [tableDataSelect, setTableSelectData] = useState();
	const [rateValue, setRateValue] = useState(productRateValues);

	const mutation = useMutation(
		(createPorductRate: any) => {
			LoadingAlert();
			return axios.post(baseUrlProduct + productRate, createPorductRate);
		},
		{
			onSuccess: () => {
				Swal.close();
				SuccessAlert("Rate Added SuccessFully!");
				rates.refetch();
				setFetchAgain(true);
				setMenu(!menu);
			},
			onError: (error) => {
				Swal.close();
				let errorMsg: any = error;
				FailureAlert(errorMsg.response.data.message);
				setLoader(false);
			}
		}
	);

	const mutationEdit = useMutation(
		(createPorductRate: any) => {
			LoadingAlert();
			return axios.patch(baseUrlProduct + `${productRate}/${createPorductRate.id}`, createPorductRate.value);
		},
		{
			onSuccess: () => {
				Swal.close();
				SuccessAlert("Saved Changes SuccessFully!");
				rates.refetch();
				setFetchAgain(true);
				setMenu(!menu);
			},
			onError: (error) => {
				Swal.close();
				let errorMsg: any = error;
				FailureAlert(errorMsg.response.data.message);
				setLoader(false);
			}
		}
	);

	const onClick = async (values: any, type: string, id: string) => {
		if (type == "close") {
			if (!id) {
				let formDetails: any = {
					rate: parseFloat(values.rate.replaceAll(",", "")),
					productId: values.productId.id,
					typeId: values.typeId.id
				};
				setLoader(true);
				mutation.mutate(formDetails);
			} else {
				let formDetails: any = {
					value: {
						rate: parseFloat(values.rate.replaceAll(",", "")),
						productId: values.productId.id,
						typeId: values.typeId.id
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
				let obj: any = {
					rate: String(values.rate).replace(/\B(?=(\d{3})+(?!\d))/g, ","),
					productId: values.product,
					typeId: { name: values.coating_type.type, id: values.coating_type.id },
					id: values.id
				};
				setRateValue(obj);
				setMenu(!menu);
			} else {
				setRateValue(productRateValues);
				setMenu(!menu);
			}
		}
	};
	const mutationDelete = useMutation(
		(createCompany: any) => {
			LoadingAlert();
			return axios.delete(baseUrlProduct + `${productRate}/${createCompany.id}`);
		},
		{
			onSuccess: () => {
				Swal.close();
				SuccessAlert("Deleted SuccessFully!");
				rates.refetch();
				setFetchAgain(true);
			},
			onError: (error) => {
				Swal.close();
				let errorMsg: any = error;
				FailureAlert(errorMsg.response.data.message);
			}
		}
	);
	const getAllRateList = async () => {
		setLoader(true);
		if (!rates.isLoading || fetchagain) {
			let list: any = [];
			let selectList: any = [];
			let allList: any = [];
			let rateDetails = await rates.data;
			const moduleData = JSON.parse(localStorage.getItem("userdata"));
			let objModulesData: any = { controls: [] };
			if (moduleData) {
				if (moduleData.user.role !== "Admin" && moduleData.user.role !== "SuperAdmin") {
					moduleData.user.modules.map((moduleValue: any) => {
						if (moduleValue.name === "Products") {
							objModulesData = moduleValue;
						}
					});
				} else {
					objModulesData = { controls: ["Read", "Edit", "Delete"] };
				}
			}
			rateDetails?.forEach((item: any, index: number) => {
				let data = [
					index + 1,
					item.product ? (
						<span className={detailsViewBut} onClick={() => handleView(item)}>
							{item.product.name}
						</span>
					) : (
						"_"
					),
					`${item.coating_type.type.charAt(0).toUpperCase() + item.coating_type.type.slice(1)} #${
						item.coating_type.code
					}`,
					`Rs.${String(item.rate).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`,
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
				allList.push(item);
				selectList.push([
					item.product ? <span className={detailsViewBut}>{item.product.name}</span> : "_",
					`${item.coating_type.type.charAt(0).toUpperCase() + item.coating_type.type.slice(1)} #${
						item.coating_type.code
					} `,
					`Rs.${String(item.rate).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`
				]);
			});
			setAllRateList(allList);
			setTableSelectData(selectList);
			setTableData(list);
			setLoader(false);
			setFetchAgain(false);
		}
	};
	const getAllList = async () => {
		if (!products.isLoading) {
			let variantlist: any = [];
			let variantsDetails: any = await products.data;
			variantsDetails?.forEach((item: any) => {
				let obj = { name: item, id: item.id };
				variantlist.push(obj);
			});
			setProductVariantlist(variantlist);
		}
		if (!types.isLoading) {
			let Typelist: any = [];
			let typeDetails: any = await types.data;
			typeDetails?.forEach((item: any) => {
				let obj = { name: item.type, id: item.id, type: item.subtype };
				Typelist.push(obj);
			});
			setTypelist(Typelist);
		}
	};
	return {
		getAllRateList,
		tableData,
		onClick,
		fetchagain,
		menu,
		rateValue,
		columns,
		getAllList,
		productVariantlist,
		productTypelist,
		loader,
		handleView,
		allRateList,
		tableDataSelect,
		handleOnClick
	};
}
