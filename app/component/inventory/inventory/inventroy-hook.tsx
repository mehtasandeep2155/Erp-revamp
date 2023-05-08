import axios from "axios";
import { inventory } from "@api/network";
import { baseUrlInventory } from "@api/base-url";
import { useMutation } from "react-query";
import { inventoryViewValuesType } from "@component/utils/type/interfaces";
import { useState } from "react";
import { deleteBut, detailsViewBut, editIcon, flex, menuItmeStyle } from "css/styles";
import { Close, Edit } from "@mui/icons-material";
import { inventoryValues } from "@component/utils/form/initial-values";
import { DeleteAlert, FailureAlert, LoadingAlert, SuccessAlert } from "@common/toastify";
import useConstant from "@component/utils/form/constant";
import Swal from "sweetalert2";
import { getInventory } from "@api/get-api-queries";

export default function useInventory() {
	const { inventoryColums } = useConstant();
	const coloums = inventoryColums;
	const [menu, setMenu] = useState(false);
	const [fetchagain, setFetchAgain] = useState(false);
	const [TableData, setTableData] = useState([]);
	const [inventoryvalue, setInvevtoryvalue] = useState(inventoryValues);
	const [loader, setLoader] = useState(false);
	const { inventries } = getInventory();

	const mutation = useMutation(
		(createPorductVariant: inventoryViewValuesType) => {
			LoadingAlert();
			let data1 = axios.post(baseUrlInventory + inventory, createPorductVariant);
			return data1;
		},
		{
			onSuccess: () => {
				Swal.close();
				SuccessAlert("Inventory Added SuccessFully!");
				inventries.refetch();
				setFetchAgain(true);
				setMenu(!menu);
			},
			onError: (error) => {
				let errorMsg: any = error;
				FailureAlert(errorMsg.response.data.message);
				setLoader(false);
			}
		}
	);

	const mutationEdit = useMutation(
		(createPorductVariant: any) => {
			LoadingAlert();
			let data1 = axios.patch(
				baseUrlInventory + `${inventory}/${createPorductVariant.id}`,
				createPorductVariant.value
			);
			return data1;
		},
		{
			onSuccess: () => {
				Swal.close();
				SuccessAlert("Saved Changes SuccessFully!");
				inventries.refetch();
				setFetchAgain(true);
				setMenu(!menu);
			},
			onError: (error) => {
				let errorMsg: any = error;
				FailureAlert(errorMsg.response.data.message);
				setLoader(false);
			}
		}
	);

	const handleView = (item: any) => {};

	const getAllInventoryViewList = async () => {
		setLoader(true);
		if (!inventries.isLoading || fetchagain) {
			let list: any = [];
			let dataInventries: any = await inventries.data;
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
			dataInventries?.forEach((item: any, index: number) => {
				let objdata = [
					index + 1,
					item.product ? (
						<span className={detailsViewBut} onClick={() => handleView(item)}>
							{item.product.name} #{item.product.code}
						</span>
					) : (
						"_"
					),
					item.quantity,
					<div className={flex}>
						{objModulesData.controls.includes("Edit") && (
							<Edit className={editIcon} onClick={() => onClick(item, "open", item.id)} />
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
			return axios.delete(baseUrlInventory + `${inventory}/${createCompany.id}`);
		},
		{
			onSuccess: () => {
				Swal.close();
				SuccessAlert("Deleted SuccessFully!");
				inventries.refetch();
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
				setInvevtoryvalue(formDetails);
				setMenu(!menu);
			} else {
				setInvevtoryvalue(inventoryvalue);
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
		getAllInventoryViewList,
		TableData,
		onClick,
		inventoryvalue,
		loader
	};
}
