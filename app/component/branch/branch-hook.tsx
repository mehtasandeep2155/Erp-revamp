import { branchValues } from "@component/utils/form/initial-values";
import { branch } from "@api/network";
import { baseUrlPurchaseOrder } from "@api/base-url";
import { BranchValueTypes } from "@component/utils/type/interfaces";
import axios from "axios";
import { useMutation } from "react-query";
import { Delete, Edit } from "@mui/icons-material";
import { deleteBut, editIcon, flex } from "css/styles";
import { useState } from "react";
import { DeleteAlert, FailureAlert, LoadingAlert, SuccessAlert } from "@common/toastify";
import { branchColums } from "@component/utils/form/constant";
import Swal from "sweetalert2";
import { getBranch } from "@api/get-api-queries";

export default function useBranch() {
	const [menu, setMenu] = useState(false);
	const [page, setPage] = useState(1);
	const [totalCount, setTotalCount] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(5);
	const handleChangePage = (event: any, newPage: any) => {
		setPage(newPage);
	};
	const handleChangeRowsPerPage = (event: any) => {
		setRowsPerPage(event.target.value);
	};
	const { branches } = getBranch(page, rowsPerPage);
	const [fetchagain, setFetchAgain] = useState(false);
	const [loader, setLoader] = useState(false);
	const [branchValue, setBranchValue] = useState(branchValues);
	const [customerList, setCustomerList] = useState([]);
	const columns = branchColums;
	const [tableData, setTableData] = useState([]);
	const [branchList, setBranchList] = useState([]);

	const mutation = useMutation(
		(createCompany: BranchValueTypes) => {
			LoadingAlert();
			return axios.post(baseUrlPurchaseOrder + branch, createCompany);
		},

		{
			onSuccess: () => {
				Swal.close();
				SuccessAlert("Branch Added SuccessFully");
				branches.refetch();
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
			return axios.patch(baseUrlPurchaseOrder + `${branch}/${createCompany.id}`, createCompany.name);
		},
		{
			onSuccess: () => {
				Swal.close();
				SuccessAlert("Saved Changes SuccessFully!");
				branches.refetch();
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
			return axios.delete(baseUrlPurchaseOrder + `${branch}/${createCompany.id}`);
		},
		{
			onSuccess: () => {
				Swal.close();
				SuccessAlert("Deleted SuccessFully!");
				branches.refetch();
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
					mutation.mutate({ ...values, ["type"]: values.type.name });
				} else {
					let data: any = { name: { ...values, ["type"]: values.type.name }, id: id };
					mutationEdit.mutate(data);
				}
			} else {
				if (id) {
					setBranchValue({ ...values, ["type"]: { name: values.type } });
				} else {
					setBranchValue(branchValues);
				}
				setMenu(!menu);
			}
		}
	};
	const getAllBranchList = async () => {
		setLoader(true);
		let branchDetails = await branches?.data;
		setTotalCount(branchDetails?.count);
		if (!branches.isLoading || fetchagain) {
			setBranchList(branches.data?.data);
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
			branchDetails?.data?.forEach((item: any, index: number) => {
				let objData = [
					rowsPerPage * page + index - rowsPerPage + 1,
					item.name.charAt(0).toUpperCase() + item.name.slice(1) + item.code,
					item.type.charAt(0).toUpperCase() + item.type.slice(1),
					item.contact_phone,
					item.contact_name.charAt(0).toUpperCase() + item.contact_name.slice(1),
					item.phone,
					item.address,
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
		branchValue,
		columns,
		fetchagain,
		getAllBranchList,
		tableData,
		page,
		rowsPerPage,
		handleChangePage,
		handleChangeRowsPerPage,
		totalCount,
		loader,
		branchList,
		customerList
	};
}
