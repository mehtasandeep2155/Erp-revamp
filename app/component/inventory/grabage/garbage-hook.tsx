import axios from "axios";
import { garbage } from "@api/network";
import { baseUrlInventory } from "@api/base-url";
import { useMutation } from "react-query";
import { GarbageValuesType } from "@component/utils/type/interfaces";
import { useState } from "react";
import { deleteBut, detailsViewBut, editIcon, flex } from "css/styles";
import { Close, EditOutlined } from "@mui/icons-material";
import { garbageValues } from "@component/utils/form/initial-values";
import { DeleteAlert, FailureAlert, LoadingAlert, SuccessAlert } from "@common/toastify";
import useConstant from "@component/utils/form/constant";
import Swal from "sweetalert2";
import { getGarbage } from "@api/get-api-queries";

export default function useGarbage() {
	const { garbageColums } = useConstant();
	const coloums = garbageColums;
	const [menu, setMenu] = useState(false);
	const [fetchagain, setFetchAgain] = useState(false);
	const [TableData, setTableData] = useState([]);
	const [GarbageValue, setGarbageValue] = useState(garbageValues);
	const [loader, setLoader] = useState(false);
	const { garbages } = getGarbage();
	const mutation = useMutation(
		(createPorductVariant: GarbageValuesType) => {
			LoadingAlert();
			let data1 = axios.post(baseUrlInventory + garbage, createPorductVariant);
			return data1;
		},
		{
			onSuccess: () => {
				Swal.close();
				SuccessAlert("Garbage Added SuccessFully");
				garbages.refetch();
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
		(createPorductVariant: GarbageValuesType) => {
			LoadingAlert();
			let data1 = axios.patch(
				baseUrlInventory + `${garbage}/${createPorductVariant.id}`,
				createPorductVariant.value
			);
			return data1;
		},
		{
			onSuccess: () => {
				Swal.close();
				SuccessAlert("Saved Changes SuccessFully");
				garbages.refetch();
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

	const handleView = (item: any) => {};

	const getGarbageList = async () => {
		setLoader(true);
		if (!garbages.isLoading || fetchagain) {
			let list: any = [];
			let dataVariant: any = await garbages.data;
			const moduleData = JSON.parse(localStorage.getItem("userdata"));
			let objModulesData: any = { controls: [] };
			if (moduleData) {
				if (moduleData.user.role !== "Admin" && moduleData.user.role !== "SuperAdmin") {
					moduleData.user.modules.map((moduleValue: any) => {
						if (moduleValue.name === "Inventory") {
							objModulesData = moduleValue;
						}
					});
				} else {
					objModulesData = { controls: ["Read", "Edit", "Delete"] };
				}
			}
			dataVariant?.forEach((item: any, index: number) => {
				let objdata = [
					index,
					item.product ? (
						<span className={detailsViewBut} onClick={() => handleView(item)}>
							{item.product.name} #{item.product.code}
						</span>
					) : (
						"_"
					),
					item.quantity,
					item.length,
					<div className={flex}>
						{objModulesData.controls.includes("Edit") && (
							<EditOutlined className={editIcon} onClick={() => onClick(item, "open", item.id)} />
						)}
						{objModulesData.controls.includes("Delete") && (
							<Close className={deleteBut} onClick={() => onClick(item, "delete", item.id)} />
						)}
					</div>
				];
				list.push(objdata);
			});
			setTableData(list);
			setLoader(false);
			setFetchAgain(false);
		}
	};
	const mutationDelete = useMutation(
		(createCompany: any) => {
			LoadingAlert();
			return axios.delete(baseUrlInventory + `${garbage}/${createCompany.id}`);
		},
		{
			onSuccess: () => {
				Swal.close();
				SuccessAlert("Deleted SuccessFully!");
				garbages.refetch();
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
			if (!id) {
				mutation.mutate({ ...values, ["productId"]: values.productId.id });
			} else {
				let formDetails: any = { ...values, ["productId"]: values.productId.id };
				let data: any = { value: formDetails, id: id };
				setLoader(true);
				mutationEdit.mutate(data);
			}
		} else if (type === "delete") {
			DeleteAlert(mutationDelete, id);
		} else {
			if (id) {
				let formDetails: any = { ...values, productId: values.product };
				setGarbageValue(formDetails);
				setMenu(!menu);
			} else {
				setGarbageValue(garbageValues);
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
		getGarbageList,
		TableData,
		onClick,
		GarbageValue,
		loader
	};
}
