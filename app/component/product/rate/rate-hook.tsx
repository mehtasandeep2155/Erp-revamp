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
	const [totalCount, setTotalCount] = useState(0);
	const [page, setPage] = useState(1);
	const [rowsPerPage, setRowsPerPage] = useState(5);
	const handleChangePage = (event: any, newPage: any) => {
		setPage(newPage);
	};
	const handleChangeRowsPerPage = (event: any) => {
		setRowsPerPage(event.target.value);
	};
	const { products } = getProduct("", "");
	const { rates } = getRate(page, rowsPerPage);
	const { types } = getType(1, 100);
	const { push } = useRouter();

	const handleOnClick = (currentRowsSelected: any, allRowsSelected: any, setFieldValue: any) => {
		setFieldValue(["productId"], productVariantlist[allRowsSelected].name);
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
	const [tableInnerData, setTableInnerData] = useState();
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
			},
			onError: (error) => {
				Swal.close();
				let errorMsg: any = error;
				FailureAlert(errorMsg.response.data.message);
				setLoader(false);
			}
		}
	);

	const onClick = async (values: any, type: string, id: any) => {
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
			if (id.id) {
				let obj: any = {
					rate: String(values.rate).replace(/\B(?=(\d{3})+(?!\d))/g, ","),
					productId: values.product,
					typeId: { name: values.coating_type.type, id: values.coating_type.id },
					id: values.id
				};
				setRateValue(obj);
			} else {
				setRateValue(productRateValues);
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
			let productList: any = [];
			let rateDetails = await rates.data;
			setTotalCount(rates.data.count);
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
			let index1: number = 0;
			rateDetails?.data?.forEach((item: any, index: number) => {
				item.coatings.forEach((item1: any, indextype: any) => {
					if (indextype > 0) {
						index1 = rowsPerPage * page + index1 - rowsPerPage + 1;
						let data = [
							index1,
							item.name ? <span className={detailsViewBut}>{item.name}</span> : "_",
							`${item1.type.charAt(0).toUpperCase() + item1.type.slice(1)} #${item1.code}`,
							item1?.rate ? `Rs.${String(item1.rate).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}` : "_",
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
					}
				});
				index1 = rowsPerPage * page + index1 - rowsPerPage + 1;
				let data = [
					index1,
					item.name ? <span className={detailsViewBut}>{item.name}</span> : "_",
					item.coatings.length > 0
						? `${item.coatings[0]?.type.charAt(0).toUpperCase() + item.coatings[0]?.type.slice(1)} #${
								item.coatings[0]?.code
						  }`
						: "_",
					item.coatings.length > 0
						? `Rs.${String(item.coatings[0]?.rate).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`
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
				productList.push([item.name, item.height, item.width, item.weight, item.thickness, item.length]);
				list.push(data);
				allList.push(item);
			});
			setAllRateList(allList);
			setTableSelectData(selectList);
			setTableData(list);
			setTableInnerData(productList);
			setLoader(false);
			setFetchAgain(false);
		}
	};
	const getAllList = async () => {
		if (!products.isLoading) {
			let variantlist: any = [];
			let variantsDetails: any = await products.data;
			variantsDetails?.data?.forEach((item: any) => {
				let obj = { name: item.name, id: item.id };
				variantlist.push(obj);
			});
			setProductVariantlist(variantlist);
		}
		if (!types.isLoading) {
			let Typelist: any = [];
			let typeDetails: any = await types.data;
			typeDetails?.data?.forEach((item: any) => {
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
		tableInnerData,
		handleChangePage,
		handleChangeRowsPerPage,
		page,
		totalCount,
		rowsPerPage,
		handleOnClick
	};
}
