import { useState } from "react";
import { baseUrl } from "@api/base-url";
import { handleuser, signUp } from "@api/network";
import { subCompanyDiv, editIcon, flex, newDiv, flexSummary, detailsMultiView, summaryCompanyDiv } from "@css/styles";
import { VerifyValues } from "@component/utils/form/initial-values";
import axios from "axios";
import { useMutation } from "react-query";
import { Edit } from "@mui/icons-material";
import { FailureAlert, LoadingAlert, SuccessAlert } from "@common/toastify";
import { array } from "@component/utils/form/constant";
import Swal from "sweetalert2";
import { getCompany, getUsers } from "@api/get-api-queries";
import AccordionRowComponent from "@common/accordinon/accordion-row";

export default function useVerification() {
	const { companies } = getCompany("", "");
	const [companyList, setCompanyList] = useState([]);
	const [menu, setMenu] = useState(false);
	const [loader, setLoader] = useState(false);
	const [page, setPage] = useState(1);
	const [rowsPerPage, setRowsPerPage] = useState(5);
	const [totalCount, setTotalCount] = useState(0);

	const handleChangePage = (event: any, newPage: any) => {
		setPage(newPage);
	};
	const handleChangeRowsPerPage = (event: any) => {
		setRowsPerPage(event.target.value);
	};
	const { users } = getUsers(page, rowsPerPage);
	const [userDetails, setuserDetails] = useState<any>(VerifyValues);
	const [fetchagain, setFetchAgain] = useState(false);
	const [tableData, setTableData] = useState();
	const [userList, setUserlist] = useState([]);
	const [tableDataSelect, setTableDataSelect] = useState([]);

	const handleOnUserClick = (currentRowsSelected: any, allRowsSelected: any, setFieldValue: any) => {
		setFieldValue(["userId"], userList[allRowsSelected.rowIndex]);
	};

	const mutationEdit = useMutation(
		(createPorductUom: any) => {
			setLoader(true);
			LoadingAlert();
			return axios.patch(baseUrl + handleuser, createPorductUom);
		},
		{
			onSuccess: () => {
				setMenu(!menu);
				Swal.close();
				SuccessAlert("Upadeted SuccessFully!");
				users.refetch();
				setFetchAgain(true);
			},
			onError: (error) => {
				let errorMsg: any = error;
				FailureAlert(errorMsg.response.data.message);
			}
		}
	);

	const mutation = useMutation(
		(createPorductUom: any) => {
			setLoader(true);
			LoadingAlert();
			return axios.post(baseUrl + signUp, createPorductUom);
		},
		{
			onSuccess: () => {
				setMenu(!menu);
				Swal.close();
				SuccessAlert("Added SuccessFully!");
				users.refetch();
				setFetchAgain(true);
			},
			onError: (error) => {
				let errorMsg: any = error;
				FailureAlert(errorMsg.response.data.message);
			}
		}
	);
	const onClick = async (item: any, type: string, id: string) => {
		if (type == "close") {
			setMenu(!menu);
		} else if (type == "submit") {
			let list: any = [];
			let access: any = [];
			array.map((item1: any) => {
				if (item[item1].controls.Read) {
					access.push("Read");
				}
				if (item[item1].controls.Edit) {
					access.push("Edit");
				}
				if (item[item1].controls.Delete) {
					access.push("Delete");
				}
				if (access.length > 0) {
					list.push({ name: item1, controls: access });
					access = [];
				}
			});
			const comapnyData = JSON.parse(localStorage.getItem("userdata"));
			const formDetails: any = {
				email: item.email,
				role: item.role,
				companyId: comapnyData?.user?.company?.id,
				moduleAccess: item.role === "Admin" || item.role === "SuperAdmin" ? list : []
				// verifyUser: item.verifyUser ? true : false
			};
			if (id) {
				setLoader(true);
				mutationEdit.mutate(formDetails);
			} else {
				setLoader(true);
				mutation.mutate({ ...formDetails, name: item.name, password: item.password });
			}
		} else {
			if (id) {
				let obj: any = {};
				item.modules.map((item: any) => {
					obj = {
						...obj,
						[item.name]: {
							name: item.name,
							controls: {
								Read: item.controls.includes("Read"),
								Edit: item.controls.includes("Edit"),
								Delete: item.controls.includes("Delete")
							}
						}
					};
				});
				let details: any = {
					name: item.name,
					email: item.email,
					role: item.role,
					Products: obj.Products ? obj.Products : { name: "Products", controls: {} },
					User: obj.User ? obj.User : { name: "User", controls: {} },
					PurchaseOrders: obj.PurchaseOrders ? obj.PurchaseOrders : { name: "PurchaseOrders", controls: {} },
					Company: obj.Company ? obj.Company : { name: "Company", controls: {} },
					Ledger: obj.Ledger ? obj.Ledger : { name: "Ledger", controls: {} },
					Inventory: obj.Inventory ? obj.Inventory : { name: "Inventory", controls: [] },
					Customers: obj.Customers ? obj.Customers : { name: "Customers", controls: {} },
					Job: obj.Job ? obj.Job : { name: "Job", controls: {} },
					verifyUser: item.verified ? true : false,
					id: item.id
				};
				setuserDetails(details);
			} else {
				setuserDetails({
					...VerifyValues,
					Products: { name: "Products", controls: {} },
					User: { name: "User", controls: {} },
					PurchaseOrders: { name: "PurchaseOrders", controls: {} },
					Company: { name: "Company", controls: {} },
					Ledger: { name: "Ledger", controls: {} },
					Inventory: { name: "Inventory", controls: [] },
					Customers: { name: "Customers", controls: {} },
					Job: { name: "Job", controls: {} }
				});
			}
			setMenu(!menu);
		}
	};

	const getAllUser = async () => {
		setLoader(true);
		if (!users.isLoading || fetchagain) {
			let list: any = [];
			let index1 = 0;
			let datamodule: any = await users.data;
			setTotalCount(datamodule?.count);
			setUserlist(datamodule?.data);
			let listUser: any = [];
			datamodule?.data?.forEach((item: any, index: number) => {
				let currentDate = new Date();
				let yesterday = new Date(currentDate.getTime());
				yesterday.setDate(currentDate.getDate() - 1);
				listUser.push([
					<div className={flex}>
						{item.email}
						{!item.verified && yesterday < new Date(item.createdAt) && <span className={newDiv}>New</span>}
					</div>,
					item.role.charAt(0).toUpperCase() + item.role.slice(1),
					item.company ? item.company?.name.charAt(0).toUpperCase() + item.company.name.slice(1) : "_",
					item.company ? (
						<div className={subCompanyDiv}>
							{item.company.sub_company.map((item1: any, index1: number) => (
								<span key={index1}>{item1.name}</span>
							))}
						</div>
					) : (
						"_"
					)
				]);
				index1 = index1 + 1;
				let data: any = [
					rowsPerPage * page + index1 - rowsPerPage,
					item.name,
					<div className={flex}>
						{item.email}
						{!item.verified && yesterday < new Date(item.createdAt) && <span className={newDiv}>New</span>}
					</div>,
					item.role.charAt(0).toUpperCase() + item.role.slice(1),
					item.company ? item.company?.name.charAt(0).toUpperCase() + item.company.name.slice(1) : "_",
					<div className={summaryCompanyDiv}>
						{item.company ? (
							<AccordionRowComponent
								title={
									<div className={flexSummary}>
										{item.company.sub_company?.map(
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
								index={item.company.sub_company?.length}
								maxIndex={2}
								summary={
									<div className={flexSummary}>
										{item.company.sub_company.map((item1: any, index1: any) => {
											if (index1 > 0) {
												return (
													<span className={detailsMultiView}>
														{item1.name.charAt(0).toUpperCase() + item1.name.slice(1)}
														{index1 < item.company.sub_company.length - 1 ? "," : ""}
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
						<Edit className={editIcon} onClick={() => onClick(item, "open", item.id)} />
					</div>
				];
				list.push(data);
			});
			setTableDataSelect(listUser);
			setTableData(list);
			setFetchAgain(false);
			setLoader(false);
		}
	};

	const getCompanyList = async () => {
		if (!companies.isLoading) {
			let company: any = [];
			let datacompany: any = await companies.data.data;
			datacompany?.forEach((item: any) => {
				company.push(item.name);
			});
			setCompanyList(company);
		}
	};

	return {
		companyList,
		getCompanyList,
		userDetails,
		getAllUser,
		onClick,
		tableData,
		rowsPerPage,
		totalCount,
		handleChangePage,
		handleChangeRowsPerPage,
		page,
		fetchagain,
		menu,
		loader,
		userList,
		handleOnUserClick,
		tableDataSelect
	};
}
