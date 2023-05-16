import { useState } from "react";
import { baseUrl } from "@api/base-url";
import { handleuser } from "@api/network";
import { subCompanyDiv, gpGood, gpBad, editIcon, flex, newDiv, flexSummary, detailsMultiView } from "@css/styles";
import { VerifyValues } from "@component/utils/form/initial-values";
import axios from "axios";
import { useMutation } from "react-query";
import { Edit, ExpandMore } from "@mui/icons-material";
import { FailureAlert, LoadingAlert, SuccessAlert } from "@common/toastify";
import { array } from "@component/utils/form/constant";
import Swal from "sweetalert2";
import { getCompany, getUsers } from "@api/get-api-queries";
import { Accordion, AccordionDetails, AccordionSummary, Typography } from "@mui/material";
import AccordionRowComponent from "@common/accordinon/accordion-row";

export default function useVerification() {
	const { companies } = getCompany();
	const [companyList, setCompanyList] = useState([]);
	const [menu, setMenu] = useState(false);
	const [loader, setLoader] = useState(false);
	const { users } = getUsers();
	const [userDetails, setuserDetails] = useState<any>(VerifyValues);
	const [fetchagain, setFetchAgain] = useState(false);
	const [tableData, setTableData] = useState();
	const [userList, setUserlist] = useState([]);
	const [tableDataSelect, setTableDataSelect] = useState([]);
	const [expanded, setExpanded] = useState(false);

	const handleExpand = () => {
		setExpanded(!expanded);
	};

	const handleOnUserClick = (currentRowsSelected: any, allRowsSelected: any, setFieldValue: any) => {
		setFieldValue(["userId"], userList[allRowsSelected.rowIndex]);
	};

	const mutation = useMutation(
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

			const data1: any = {
				email: item.email,
				role: item.role,
				companyName: item.companyName,
				moduleAccess: list,
				verifyUser: item.verifyUser ? true : false
			};
			setLoader(true);
			mutation.mutate(data1);
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
					companyName: item.company ? item.company.name : "",
					verifyUser: item.verified ? true : false
				};
				setuserDetails(details);
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
			setUserlist(datamodule);
			let listUser: any = [];
			datamodule?.forEach((item: any, index: number) => {
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
					),
					<span>
						{item.verified ? (
							<div className={gpGood}>
								<b>Verified</b>
							</div>
						) : (
							<div className={gpBad}>
								<b>Not Verified</b>
							</div>
						)}
					</span>
				]);
				if (item.role !== "Admin" && item.role !== "SuperAdmin") {
					index1 = index1 + 1;
					let data: any = [
						index1,
						<div className={flex}>
							{item.email}
							{!item.verified && yesterday < new Date(item.createdAt) && (
								<span className={newDiv}>New</span>
							)}
						</div>,
						item.role.charAt(0).toUpperCase() + item.role.slice(1),
						item.company ? item.company?.name.charAt(0).toUpperCase() + item.company.name.slice(1) : "_",
						item.company ? (
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
						),
						<span>
							{item.verified ? (
								<div className={gpGood}>
									<b>Verified</b>
								</div>
							) : (
								<div className={gpBad}>
									<b>Not Verified</b>
								</div>
							)}
						</span>,
						<div className={flex}>
							<Edit className={editIcon} onClick={() => onClick(item, "open", item.id)} />
						</div>
					];
					list.push(data);
				}
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
			let datacompany: any = await companies.data;
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
		// columns,
		fetchagain,
		menu,
		loader,
		userList,
		handleOnUserClick,
		tableDataSelect
	};
}
