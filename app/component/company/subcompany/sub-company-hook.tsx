import { subCompany } from "@api/network";
import { baseUrlCompany } from "@api/base-url";
import axios from "axios";
import { subCompanyValues } from "@component/utils/form/initial-values";
import { SubCompanyValuesType } from "@component/utils/type/interfaces";
import { useMutation } from "react-query";
import { Close, Delete, Edit } from "@mui/icons-material";
import { deleteBut, editIcon, flex } from "css/styles";
import { useState } from "react";
import { DeleteAlert, FailureAlert, LoadingAlert, SuccessAlert } from "@common/toastify";
import { subCompanyColums } from "@component/utils/form/constant";
import Swal from "sweetalert2";
import { getSubCompany } from "@api/get-api-queries";

export default function useSubCompany() {
	const [menu, setMenu] = useState(false);
	const [fetchagain, setFetchAgain] = useState(false);
	const [loader, setLoader] = useState(false);
	const [subCompanyList, subcomapnylist] = useState([]);
	const [subCompanyValue, setSubCompanyValue] = useState(subCompanyValues);
	const columns = subCompanyColums;
	const [tableData, setTableData] = useState();
	const [page, setPage] = useState(1);
	const [totalCount, setTotalCount] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(5);
	const handleChangePage = (event: any, newPage: any) => {
		setPage(newPage);
	};
	const handleChangeRowsPerPage = (event: any) => {
		setRowsPerPage(event.target.value);
	};
	const { subcompanies } = getSubCompany(page, rowsPerPage);
	const mutation = useMutation(
		(createSubCompany: SubCompanyValuesType) => {
			LoadingAlert();
			return axios.post(baseUrlCompany + subCompany, createSubCompany);
		},
		{
			onSuccess: () => {
				Swal.close();
				SuccessAlert("Sub Company Added SuccessFully!");
				subcompanies.refetch();
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
		(createSubCompany: SubCompanyValuesType) => {
			LoadingAlert();
			return axios.patch(baseUrlCompany + `${subCompany}/${createSubCompany.id}`, createSubCompany.name);
		},
		{
			onSuccess: () => {
				Swal.close();
				SuccessAlert("Saved Changes SuccessFully!");
				subcompanies.refetch();
				setFetchAgain(true);
				setMenu(!menu);
			},
			onError: (error) => {
				let errorMsg: any = error;
				FailureAlert(errorMsg.response.data.message);
			}
		}
	);

	const mutationDelete = useMutation(
		(createCompany: any) => {
			LoadingAlert();
			return axios.delete(baseUrlCompany + `${subCompany}/${createCompany.id}`);
		},
		{
			onSuccess: () => {
				Swal.close();
				SuccessAlert("Deleted SuccessFully!");
				subcompanies.refetch();
				setFetchAgain(true);
			},
			onError: (error) => {
				Swal.close();
				let errorMsg: any = error;
				FailureAlert(errorMsg.response.data.message);
			}
		}
	);

	const onClick = async (values: SubCompanyValuesType, type: string, id: string) => {
		if (type == "close") {
			if (!id) {
				mutation.mutate(values);
			} else {
				let data: any = { name: values, id: id };
				mutationEdit.mutate(data);
			}
		} else if (type === "delete") {
			DeleteAlert(mutationDelete, id);
		} else {
			if (id) {
				setSubCompanyValue(values);
			} else {
				setSubCompanyValue(subCompanyValues);
			}
			setMenu(!menu);
		}
	};

	const getSubCompanyList = async () => {
		setLoader(true);
		if (!subcompanies.isLoading || fetchagain) {
			let list: any = [];
			const datasubcompany: any = await subcompanies.data;
			setTotalCount(datasubcompany?.count);
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
			datasubcompany?.data?.forEach((item: any, index: number) => {
				let objData = [
					rowsPerPage * page + index - rowsPerPage + 1,
					item.name.charAt(0).toUpperCase() + item.name.slice(1),
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
			subcomapnylist(datasubcompany?.data);
			setLoader(false);
			setFetchAgain(false);
		}
	};

	return {
		getSubCompanyList,
		onClick,
		subCompanyValue,
		columns,
		tableData,
		menu,
		fetchagain,
		loader,
		page,
		rowsPerPage,
		handleChangePage,
		handleChangeRowsPerPage,
		totalCount,
		subCompanyList
	};
}
