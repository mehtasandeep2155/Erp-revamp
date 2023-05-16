import axios from "axios";
import { product, productRate } from "@api/network";
import { baseUrlProduct } from "@api/base-url";
import { useMutation } from "react-query";
import { productValuesType } from "@component/utils/type/interfaces";
import { useState } from "react";
import { deleteBut, editIcon, flex } from "css/styles";
import { Delete, Edit, FileCopy } from "@mui/icons-material";
import { productRateValues, productValues } from "@component/utils/form/initial-values";
import { DeleteAlert, FailureAlert, LoadingAlert, SuccessAlert } from "@common/toastify";
import { variantColums } from "@component/utils/form/constant";
import Swal from "sweetalert2";
import { getProduct, getRate } from "@api/get-api-queries";
import { useRouter } from "next/router";
import { addProduct, addProductRate, productVariantList } from "@component/utils/routes";

export default function useProduct() {
	const [loader, setLoader] = useState(false);
	const [varinatList, setvariantList] = useState([]);
	const [varinatSectionNameList, setvariantSetionNameList] = useState([]);
	const [fetchagain, setFetchAgain] = useState(false);
	const { products } = getProduct();
	const coloums = variantColums;
	const [menu, setMenu] = useState(false);
	const [rateMenu, setRateMenu] = useState(false);
	const [TableData, setTableData] = useState([]);
	const [variantvalue, setVariantValue]: any = useState(productValues);
	const [tableDataSelect, setTableDataSelect] = useState([]);
	const [rateValue, setRateValue] = useState(productRateValues);
	const { rates } = getRate();
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
	const onClickRate = async (values: any, type: string, id: string) => {
		if (type === "close") {
			if (!id) {
				let formDetails: any = {
					rateData: values
				};
				setLoader(true);
				mutation.mutate(formDetails);
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
				products.refetch();
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
				products.refetch();
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

	const getAllVariantList = async () => {
		setLoader(true);
		if (!products.isLoading || fetchagain) {
			let list: any = [];
			let listName: any = [];
			let sectionNameList: any = [];
			let selectData: any = [];
			let dataVariant: any = await products.data;
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
			dataVariant?.forEach((item: any, index: number) => {
				sectionNameList.push({ name: item });
				let objdataName = { name: `${item.sectionName} ${item.sectionNumber}`, id: item.id };
				listName.push(objdataName);
				let objdata = [
					index + 1,
					`${item.name.toUpperCase()} ${item.code}`,
					item.height ? item.height : "_",
					item.width ? item.width : "_",
					`${item.weight ? item.weight : "_"} ${item.weightUom ? item.weightUom.type : ""}`,
					item.thickness ? item.thickness : "_",
					item.length ? item.length : "_",
					<div className={flex}>
						{objModulesData.controls.includes("Edit") && (
							<>
								<FileCopy className={editIcon} onClick={() => onClick(item, "open", item.id)} />
								<Edit className={editIcon} onClick={() => onClick(item, "open", item.id)} />
							</>
						)}
						{objModulesData.controls.includes("Delete") && (
							<Delete className={deleteBut} onClick={() => onClick(item, "delete", item.id)} />
						)}
					</div>
				];
				selectData.push([
					`${item.name.toUpperCase()} ${item.code}`,
					item.height,
					item.width != 0 ? item.width : "_",
					`${item.weight ? item.weight : "_"} ${item.weightUom ? item.weightUom.type : ""}`,
					item.thickness != 0 ? item.thickness : "_",
					item.length != 0 ? item.length : "_"
				]);
				list.push(objdata);
			});
			setTableDataSelect(selectData);
			setvariantSetionNameList(sectionNameList);
			setvariantList(listName);
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
				mutationEditProduct.mutate(data);
			}
		} else if (type === "model") {
			push(productVariantList);
		} else if (type === "delete") {
			DeleteAlert(mutationDelete, id);
		} else {
			if (id) {
				// let formDetails: any = {
				// 	...values
				// };
				// // setVariantValue(formDetails);
				// Object.keys(variantvalue).map((item: any) => {
				// 	item = values[item];
				// });
				// console.log(variantvalue, "varients");
				// setMenu(!menu);
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
		getAllVariantList,
		TableData,
		onClick,
		variantvalue,
		loader,
		varinatList,
		tableDataSelect,
		rateMenu,
		onClickRate,
		rateValue,
		varinatSectionNameList
	};
}
