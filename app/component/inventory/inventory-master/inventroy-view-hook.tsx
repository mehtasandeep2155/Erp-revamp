import axios from "axios";
import { inventoryMaster } from "@api/network";
import { baseUrlInventory } from "@api/base-url";
import { useMutation } from "react-query";
import { inventoryViewValuesType } from "@component/utils/type/interfaces";
import { useState } from "react";
import { deleteBut, detailsViewBut, editIcon, flex } from "css/styles";
import { Close, Delete, Edit } from "@mui/icons-material";
import { inventoryMasterValues } from "@component/utils/form/initial-values";
import { DeleteAlert, FailureAlert, LoadingAlert, SuccessAlert } from "@common/toastify";
import { inventoryViewColums } from "@component/utils/form/constant";
import Swal from "sweetalert2";
import { getInventoryMaster } from "@api/get-api-queries";
import { useValidation } from "@component/utils/form/validation";

export default function useInventoryView() {
	const coloums = inventoryViewColums;
	const [menu, setMenu] = useState(false);
	const [TableData, setTableData] = useState([]);
	const [InvevtoryViewvalue, setInvevtoryViewvalue] = useState(inventoryMasterValues);
	const [isOpenVariant, setIsOpenVariant] = useState(false);
	const [variantObj, setVariantObj] = useState({});
	const [loader, setLoader] = useState(false);
	const [inventoryList, setinventoryList] = useState([]);
	const [fetchagain, setFetchAgain] = useState(false);
	const { inventoryviews } = getInventoryMaster();
	const [dataList, setDataList] = useState([]);
	const { InventoryMasterSchema } = useValidation(InvevtoryViewvalue);
	const [clickAction, setClickAction] = useState(false);

	const handleDelete = (values: any) => {
		setDataList(dataList.filter((item) => item != values));
	};

	const handleReset = (props: any) => {
		setClickAction(true);
	};

	const handleSubmit = (values: any) => {
		if (dataList.length < 1) {
			setClickAction(false);
		} else {
			dataList.push({
				...values,
				["actionType"]: values.actionType.name,
				["type"]: values.type.name,
				["productId"]: values.productId.id
			});
			onClick(dataList, "close", values.id.id);
		}
	};

	const handleMore = (values: any, { resetForm }: any) => {
		const castValues: any = InventoryMasterSchema.cast(values);
		if (clickAction === true) {
			dataList.push({
				...castValues,
				["actionType"]: castValues.actionType.name,
				["type"]: castValues.type.name,
				["productId"]: castValues.productId.id
			});
			setClickAction(false);
			setInvevtoryViewvalue(inventoryMasterValues);
			resetForm();
		} else {
			onClick(
				[
					{
						...castValues,
						["actionType"]: castValues.actionType.name,
						["type"]: castValues.type.name,
						["productId"]: castValues.productId.id
					}
				],
				"close",
				values.id
			);
		}
	};

	const mutation = useMutation(
		(createPorductVariant: inventoryViewValuesType) => {
			LoadingAlert();
			let data1 = axios.post(baseUrlInventory + inventoryMaster, createPorductVariant);
			return data1;
		},
		{
			onSuccess: () => {
				setMenu(!menu);
				Swal.close();
				SuccessAlert("Inventory Master Added SuccessFully!");
				inventoryviews.refetch();
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

	const handleView = (item: any) => {
		setIsOpenVariant(!isOpenVariant);
		let list: any = [];
		if (item) {
			let obj = [
				item.sectionName.charAt(0).toUpperCase() + item.sectionName.slice(1),
				item.sectionNumber,
				item.height,
				item.width,
				item.weight,
				item.thickness,
				item.outerDiameter
			];
			list.push(obj);
			setVariantObj(list);
		}
	};

	const mutationDelete = useMutation(
		(createCompany: any) => {
			LoadingAlert();
			return axios.delete(baseUrlInventory + `${inventoryMaster}/${createCompany.id}`);
		},
		{
			onSuccess: () => {
				Swal.close();
				SuccessAlert("Deleted SuccessFully!");
				inventoryviews.refetch();
				setFetchAgain(true);
			},
			onError: (error) => {
				Swal.close();
				let errorMsg: any = error;
				FailureAlert(errorMsg.response.data.message);
			}
		}
	);

	const getAllInventoryViewList = async () => {
		setLoader(true);
		if (!inventoryviews.isLoading || fetchagain) {
			let list: any = [];
			let listName: any = [];
			let dataVariant: any = await inventoryviews.data;
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
					index+1,
					item.product ? (
						<span className={detailsViewBut} onClick={() => handleView(item)}>
							{item.product.name}
						</span>
					) : (
						"_"
					),
					item.quantity,
					item.type,
					item.actionType,
					<div className={flex}>
						{objModulesData.controls.includes("Edit") && (
							<Edit className={editIcon} onClick={() => onClick(item, "open", item.id)} />
						)}
						{objModulesData.controls.includes("Delete") && (
							<Delete className={deleteBut} onClick={() => onClick(item, "delete", item.id)} />
						)}
					</div>
				];
				listName.push({ name: item.type, id: item.id });
				list.push(objdata);
			});
			setinventoryList(list);
			setTableData(list);
			setLoader(false);
			setFetchAgain(false);
			setMenu(false);
		}
	};

	const onClick = async (values: any, type: string, id: any) => {
		if (type == "close") {
			let formDetails: any = {
				productData: values
			};
			if (!id) {
				setLoader(true);
				mutation.mutate(formDetails);
				setMenu(!menu);
			}
		} else if (type === "delete") {
			DeleteAlert(mutationDelete, id);
		} else {
			if (id) {
				let formDetails: any = {
					...values,
					["actionType"]: { name: values.actionType },
					["type"]: { name: values.type },
					productId: values.product
				};
				setInvevtoryViewvalue(formDetails);
				setMenu(!menu);
			} else {
				setInvevtoryViewvalue(inventoryMasterValues);
				setMenu(!menu);
			}
			setMenu(!menu);
		}
	};

	return {
		coloums,
		fetchagain,
		menu,
		mutation,
		getAllInventoryViewList,
		TableData,
		onClick,
		InvevtoryViewvalue,
		handleReset,
		inventoryList,
		loader,
		isOpenVariant,
		handleView,
		handleSubmit,
		handleMore,
		handleDelete,
		dataList,
		variantObj
	};
}
