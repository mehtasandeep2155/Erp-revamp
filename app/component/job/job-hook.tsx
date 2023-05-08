import { jobValues } from "@component/utils/form/initial-values";
import { job } from "@api/network";
import { baseUrlJob } from "@api/base-url";
import { CompanyValuesType } from "@component/utils/type/interfaces";
import axios from "axios";
import { useMutation } from "react-query";
import { Close, Delete, Edit } from "@mui/icons-material";
import { deleteBut, editIcon, flex } from "css/styles";
import { useState } from "react";
import { DeleteAlert, FailureAlert, LoadingAlert, SuccessAlert } from "@common/toastify";
import useConstant from "@component/utils/form/constant";
import Swal from "sweetalert2";

export default function useJob(jobs: any) {
	const [menu, setMenu] = useState(false);
	const [fetchagain, setFetchAgain] = useState(false);
	const [loader, setLoader] = useState(false);
	const [jobValue, setJobValue] = useState(jobValues);
	const { jobColums, monthNames } = useConstant();
	const [customerList, setCustomerList] = useState([]);
	const columns = jobColums;
	const [tableData, setTableData] = useState([]);
	const mutation = useMutation(
		(createCompany: CompanyValuesType) => {
			LoadingAlert();
			return axios.post(baseUrlJob + job, createCompany);
		},
		{
			onSuccess: () => {
				Swal.close();
				SuccessAlert("Job Details Added SuccessFully");
				jobs.refetch();
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
			return axios.patch(baseUrlJob + `${job}/${createCompany.id}`, createCompany.name);
		},
		{
			onSuccess: () => {
				Swal.close();
				SuccessAlert("Saved Changes SuccessFully!");
				jobs.refetch();
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
			return axios.delete(baseUrlJob + `${job}/${createCompany.id}`);
		},
		{
			onSuccess: () => {
				Swal.close();
				SuccessAlert("Deleted SuccessFully!");
				jobs.refetch();
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
		if (type === "customer") {
			setMenu(!menu);
		} else if (type === "delete") {
			DeleteAlert(mutationDelete, id);
		} else {
			if (type == "close") {
				if (!id) {
					let formDetails: any = {};
					if (values.payType.name === "fixed") {
						formDetails = {
							userId: values.userId.id,
							payType: values.payType.name,
							month: new Date(values.month).toISOString(),
							totalPay: values.totalPay
						};
					} else {
						formDetails = {
							userId: values.userId.id,
							payType: values.payType.name,
							month: new Date(values.month).toISOString(),
							feet_per_month: values.feet_per_month,
							rate_per_foot: values.rate_per_foot
						};
					}
					mutation.mutate(formDetails);
				} else {
					let formDetails: any = {};
					if (values.payType.name === "fixed") {
						formDetails = {
							userId: values.userId.id,
							payType: values.payType.name,
							month: new Date(values.month).toISOString(),
							totalPay: values.totalPay
						};
					} else {
						formDetails = {
							userId: values.userId.id,
							payType: values.payType.name,
							month: new Date(values.month).toISOString(),
							feet_per_month: values.feet_per_month,
							rate_per_foot: values.rate_per_foot
						};
					}
					let data: any = { name: formDetails, id: id };
					mutationEdit.mutate(data);
				}
			} else {
				if (id) {
					let date: any = `${new Date(values.month).getFullYear()}-${
						new Date(values.month).getMonth() + 1 > 9
							? new Date(values.month).getMonth() + 1
							: `0${new Date(values.month).getMonth() + 1}`
					}`;
					let formDetails: any = {
						userId: values.user,
						payType: { name: values.payType },
						totalPay: values.payType.name === "variable" ? 0 : values.totalPay,
						month: date,
						feet_per_month: values.payType === "fixed" ? 0 : values.rate_per_foot,
						rate_per_foot: values.payType === "fixed" ? 0 : values.rate_per_foot,
						id: id
					};
					setJobValue(formDetails);
				} else {
					setJobValue(jobValues);
				}
				setMenu(!menu);
			}
		}
	};
	const getAllCompanyList = async () => {
		setLoader(true);
		if (!jobs.isLoading || fetchagain) {
			let companyDetails = await jobs.data;
			let list: any = [];
			let customers: any = [];
			const moduleData = JSON.parse(localStorage.getItem("userdata"));
			let objModulesData: any = { controls: [] };
			if (moduleData) {
				if (moduleData.user.role !== "Admin" && moduleData.user.role !== "SuperAdmin") {
					moduleData.user.modules.map((moduleValue: any) => {
						if (moduleValue.name === "Job") {
							objModulesData = moduleValue;
						}
					});
				} else {
					objModulesData = { controls: ["Read", "Edit", "Delete"] };
				}
			}
			companyDetails?.forEach((item: any, index: number) => {
				let objData = [
					index+1,
					<span>user</span>,
					`${monthNames[new Date(item.month).getMonth()]}, ${item.month.slice(0, 4)}`,
					item.payType,
					item.feet_per_month ? item.feet_per_month : "_",
					item.rate_per_foot ? item.rate_per_foot : "_",
					item.totalPay ? item.totalPay : "_",
					<div className={flex}>
						{objModulesData.controls.includes("Edit") && (
							<Edit className={editIcon} onClick={() => onClick(item, "open", item.id)} />
						)}
						{objModulesData.controls.includes("Delete") && (
							<Delete className={deleteBut} onClick={() => onClick(item, "delete", item.id)} />
						)}
					</div>
				];
				customers.push(item);
				list.push(objData);
			});
			setCustomerList(customers);
			setTableData(list);
			setFetchAgain(false);
			setLoader(false);
		}
	};

	return {
		onClick,
		menu,
		jobValue,
		columns,
		fetchagain,
		getAllCompanyList,
		tableData,
		loader,
		customerList
	};
}
