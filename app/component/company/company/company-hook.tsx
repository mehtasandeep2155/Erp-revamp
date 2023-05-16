import { CompanyValues } from "@component/utils/form/initial-values";
import { company } from "@api/network";
import { baseUrlCompany } from "@api/base-url";
import { CompanyValuesType } from "@component/utils/type/interfaces";
import axios from "axios";
import { useMutation } from "react-query";
import { Close, Delete, Edit } from "@mui/icons-material";
import {
	companyChip,
	deleteBut,
	detailsMultiView,
	editIcon,
	flex,
	flexSummary,
	menuItmeStyle,
	subCompanyDiv,
	summaryCompanyDiv,
	summaryDiv
} from "css/styles";
import { useState } from "react";
import { DeleteAlert, FailureAlert, LoadingAlert, SuccessAlert } from "@common/toastify";
import { companyColums } from "@component/utils/form/constant";
import { Chip } from "@mui/material";
import Swal from "sweetalert2";
import { getCompany } from "@api/get-api-queries";
import AccordionRowComponent from "@common/accordinon/accordion-row";

export default function useCompany() {
	const [menu, setMenu] = useState(false);
	const [fetchagain, setFetchAgain] = useState(false);
	const [loader, setLoader] = useState(false);
	const [companyValue, setCompanyValue] = useState(CompanyValues);
	const { companies } = getCompany();
	const [allComapnyList, setAllCompanyList] = useState(companies.data);
	const columns = companyColums;
	const [tableData, setTableData] = useState([]);
	const mutation = useMutation(
		(createCompany: CompanyValuesType) => {
			LoadingAlert();
			return axios.post(baseUrlCompany + company, createCompany);
		},
		{
			onSuccess: () => {
				Swal.close();
				SuccessAlert("Company Added SuccessFully");
				companies.refetch();
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
	const mutationEdit = useMutation(
		(createCompany: any) => {
			LoadingAlert();
			return axios.patch(baseUrlCompany + `${company}/${createCompany.id}`, createCompany.name);
		},
		{
			onSuccess: () => {
				Swal.close();
				SuccessAlert("Saved Changes SuccessFully!");
				companies.refetch();
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
			return axios.delete(baseUrlCompany + `${company}/${createCompany.id}`);
		},
		{
			onSuccess: () => {
				Swal.close();
				SuccessAlert("Deleted SuccessFully!");
				companies.refetch();
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
				let companies: any = [];
				values.subCompanyId.forEach((element: any) => {
					companies.push(element.id);
				});
				mutation.mutate({ ...values, ["subCompanyId"]: companies });
			} else {
				let companies: any = [];
				values.subCompanyId.forEach((element: any) => {
					companies.push(element.id);
				});
				let data: any = { name: { ...values, ["subCompanyId"]: companies }, id: id };
				mutationEdit.mutate(data);
			}
		} else if (type === "delete") {
			DeleteAlert(mutationDelete, id);
		} else {
			if (id) {
				let obj = { name: values.name, ["subCompanyId"]: values.sub_company, id: values.id };
				setCompanyValue(obj);
			} else {
				setCompanyValue(CompanyValues);
			}
			setMenu(!menu);
		}
	};

	const getAllCompanyList = async () => {
		setLoader(true);
		if (!companies.isLoading || fetchagain) {
			let list: any = [];
			let companyDetails = await companies.data;
			const moduleData = JSON.parse(localStorage.getItem("userdata"));
			let objModulesData: any = { controls: [] };
			if (moduleData) {
				if (moduleData.user.role !== "Admin" && moduleData.user.role !== "SuperAdmin") {
					moduleData.user.modules.map((moduleValue: any) => {
						if (moduleValue.name === "Company") {
							objModulesData = moduleValue;
						}
					});
				} else {
					objModulesData = { controls: ["Read", "Edit", "Delete"] };
				}
			}
			setAllCompanyList(companyDetails);
			companyDetails?.forEach((item: any, index: number) => {
				let objData = [
					index + 1,
					item.name.charAt(0).toUpperCase() + item.name.slice(1),
					<div className={summaryCompanyDiv}>
						{item.sub_company ? (
							<AccordionRowComponent
								title={
									<div className={flexSummary}>
										{item.sub_company?.map(
											(item1: any, index1: number) =>
												index1 < 1 && (
													<span className={detailsMultiView}>
														{item1.name.charAt(0).toUpperCase() + item1.name.slice(1)}
														{index1 < 1 - 1 ? "," : ""}
													</span>
												)
										)}
									</div>
								}
								index={item.sub_company?.length}
								maxIndex={2}
								summary={
									<div className={flexSummary}>
										{item.sub_company.map((item1: any, index1: any) => {
											if (index1 > 0) {
												return (
													<span className={detailsMultiView}>
														{item1.name.charAt(0).toUpperCase() + item1.name.slice(1)}
														{index1 < item.sub_company.length - 1 ? "," : ""}
													</span>
												);
											}
										})}
									</div>
								}
							/>
						) : (
							"_"
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
				list.push(objData);
			});
			setTableData(list);
			setFetchAgain(false);
			setLoader(false);
		}
	};

	return {
		onClick,
		menu,
		companyValue,
		columns,
		fetchagain,
		getAllCompanyList,
		tableData,
		allComapnyList,
		loader
	};
}
