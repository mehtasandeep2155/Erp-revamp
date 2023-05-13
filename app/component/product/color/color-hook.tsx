import { productColor } from "@api/network";
import { baseUrlProduct } from "@api/base-url";
import { productColorValuesType, productColorValuesEditType } from "@component/utils/type/interfaces";
import { useState } from "react";
import { productColorValues } from "@component/utils/form/initial-values";
import axios from "axios";
import { useMutation } from "react-query";
import { Delete, Edit } from "@mui/icons-material";
import { editIcon, flex, deleteBut, subCompanyDiv, menuItmeStyle } from "css/styles";
import { DeleteAlert, FailureAlert, LoadingAlert, SuccessAlert } from "@common/toastify";
import Swal from "sweetalert2";
import { getColor } from "@api/get-api-queries";

export default function useColor() {
	const [loader, setLoader] = useState(false);
	const [colorList, setColorList] = useState([]);
	const { colors } = getColor();
	const [fetchagain, setFetchAgain] = useState(false);
	const [menu, setMenu] = useState(false);
	const [colorValue, setColorValue] = useState(productColorValues);
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
	const onClick = async (values: productColorValuesType, type: string, id: any) => {
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
					item.code,
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
		onClick,
		loader,
		colorList
	};
}
