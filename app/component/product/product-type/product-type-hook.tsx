import { productTypeValues } from "@component/utils/form/initial-values";
import { productType } from "@api/network";
import { baseUrlProduct } from "@api/base-url";
import { productTypeValuesType } from "@component/utils/type/interfaces";
import { useMutation } from "react-query";
import axios from "axios";
import { Circle, Delete, Edit } from "@mui/icons-material";
import { companyChip, deleteBut, editIcon, flex, menuItmeStyle, subCompanyDiv } from "css/styles";
import { useState } from "react";
import { DeleteAlert, FailureAlert, LoadingAlert, SuccessAlert } from "@common/toastify";
import { productTypeColums } from "@component/utils/form/constant";
import Swal from "sweetalert2";
import { getType } from "@api/get-api-queries";

export default function useProductType() {
	const [menu, setMenu] = useState(false);
	const [loader, setLoader] = useState(false);
	const [typeList, setTypeList] = useState([]);
	const [fetchagain, setFetchAgain] = useState(false);
	const [typeValue, setTypeValue] = useState(productTypeValues);
	const [tableData, setTableData] = useState([]);
	const { types } = getType();

	const columns = productTypeColums;
	const mutation = useMutation(
		(createPorductType: productTypeValuesType) => {
			LoadingAlert();
			return axios.post(baseUrlProduct + productType, createPorductType);
		},
		{
			onSuccess: () => {
				Swal.close();
				SuccessAlert("Product Coating Added SuccessFully!");
				types.refetch();
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
		(createPorductType: productTypeValuesType) => {
			LoadingAlert();
			return axios.patch(baseUrlProduct + `${productType}/${createPorductType.id}`, createPorductType.name);
		},
		{
			onSuccess: () => {
				Swal.close();
				SuccessAlert("Saved Changes SuccessFully!");
				types.refetch();
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
	const mutationDelete = useMutation(
		(createCompany: any) => {
			LoadingAlert();
			return axios.delete(baseUrlProduct + `${productType}/${createCompany.id}`);
		},
		{
			onSuccess: () => {
				Swal.close();
				SuccessAlert("Deleted SuccessFully!");
				types.refetch();
				setFetchAgain(true);
			},
			onError: (error) => {
				Swal.close();
				let errorMsg: any = error;
				FailureAlert(errorMsg.response.data.message);
			}
		}
	);
	const onClick = async (values: productTypeValuesType, type: string, id: string) => {
		if (type == "close") {
			if (!id) {
				let companies: any = [];
				values.colors?.forEach((element: any) => {
					companies.push(element.id);
				});
				setLoader(true);
				mutation.mutate({ ...values, ["colors"]: companies });
			} else {
				let companies: any = [];
				values.colors?.forEach((element: any) => {
					companies.push(element.id);
				});
				let data: any = { name: { ...values, ["colors"]: companies }, id: id };
				if (tableData.includes(values)) {
					FailureAlert("Same Record Already Exits!");
				} else {
					setLoader(true);
					mutationEdit.mutate(data);
				}
			}
		} else if (type === "delete") {
			DeleteAlert(mutationDelete, id);
		} else {
			if (id) {
				let obj: any = { type: values.type, ["colors"]: values.colors, id: values.id };
				setTypeValue(obj);
			} else {
				setTypeValue(productTypeValues);
			}
			setMenu(!menu);
		}
	};

	const getAllProductType = async () => {
		setLoader(true);
		if (!types.isLoading || fetchagain) {
			let list: any = [];
			let listName: any = [];
			let dataType: any = await types.data;
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
			dataType?.forEach((item: any, index: number) => {
				let objdataName = { name: `${item.type} (${item.subtype})`, id: item.id };
				listName.push(objdataName);
				let data = [
					index + 1,
					`${item.type.charAt(0).toUpperCase() + item.type.slice(1)}`,
					item.colors && (
						<span className={subCompanyDiv}>
							{item.colors.map((item1: any, index1: number) => (
								<span key={index1}>
									<span className={menuItmeStyle}>{item1.color} </span>
								</span>
							))}
						</span>
					),
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
			});
			setTypeList(listName);
			setTableData(list);
			setLoader(false);
			setFetchAgain(false);
		}
	};
	return {
		getAllProductType,
		typeList,
		menu,
		types,
		tableData,
		fetchagain,
		typeValue,
		columns,
		onClick,
		loader
	};
}
