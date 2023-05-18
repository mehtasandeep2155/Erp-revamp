import { productTypeValues } from "@component/utils/form/initial-values";
import { productType } from "@api/network";
import { baseUrlProduct } from "@api/base-url";
import { productTypeValuesType } from "@component/utils/type/interfaces";
import { useMutation } from "react-query";
import axios from "axios";
import { Delete, Edit } from "@mui/icons-material";
import { deleteBut, detailsMultiView, editIcon, flex, flexSummary, summaryDiv } from "css/styles";
import { useState } from "react";
import { DeleteAlert, FailureAlert, LoadingAlert, SuccessAlert } from "@common/toastify";
import { productTypeColums } from "@component/utils/form/constant";
import Swal from "sweetalert2";
import { getType } from "@api/get-api-queries";
import AccordionRowComponent from "@common/accordinon/accordion-row";
import { useRouter } from "next/router";
import { addCoating, productTypeList } from "@component/utils/routes";

export default function useProductType() {
	const [loader, setLoader] = useState(false);
	const [typeList, setTypeList] = useState([]);
	const [fetchagain, setFetchAgain] = useState(false);
	const [tableData, setTableData] = useState([]);
	const { push } = useRouter();
	const [page, setPage] = useState(1);
	const [rowsPerPage, setRowsPerPage] = useState(5);
	const [totalCount, setTotalCount] = useState(0);
	const typeValue: any = productTypeValues;
	const { types } = getType(page, rowsPerPage);
	const columns = productTypeColums;

	const handleChangePage = (event: any, newPage: any) => {
		setPage(newPage);
	};
	const handleChangeRowsPerPage = (event: any) => {
		setRowsPerPage(event.target.value);
	};

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
				push(productTypeList);
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
				push(productTypeList);
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

	const onClick = async (values: any, type: string, id: any) => {
		if (type === "close") {
			let companies: any = [];
			values.colors?.forEach((element: any) => {
				companies.push(element.id);
			});
			const formDetails: any = { ...values, ["colors"]: companies, ["type"]: values.type.toLowerCase() };
			if (!id) {
				setLoader(true);
				mutation.mutate(formDetails);
			} else {
				let data: any = {
					name: formDetails,
					id: id
				};
				setLoader(true);
				mutationEdit.mutate(data);
			}
		} else if (type === "model") {
			push(productTypeList);
		} else if (type === "delete") {
			DeleteAlert(mutationDelete, id);
		} else {
			if (id) {
				typeValue.type = values.type;
				typeValue.colors = values.colors;
				typeValue.id = values.id;
				push(addCoating);
			} else {
				typeValue.type = "";
				typeValue.colors = [];
				typeValue.id = "";
				push(addCoating);
			}
		}
	};

	const getAllProductType = async () => {
		setLoader(true);
		if (!types.isLoading || fetchagain) {
			let list: any = [];
			let listName: any = [];
			let dataType: any = await types.data;
			setTotalCount(dataType.count);
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
			dataType?.data?.forEach((item: any, index: number) => {
				let objdataName = { name: `${item.type} (${item.subtype})`, id: item.id };
				listName.push(objdataName);
				let data = [
					rowsPerPage * page + index - rowsPerPage + 1,
					`${item.type.charAt(0).toUpperCase() + item.type.slice(1)}`,
					<div className={summaryDiv}>
						{item.colors && (
							<AccordionRowComponent
								title={
									<div className={flexSummary}>
										{item.colors?.map(
											(item1: any, index1: number) =>
												index1 < 3 && (
													<span className={detailsMultiView}>
														{item1.color.charAt(0).toUpperCase() + item1.color.slice(1)}
													</span>
												)
										)}
									</div>
								}
								index={item.colors?.length}
								maxIndex={4}
								summary={
									<div className={flexSummary}>
										{item.colors.map((item1: any, index1: any) => {
											if (index1 > 2) {
												return (
													<span className={detailsMultiView}>
														{item1.color.charAt(0).toUpperCase() + item1.color.slice(1)}
													</span>
												);
											}
										})}
									</div>
								}
							/>
						)}
					</div>,
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
		page,
		handleChangePage,
		handleChangeRowsPerPage,
		rowsPerPage,
		types,
		tableData,
		fetchagain,
		totalCount,
		typeValue,
		columns,
		onClick,
		loader
	};
}
