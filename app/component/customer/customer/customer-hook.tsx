import { CustomerValues } from "@component/utils/form/initial-values";
import { customer } from "@api/network";
import { baseUrlCustmer } from "@api/base-url";
import { CompanyValuesType } from "@component/utils/type/interfaces";
import axios from "axios";
import { useMutation } from "react-query";
import { Close, Delete, Edit } from "@mui/icons-material";
import { deleteBut, editIcon, flex } from "css/styles";
import { useState } from "react";
import { DeleteAlert, FailureAlert, LoadingAlert, SuccessAlert } from "@common/toastify";
import useConstant from "@component/utils/form/constant";
import Swal from "sweetalert2";
import { getCustomer } from "@api/get-api-queries";

export default function useCustomer() {
	const [menuCustomer, setMenuCustomer] = useState(false);
	const [fetchagain, setFetchAgain] = useState(false);
	const [loader, setLoader] = useState(false);
	const [customerValue, setCustomerValue] = useState(CustomerValues);
	const { customerColums } = useConstant();
	const [customerList, setCustomerList] = useState([]);
	const columns = customerColums;
	const { customerlists } = getCustomer();
	const [tableData, setTableData] = useState([]);
	const mutation = useMutation(
		(createCompany: CompanyValuesType) => {
			LoadingAlert();
			return axios.post(baseUrlCustmer + customer, createCompany);
		},
		{
			onSuccess: () => {
				Swal.close();
				SuccessAlert("Customer Added SuccessFully");
				customerlists.refetch();
				setFetchAgain(true);
				setMenuCustomer(!menuCustomer);
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
			return axios.patch(baseUrlCustmer + `${customer}/${createCompany.id}`, createCompany.name);
		},
		{
			onSuccess: () => {
				Swal.close();
				SuccessAlert("Saved Changes SuccessFully!");
				customerlists.refetch();
				setFetchAgain(true);
				setMenuCustomer(!menuCustomer);
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
			return axios.delete(baseUrlCustmer + `${customer}/${createCompany.id}`);
		},
		{
			onSuccess: () => {
				Swal.close();
				SuccessAlert("Deleted SuccessFully!");
				customerlists.refetch();
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
			setMenuCustomer(!menuCustomer);
		} else if (type === "delete") {
			DeleteAlert(mutationDelete, id);
		} else {
			if (type == "close") {
				if (!id) {
					mutation.mutate(values);
				} else {
					let data: any = { name: values, id: id };
					mutationEdit.mutate(data);
				}
			} else {
				if (id) {
					setCustomerValue(values);
				} else {
					setCustomerValue(CustomerValues);
				}
				setMenuCustomer(!menuCustomer);
			}
			setMenuCustomer(!menuCustomer);
		}
	};

	const getAllCompanyList = async () => {
		setLoader(true);
		if (!customerlists.isLoading || fetchagain) {
			let list: any = [];
			let customers: any = [];
			let companyDetails = await customerlists.data;
			const moduleData = JSON.parse(localStorage.getItem("userdata"));
			let objModulesData: any = { controls: [] };
			if (moduleData) {
				if (moduleData.user.role !== "Admin" && moduleData.user.role !== "SuperAdmin") {
					moduleData.user.modules.map((moduleValue: any) => {
						if (moduleValue.name === "Customer") {
							objModulesData = moduleValue;
						}
					});
				} else {
					objModulesData = { controls: ["Read", "Edit", "Delete"] };
				}
			}
			companyDetails?.forEach((item: any, index: number) => {
				let objData = [
					index + 1,
					item.name.charAt(0).toUpperCase() + item.name.slice(1),
					item.email,
					item.phone,
					item.credit_status,
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
		menuCustomer,
		customerValue,
		columns,
		fetchagain,
		getAllCompanyList,
		tableData,
		customerList,
		loader
	};
}
