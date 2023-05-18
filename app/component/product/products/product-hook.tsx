import axios from "axios";
import { product, productRate } from "@api/network";
import { baseUrlProduct } from "@api/base-url";
import { useMutation } from "react-query";
import { productValuesType } from "@component/utils/type/interfaces";
import { useState } from "react";
import { deleteBut, editIcon, flex } from "css/styles";
import { Delete, Edit } from "@mui/icons-material";
import { productRateValues, productValues } from "@component/utils/form/initial-values";
import { DeleteAlert, FailureAlert, LoadingAlert, SuccessAlert } from "@common/toastify";
import { variantColums } from "@component/utils/form/constant";
import Swal from "sweetalert2";
import { getProduct, getRate, getType } from "@api/get-api-queries";
import { useRouter } from "next/router";
import { addProduct, addProductRate, productVariantList } from "@component/utils/routes";

export default function useProduct() {
	const [loader, setLoader] = useState(false);
	const [varinatList, setvariantList] = useState([]);
	const [varinatSectionNameList, setvariantSetionNameList] = useState([]);
	const [fetchagain, setFetchAgain] = useState(false);
	const [page, setPage] = useState(1);
	const [rowsPerPage, setRowsPerPage] = useState(5);
	const handleChangePage = (event: any, newPage: any) => {
		setPage(newPage);
	};
	const handleChangeRowsPerPage = (event: any) => {
		setRowsPerPage(event.target.value);
	};
	const { products } = getProduct("", "");
	const coloums = variantColums;
	const [menu, setMenu] = useState(false);
	const [TableData, setTableData] = useState([]);
	const [variantvalue, setVariantValue]: any = useState(productValues);
	const [allRateList, setAllRateList] = useState([]);
	const [totalCount, setTotalCount] = useState(0);
	const [tableDataSelect, setTableDataSelect] = useState([]);
	const { types } = getType("", "");
	const [productTypelist, setTypelist] = useState([]);
	const [rateValue, setRateValue] = useState(productRateValues);
	const { rates } = getRate(page, rowsPerPage);
	const { push } = useRouter();

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
				push(productVariantList);
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

	const onClickRate = async (values: any, type: string, id: string) => {
		if (type === "close") {
			let formDetails: any = {
				rateData: values
			};
			if (!id) {
				setLoader(true);
				mutation.mutate(formDetails);
			} else {
				mutationEdit.mutate({ ...formDetails, id: id });
			}
		} else if (type === "model") {
			push(addProduct);
		} else {
			push(productVariantList);
		}
	};

	const mutationProduct = useMutation(
		(createPorductVariant: productValuesType) => {
			let data1 = axios.post(baseUrlProduct + product, createPorductVariant);
			return data1;
		},
		{
			onSuccess: (data) => {
				Swal.close();
				setFetchAgain(true);
				setMenu(false);
				rateValue.productId = data.data;
				push(addProductRate);
			},
			onError: (error) => {
				Swal.close();
				let errorMsg: any = error;
				if (errorMsg.response.data.statusCode === 403) {
					push(addProductRate);
				} else {
					FailureAlert(errorMsg.response.data.message);
					setLoader(false);
				}
				setLoader(false);
			}
		}
	);

	const mutationEditProduct = useMutation(
		(createPorductVariant: productValuesType) => {
			let data1 = axios.patch(
				baseUrlProduct + `${product}/${createPorductVariant.id}`,
				createPorductVariant.value
			);
			return data1;
		},
		{
			onSuccess: () => {
				Swal.close();
				push(addProductRate);
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

	const getAllList = async () => {
		if (!products.isLoading) {
			let listName: any = [];
			let sectionNameList: any = [];
			let dataVariant: any = await products.data;
			dataVariant?.data?.forEach((item: any, index: number) => {
				sectionNameList.push({ name: item });
				let objdataName = { name: `${item.name} `, id: item.id };
				listName.push(objdataName);
			});
			setvariantSetionNameList(sectionNameList);
			setvariantList(listName);
			setLoader(false);
			setFetchAgain(false);
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

	const getAllRateList = async () => {
		setLoader(true);
		if (!rates.isLoading || fetchagain) {
			let list: any = [];
			let allList: any = [];

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
			rateDetails?.data?.forEach((item: any, index: number) => {
				let data = [
					rowsPerPage * page + index - rowsPerPage + 1,
					item.name ? item.name : "_",
					item.thickness ? item.thickness : "_",
					item.length ? item.length : "_",
					<div className={flex}>
						{objModulesData.controls.includes("Edit") && <Edit className={editIcon} />}
						{objModulesData.controls.includes("Delete") && <Delete className={deleteBut} />}
					</div>
				];
				list.push(data);
				allList.push(item);
			});
			setAllRateList(allList);
			setTableData(list);
			setLoader(false);
			setFetchAgain(false);
		}
	};

	const mutationDelete = useMutation(
		(createCompany: any) => {
			LoadingAlert();
			return axios.delete(baseUrlProduct + `${product}/${createCompany.id}`);
		},
		{
			onSuccess: () => {
				Swal.close();
				SuccessAlert("Deleted SuccessFully!");
				products.refetch();
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
		console.log(values);
		if (type == "close") {
			let formDetails: any = {
				...values,
				["name"]: values.name,
				["height"]: values.height,
				["width"]: values.width,
				["weight"]: values.weight,
				["thickness"]: values.thickness,
				["length"]: values.length
			};
			if (!id) {
				setLoader(true);
				Object.keys(variantvalue).map((item: any) => {
					variantvalue[item] = formDetails[item];
				});
				mutationProduct.mutate(formDetails);
			} else {
				let data: any = { value: formDetails, id: id };
				setLoader(true);
				Object.keys(variantvalue).map((item: any) => {
					variantvalue[item] = formDetails[item];
				});
				rateValue.productId = values;
				mutationEditProduct.mutate(data);
			}
		} else if (type === "model") {
			push(productVariantList);
		} else if (type === "delete") {
			DeleteAlert(mutationDelete, id);
		} else {
			if (id) {
				Object.keys(variantvalue).map((item: any) => {
					variantvalue[item] = values[item];
				});
				rateValue.coatings = values.coatings;
				push(addProduct);
			} else {
				Object.keys(variantvalue).map((item: any) => {
					variantvalue[item] = "";
				});
				setVariantValue(productValues);
				push(addProduct);
			}
		}
	};

	return {
		coloums,
		fetchagain,
		menu,
		mutationEditProduct,
		mutationProduct,
		TableData,
		onClick,
		variantvalue,
		loader,
		varinatList,
		tableDataSelect,
		onClickRate,
		rateValue,
		handleChangeRowsPerPage,
		handleChangePage,
		rowsPerPage,
		getAllRateList,
		getAllList,
		productTypelist,
		allRateList,
		totalCount,
		page,
		varinatSectionNameList
	};
}
