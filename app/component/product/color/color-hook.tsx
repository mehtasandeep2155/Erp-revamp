import { productColor } from "@api/network";
import { baseUrlProduct } from "@api/base-url";
import { productColorValuesType, productColorValuesEditType } from "@component/utils/type/interfaces";
import { useState } from "react";
import { productColorValues } from "@component/utils/form/initial-values";
import axios from "axios";
import { useMutation } from "react-query";
import { Close, Delete, Edit } from "@mui/icons-material";
import { editIcon, flex, deleteBut, companyChip, subCompanyDiv, menuItmeStyle } from "css/styles";
import { DeleteAlert, FailureAlert, LoadingAlert, SuccessAlert } from "@common/toastify";
import useConstant from "@component/utils/form/constant";
import Swal from "sweetalert2";
import { getColor } from "@api/get-api-queries";
import { Chip } from "@mui/material";

export default function useColor() {
	const [loader, setLoader] = useState(false);
	const [colorList, setColorList] = useState([]);
	const { colors } = getColor();
	const [fetchagain, setFetchAgain] = useState(false);
	const [menu, setMenu] = useState(false);
	const { colorColumns } = useConstant();
	const [colorValue, setColorValue] = useState(productColorValues);
	const columns = colorColumns;
	const [tableData, setTableData] = useState([]);

	const mutation = useMutation(
		(createPorductColor: productColorValuesType) => {
			LoadingAlert();
			return axios.post(baseUrlProduct + productColor, createPorductColor);
		},
		{
			onSuccess: () => {
				Swal.close();
				SuccessAlert("Color Added SuccessFully!");
				colors.refetch();
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
		(createPorductColor: productColorValuesEditType) => {
			LoadingAlert();
			return axios.patch(baseUrlProduct + `${productColor}/${createPorductColor.id}`, createPorductColor.name);
		},
		{
			onSuccess: () => {
				Swal.close();
				SuccessAlert("Saved Changes SuccessFully!");
				colors.refetch();
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
			return axios.delete(baseUrlProduct + `${productColor}/${createCompany.id}`);
		},
		{
			onSuccess: () => {
				Swal.close();
				SuccessAlert("Deleted SuccessFully!");
				colors.refetch();
				setFetchAgain(true);
			},
			onError: (error) => {
				Swal.close();
				let errorMsg: any = error;
				FailureAlert(errorMsg.response.data.message);
			}
		}
	);
	const onClick = async (values: productColorValuesType, type: string, id: string) => {
		if (type == "close") {
			if (!id) {
				setLoader(true);
				mutation.mutate({ ...values, ["color"]: values.color.toLowerCase() });
			} else {
				let data: productColorValuesEditType = {
					name: { ...values, ["color"]: values.color.toLowerCase() },
					id: id
				};
				setLoader(true);
				mutationEdit.mutate(data);
			}
		} else if (type === "delete") {
			DeleteAlert(mutationDelete, id);
		} else {
			if (id) {
				let formDetails: any = values;
				setColorValue(formDetails);
			} else {
				setColorValue(productColorValues);
			}

			setMenu(!menu);
		}
	};

	const getAllColorList = async () => {
		setLoader(true);
		if (!colors.isLoading || fetchagain) {
			let list: Array<object> = [];
			let listName: any = [];
			let datacolor: any = await colors.data;
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
			datacolor?.forEach((item: any, index: number) => {
				let objdataName = { name: item.color?.charAt(0).toUpperCase() + item.color?.slice(1), id: item.id };
				listName.push(objdataName);
				let objData = [
					index + 1,
					`${item.color?.charAt(0).toUpperCase() + item.color?.slice(1)}`,
					item.coating_type.length > 0 ? (
						<span className={subCompanyDiv}>
							{item.coating_type.map((item1: any, index1: number) => (
								<span key={index1}>
									<span className={menuItmeStyle}>{item1.type}</span>
								</span>
							))}
						</span>
					) : (
						"_"
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
				list.push(objData);
			});
			setColorList(listName);
			setTableData(list);
			setLoader(false);
			setFetchAgain(false);
		}
	};

	return {
		menu,
		fetchagain,
		tableData,
		getAllColorList,
		colorValue,
		columns,
		onClick,
		loader,
		colorList
	};
}