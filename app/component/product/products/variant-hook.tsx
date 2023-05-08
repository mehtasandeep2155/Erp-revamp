import axios from "axios";
import { product } from "@api/network";
import { baseUrlProduct } from "@api/base-url";
import { useMutation } from "react-query";
import { productValuesType } from "@component/utils/type/interfaces";
import { useState } from "react";
import { deleteBut, editIcon, flex } from "css/styles";
import { Close, EditOutlined } from "@mui/icons-material";
import { productValues } from "@component/utils/form/initial-values";
import { DeleteAlert, FailureAlert, LoadingAlert, SuccessAlert } from "@common/toastify";
import { variantColums } from "@component/utils/form/constant";
import Swal from "sweetalert2";
import { getProduct } from "@api/get-api-queries";

export default function useProduct() {
	const [loader, setLoader] = useState(false);
	const [varinatList, setvariantList] = useState([]);
	const [varinatSectionNameList, setvariantSetionNameList] = useState([]);
	const [fetchagain, setFetchAgain] = useState(false);
	const { products } = getProduct();
	const coloums = variantColums;
	const [menu, setMenu] = useState(false);
	const [TableData, setTableData] = useState([]);
	const [variantvalue, setVariantValue] = useState(productValues);
	const [tableDataSelect, setTableDataSelect] = useState([]);

	const mutation = useMutation(
		(createPorductVariant: productValuesType) => {
			LoadingAlert();
			let data1 = axios.post(baseUrlProduct + product, createPorductVariant);
			return data1;
		},
		{
			onSuccess: () => {
				Swal.close();
				SuccessAlert("Product Variant Added SuccessFully!");
				products.refetch();
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
		(createPorductVariant: productValuesType) => {
			LoadingAlert();
			let data1 = axios.patch(
				baseUrlProduct + `${product}/${createPorductVariant.id}`,
				createPorductVariant.value
			);
			return data1;
		},
		{
			onSuccess: () => {
				Swal.close();
				SuccessAlert("Saved Changes SuccessFully!");
				products.refetch();
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
			dataVariant.forEach((item: any, index: number) => {
				sectionNameList.push({ name: item });
				let objdataName = { name: `${item.sectionName} ${item.sectionNumber}`, id: item.id };
				listName.push(objdataName);
				let objdata = [
					index + 1,
					`${item.name.charAt(0).toUpperCase() + item.name.slice(1)} #${item.code}`,
					item.height ? item.height : "_",
					item.width ? item.width : "_",
					`${item.weight ? item.weight : "_"} ${item.weightUom ? item.weightUom.type : ""}`,
					item.thickness ? item.thickness : "_",
					item.length ? item.length : "_",
					<div className={flex}>
						{objModulesData.controls.includes("Edit") && (
							<EditOutlined className={editIcon} onClick={() => onClick(item, "open", item.id)} />
						)}
						{objModulesData.controls.includes("Delete") && (
							<Close className={deleteBut} onClick={() => onClick(item, "delete", item.id)} />
						)}
					</div>
				];
				selectData.push([
					`${item.name.charAt(0).toUpperCase() + item.name.slice(1)} #${item.code}`,
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

	const onClick = async (values: productValuesType, type: string, id: string) => {
		if (type == "close") {
			let formDetails: any = {
				...values,
				["name"]: values.name,
				["height"]: values.height,
				["width"]: values.width,
				["weight"]: values.weight,
				["thickness"]: values.thickness,
				["length"]: values.length,
				["weightUomId"]: values.weightUomId?.id
			};
			if (!id) {
				setLoader(true);
				mutation.mutate(formDetails);
			} else {
				let data: any = { value: formDetails, id: id };
				setLoader(true);
				mutationEdit.mutate(data);
			}
		} else if (type === "delete") {
			DeleteAlert(mutationDelete, id);
		} else {
			if (id) {
				let formDetails: any = {
					...values,
					["weightUomId"]: {
						name: values.weightUom != null ? values.weightUom.type : "Select WeightUom",
						id: values.weightUom?.id
					}
				};
				setVariantValue(formDetails);
				setMenu(!menu);
			} else {
				setVariantValue(productValues);
				setMenu(!menu);
			}
		}
	};

	return {
		coloums,
		fetchagain,
		menu,
		mutationEdit,
		mutation,
		getAllVariantList,
		TableData,
		onClick,
		variantvalue,
		loader,
		varinatList,
		tableDataSelect,
		varinatSectionNameList
	};
}
