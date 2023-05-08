import {
	InvoiceValues,
	poEntriesValues,
	verifyPoValues,
	purchaseOrderValues
} from "@component/utils/form/initial-values";
import { approvePurchaseOredr, entry, invoice, purchaseOrder } from "@api/network";
import { baseUrlPurchaseOrder } from "@api/base-url";
import { useMutation } from "react-query";
import axios from "axios";
import { AddOutlined, DeleteOutline, DoneOutline, DownloadOutlined, Edit, InfoOutlined } from "@mui/icons-material";
import {
	detailsViewBut,
	editBut,
	editIcon,
	flexInovioceIcon,
	flexIcon,
	editFinishBut,
	editInvoiceBut,
	countLine
} from "css/styles";
import { useState } from "react";
import { FailureAlert, LoadingAlert, SuccessAlert } from "@common/toastify";
import { getRecentPoDetails } from "@api/get-api";
import useConstant from "@component/utils/form/constant";
import Swal from "sweetalert2";
import { getProduct, getPurchaseOrders, getRate } from "@api/get-api-queries";
import { useRouter } from "next/router";
import { poEntriesDetails } from "@component/utils/routes";

export default function usePurchaseOrder(setStep: any) {
	const [IsOpen, setIsOpen] = useState(false);
	const [IsDetails, setIsDetails] = useState(false);
	const { products } = getProduct();
	const { purchaseOrderds } = getPurchaseOrders();
	const { rates } = getRate();
	const [loader, setLoader] = useState(false);
	const [productslist, setProductsList] = useState([]);
	const [Selectedproductslist, setSelectedproductslist] = useState([]);
	const [poEntriesValue, setPoEntriesValues] = useState(poEntriesValues);
	const [verifyValue, setVerifyValue] = useState(verifyPoValues);
	const [fetchagain, setFetchAgain] = useState(false);
	const [perChasevalue, setPurchaseValue] = useState<any>(purchaseOrderValues);
	const { CoatingColums } = useConstant();
	const [productmenu, setProductmenu] = useState(false);
	const columns = CoatingColums;
	const [tableData, setTableData] = useState();
	const [readyForCoatingTableData, setReadyForCoatingTableData] = useState([]);
	const [CoatingInProgressTableData, setCoatingInProgressTableData] = useState([]);
	const [CoatingInDoneTableData, setCoatingInDoneTableData] = useState([]);
	const [InTransitTableData, setInTransitTableData] = useState([]);
	const [DispatchReadyTableData, setDispatchReadyTableData] = useState([]);
	const [finishTableData, setFinishTableData] = useState([]);
	const [isOpenCustomer, setIsOpenCustomer] = useState(false);
	const [customerObj, setCustomerObj] = useState({});
	const [isOpenProduct, setIsOpenProduct] = useState(false);
	const [productObjList, setProductObjList] = useState([]);
	const [tableDataSelectPurcahse, setTableSelectData] = useState();
	const [InvoiceValue, setInvoiceValue] = useState<any>(InvoiceValues);
	const [menuCustomer, setMenuCustomer] = useState(false);
	const [productDetailsList, setProductDetailsList] = useState([]);
	const [tableDataProductSelect, setTableDataProductSelect] = useState([]);
	const [productRatelist, setProductRatelist] = useState([]);
	const [productPurchaseOrderlist, setProductPurchaseOrderlist] = useState([]);
	const [productPoList, setProductPoList] = useState([]);
	const [productPODetails, setProductPODetails] = useState({});
	const { push } = useRouter();

	const handlePoEnteryView = (item: any, subPath: any) => {
		let path: any = {
			pathname: `${poEntriesDetails}`,
			query: { subPath: subPath, id: item.id }
		};
		push(path);
	};

	const handleProductView = (item: any, type: any) => {
		if (type === "view" || type === "model") {
			setIsOpenProduct(!isOpenProduct);
		}
		let list: any = [];
		if (item) {
			item.map((item1: any) => {
				let obj: any = [
					item1.rate.rate,
					item1.rate.variant.sectionName.charAt(0).toUpperCase() + item1.rate.variant.sectionName.slice(1),
					item1.rate.variant.sectionNumber,
					item1.rate.variant.height,
					item1.rate.variant.width,
					item1.rate.variant.weight,
					item1.rate.variant.thickness,
					item1.rate.variant.outerDiameter,
					`${item1.rate.dimension.height} feet`
				];
				list.push(obj);
			});
			setProductObjList(list);
		}
	};

	const mutationProduct = useMutation(
		(createPorductUom: any) => {
			LoadingAlert();
			return axios.post(baseUrlPurchaseOrder + entry, createPorductUom);
		},
		{
			onSuccess: (data) => {
				Swal.close();
				SuccessAlert("Products Added SuccessFully!");
				products.refetch();
				setFetchAgain(true);
				setProductmenu(!productmenu);
				perChasevalue["products"].push(data.data);
				handleTableData(perChasevalue, "add");
			},
			onError: (error) => {
				let errorMsg: any = error;
				FailureAlert(errorMsg.response.data.message);
			}
		}
	);

	const ProductClick = async (values: any, type: string, id: string) => {
		setProductmenu(!productmenu);
		if (type == "close") {
			let valueData: any = {
				...values,
				["quantity"]: values.quantity,
				["length"]: values.quantity,
				colorId: values.colorId.id,
				["rateId"]: values.rateId.id,
				["poId"]: values.poId ? values.poId.id : ""
			};
			setLoader(true);
			mutationProduct.mutate(valueData);
		}
	};

	const mutationInvoice = useMutation(
		(createCompany: any) => {
			LoadingAlert();
			return axios(baseUrlPurchaseOrder + invoice, {
				method: "POST",
				data: createCompany
			});
		},
		{
			onSuccess: async (temp) => {
				Swal.close();
				if (menuCustomer) {
					SuccessAlert("Generated SuccessFully");
					setMenuCustomer(!menuCustomer);
				} else {
					SuccessAlert("Downloaded SuccessFully");
				}
				purchaseOrderds.refetch();
				setFetchAgain(true);
				window.open(temp.data.link);
			},
			onError: (error) => {
				Swal.close();
				let errorMsg: any = error;
				FailureAlert(errorMsg.response.data.message);
			}
		}
	);

	const InvoiceClick = async (values: any, type: string, id: string) => {
		if (type === "customer") {
			setMenuCustomer(!menuCustomer);
		} else if (type === "download") {
			if (values.invoice) {
				mutationInvoice.mutate({
					["associated_poId"]: values.id
				});
			}
		} else {
			if (type == "close") {
				mutationInvoice.mutate({
					...values,
					["associated_poId"]: values.associated_poId.id,
					["cost_per_kg"]: values.cost_per_kg
				});
			} else {
				let poDetails: any;
				if (type !== "model") {
					poDetails = await getRecentPoDetails(values.customerId);
				}
				setInvoiceValue({
					...InvoiceValues,
					["associated_poId"]: { name: values, id: values.id },
					["cost_per_kg"]: poDetails?.cost_per_kg ? poDetails?.cost_per_kg : values.invoice?.cost_per_kg,
					["coating_discount"]: values.invoice?.coating_discount,
					["tax"]: values.invoice?.tax
				});
				setMenuCustomer(!menuCustomer);
			}
		}
	};

	const handleCustomerView = (item: any) => {
		setIsOpenCustomer(!isOpenCustomer);
		let list: any = [];
		if (item) {
			let obj = [item.name, item.email, item.phone, item.credit_status];
			list.push(obj);
			setCustomerObj(list);
		}
	};

	const handleDelete = (id: any, values: any) => {
		setProductDetailsList(perChasevalue.products.filter((item: any) => item.id !== id));
		setTableDataProductSelect(tableDataProductSelect.filter((item: any) => item[7] !== id));
		setPurchaseValue({
			...perChasevalue,
			["products"]: perChasevalue.products.filter((item: any) => item.id !== id)
		});
	};

	const handleTableData = (values: any, type: any) => {
		if (!perChasevalue.products) {
			perChasevalue["products"] = values.products;
		}
		let list: any = [];
		perChasevalue.products?.map((item: any) => {
			let data = [
				item.rate.product ? (
					<span className={detailsViewBut} onClick={() => handleView(item.rate)}>
						{item.rate.product.name}
					</span>
				) : (
					"_"
				),
				item.rate.coating_type
					? `${item.rate.coating_type.type.charAt(0).toUpperCase() + item.rate.coating_type.type.slice(1)} #${
							item.rate.coating_type.code
					  } `
					: "_",
				item.rate.rate,
				item.length,
				item.quantity,
				`${item.color.color.charAt(0).toUpperCase() + item.color.color.slice(1)} #${item.color.code} `,
				`${item.weight} ${item.weightUom != null ? item.weightUom.type : ""}`,
				<span className={editBut} onClick={() => handleDelete(item.id, perChasevalue)}>
					Delete <DeleteOutline className={editIcon} />
				</span>,
				item.id
			];
			list.push(data);
		});
		if (type !== "add") {
			setProductDetailsList(perChasevalue.products);
		}
		setPurchaseValue(values);
		setTableDataProductSelect(list);
	};
	const handleValue = (values: any) => {
		setPoEntriesValues(values);
	};
	const handleOnClick = (currentRowsSelected: any, allRowsSelected: any, setFieldValue: any) => {
		setFieldValue(["rateId"], productRatelist[allRowsSelected.rowIndex].name);
	};

	const handleOnClickPurchase = (currentRowsSelected: any, allRowsSelected: any, setFieldValue: any) => {
		setFieldValue(["poId"], productPurchaseOrderlist[allRowsSelected.rowIndex].name);
	};

	const getAllList = async () => {
		if (!rates.isLoading) {
			let ratelist: any = [];
			let datarate: any = await rates.data;
			datarate?.forEach((item: any) => {
				let obj = { name: item, id: item.id };
				ratelist.push(obj);
			});
			setProductRatelist(ratelist);
		}
		if (!purchaseOrderds.isLoading) {
			let purchaselist: any = [];
			let datarate: any = await purchaseOrderds.data;
			datarate?.forEach((item: any) => {
				let obj = { name: item, id: item.id };
				purchaselist.push(obj);
			});
			setProductPurchaseOrderlist(purchaselist);
		}
	};

	const mutationProductApproveEdit = useMutation(
		(createPorductVariant: any) => {
			LoadingAlert();
			let data1 = axios.patch(
				baseUrlPurchaseOrder + `${approvePurchaseOredr}/${createPorductVariant.id}`,
				createPorductVariant.value
			);
			return data1;
		},
		{
			onSuccess: () => {
				Swal.close();
				SuccessAlert("Saved Changes SuccessFully!");
				purchaseOrderds.refetch();
				setFetchAgain(true);
				setIsDetails(!IsDetails);
			},
			onError: (error) => {
				Swal.close();
				let errorMsg: any = error;
				FailureAlert(errorMsg.response.data.message);
				setLoader(false);
			}
		}
	);

	const handleProductApprove = (values: any) => {
		let status: any = [];
		if (values.status) {
			if (values.status.id === "initiated") {
				status = "coating_initiated";
			} else if (values.status.id === "coating_initiated") {
				status = "coating_processing";
			} else if (values.status.id === "coating_processing") {
				status = "coating_finished";
			} else {
				status = values.status.id;
			}
		} else {
			status = values.status.id;
		}
		let obj = {
			id: perChasevalue.id,
			value: {
				["status"]: status,
				["gross_weight"]: values.gross_weight ? values.gross_weight : null,
				["net_weight"]: values.net_weight ? values.net_weight : null
			}
		};
		mutationProductApproveEdit.mutate(obj);
	};

	const handleView = (item: any) => {
		if (!item) {
			setIsDetails(!IsDetails);
		} else {
			let statusStr: string = "";
			item.status
				.replace("_", " ")
				.split(" ")
				.map((item: any) => {
					statusStr = statusStr + item.charAt(0).toUpperCase() + item.slice(1);
					statusStr = statusStr + " ";
				});

			let statusObj: any = { name: statusStr.trim(), id: item.status };
			setVerifyValue({
				["status"]: statusObj,
				["gross_weight"]: item.gross_weight ? item.gross_weight : "",
				["net_weight"]: item.net_weight ? item.net_weight : ""
			});
			setPurchaseValue(item);
			setIsDetails(!IsDetails);
			handleProductView(item.products, "Move");
		}
	};

	const mutation = useMutation(
		(createPorductUom: any) => {
			LoadingAlert();
			return axios.post(baseUrlPurchaseOrder + purchaseOrder, createPorductUom);
		},
		{
			onSuccess: () => {
				Swal.close();
				SuccessAlert("Purchase Order Added SuccessFully!");
				purchaseOrderds.refetch();
				setFetchAgain(true);
				setSelectedproductslist([]);
				setIsOpen(!IsOpen);
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
		(createPorductVariant: any) => {
			LoadingAlert();
			let data1 = axios.patch(
				baseUrlPurchaseOrder + `${purchaseOrder}/${createPorductVariant.id}`,
				createPorductVariant.name
			);
			return data1;
		},
		{
			onSuccess: () => {
				Swal.close();
				SuccessAlert("Saved Changes SuccessFully!");
				purchaseOrderds.refetch();
				setSelectedproductslist([]);
				setFetchAgain(true);
				setIsOpen(!IsOpen);
			},
			onError: (error) => {
				Swal.close();
				let errorMsg: any = error;
				FailureAlert(errorMsg.response.data.message);
				setLoader(false);
			}
		}
	);

	const onClick = async (values: any, type: string, id: string) => {
		if (type === "model") {
			setIsOpen(!IsOpen);
			setStep(0);
		}
		if (type === "close") {
			let list: any = [];
			if (values.products.length > 0) {
				values.products.map((item: any) => {
					list.push(item.id);
				});
			}
			let formDetails: any;
			if (values.customer_id.id) {
				formDetails = {
					["po_entries"]: list,
					["has_raw_material"]: values.has_raw_material === "Yes" ? true : false,
					["customer_id"]: values.customer_id.id,
					["delivery_pointId"]: values.delivery_pointId?.id,
					["origin_pointId"]: values.origin_pointId?.id
				};
			} else {
				formDetails = {
					["po_entries"]: list,
					["has_raw_material"]: values.has_raw_material === "Yes" ? true : false,
					["customer_name"]: values.customer_id.name,
					["customer_phone"]: values.customer_id.phone,
					["credit_status"]: values.customer_id.credit_status,
					["customer_email"]: values.customer_id.email,
					["delivery_pointId"]: values.delivery_pointId?.id,
					["origin_pointId"]: values.origin_pointId?.id
				};
			}
			if (!id) {
				setLoader(true);
				mutation.mutate(formDetails);
			} else {
				setLoader(true);
				let valuedata: any = { name: { ...formDetails, ["status"]: values.status.id }, id: id };
				mutationEdit.mutate(valuedata);
			}
		} else {
			if (id) {
				let formDetails: any = {
					order_number: values.order_number,
					customer_id: values.customer_info,
					has_raw_material: { name: values.has_raw_material },
					tax: values.tax,
					products: values.po_entries,
					delivery_pointId: { name: values.delivery_point.contact_name, id: values.delivery_point.id },
					origin_pointId: { name: values.origin_point.contact_name, id: values.origin_point.id },
					id: values.id
				};
				setPurchaseValue(formDetails);
			} else {
				setPurchaseValue(purchaseOrderValues);
			}
			setIsOpen(!IsOpen);
		}
	};

	const handleDownload = (item: any, type: any) => {
		if (item.invoice) {
			InvoiceClick(item, type, "");
		}
	};

	const getAllPurchaseList = async () => {
		setLoader(true);
		if (!purchaseOrderds.isLoading || fetchagain) {
			let list: any = [];
			let coatingReady: any = [];
			let coatingInprogress: any = [];
			let coatingDone: any = [];
			let transits: any = [];
			let finsihList: any = [];
			let readyDispatch: any = [];
			let index1 = 0;
			let index2 = 0;
			let index3 = 0;
			let index4 = 0;
			let index5 = 0;
			let index6 = 0;
			let index7 = 0;
			let selectList: any = [];
			let polist: any = [];
			let dataorder: any = await purchaseOrderds.data;
			const moduleData = JSON.parse(localStorage.getItem("userdata"));
			let objModulesData: any = { controls: [] };
			if (moduleData) {
				if (moduleData.user.role !== "Admin" && moduleData.user.role !== "SuperAdmin") {
					moduleData.user.modules.map((moduleValue: any) => {
						if (moduleValue.name === "PurchaseOrders") {
							objModulesData = moduleValue;
						}
					});
				} else {
					objModulesData = { controls: ["Read", "Edit", "Delete"] };
				}
			}
			dataorder?.forEach((item: any, index: any) => {
				let obj = { name: item, id: item.id };
				polist.push(obj);
				setProductPoList(polist);
				if (item.status === "initiated") {
					index1 = index1 + 1;
					let data1 = [
						index1,
						<b className={detailsViewBut} onClick={() => handleCustomerView(item.customer_info)}>
							{item.customer_info.name}
						</b>,
						<b className={detailsViewBut} onClick={() => handlePoEnteryView(item, "initiated")}>
							Po Entries
						</b>,
						<b className={detailsViewBut} onClick={() => handleCustomerView(item.po_entries)}>
							Delivery Points
						</b>,
						<b className={detailsViewBut} onClick={() => handleCustomerView(item.po_entries)}>
							Origin Points
						</b>,
						item.gross_weight ? item.gross_weight : "_",
						<div className={flexIcon}>
							<span className={editBut} onClick={() => handleView(item)}>
								Move <InfoOutlined className={editIcon} />
							</span>
							<Edit className={editIcon} onClick={() => onClick(item, "open", item.id)} />
						</div>
					];
					list.push(data1);
				} else if (item.status === "coating_initiated") {
					index2 = index2 + 1;
					let data2 = [
						index2,
						<b className={detailsViewBut} onClick={() => handleCustomerView(item.customer_info)}>
							{item.customer_info.name}
						</b>,
						<b className={detailsViewBut} onClick={() => handlePoEnteryView(item, "coating-initiated")}>
							Po Entries
						</b>,
						<b className={detailsViewBut} onClick={() => handleCustomerView(item.po_entries)}>
							Delivery Points
						</b>,
						<b className={detailsViewBut} onClick={() => handleCustomerView(item.po_entries)}>
							Origin Points
						</b>,
						item.gross_weight ? item.gross_weight : "_",
						<div className={flexIcon}>
							<span className={editBut} onClick={() => handleView(item)}>
								Move <InfoOutlined className={editIcon} />
							</span>
						</div>
					];
					coatingReady.push(data2);
				} else if (item.status === "coating_processing") {
					index3 = index3 + 1;
					let data3 = [
						index3,
						<b className={detailsViewBut} onClick={() => handleCustomerView(item.customer_info)}>
							{item.customer_info.name}
						</b>,
						<b className={detailsViewBut} onClick={() => handlePoEnteryView(item, "coating-processing")}>
							Po Entries
						</b>,
						<b className={detailsViewBut} onClick={() => handleCustomerView(item.po_entries)}>
							Delivery Points
						</b>,
						<b className={detailsViewBut} onClick={() => handleCustomerView(item.po_entries)}>
							Origin Points
						</b>,
						item.gross_weight ? item.gross_weight : "_",
						item.net_weight ? item.net_weight : "_",
						<div className={flexIcon}>
							<span className={editBut} onClick={() => handleView(item)}>
								Move <InfoOutlined className={editIcon} />
							</span>
						</div>
					];
					coatingInprogress.push(data3);
				} else if (item.status === "coating_finished") {
					index4 = index4 + 1;
					let data4 = [
						index4,
						<b className={detailsViewBut} onClick={() => handleCustomerView(item.customer_info)}>
							{item.customer_info.name}
						</b>,
						<b className={detailsViewBut} onClick={() => handlePoEnteryView(item, "coating-finished")}>
							Po Entries
						</b>,
						<b className={detailsViewBut} onClick={() => handleCustomerView(item.po_entries)}>
							Delivery Points
						</b>,
						<b className={detailsViewBut} onClick={() => handleCustomerView(item.po_entries)}>
							Origin Points
						</b>,
						item.gross_weight ? item.gross_weight : "_",
						item.net_weight ? item.net_weight : "_",
						<div className={flexIcon}>
							<span className={editBut} onClick={() => handleView(item)}>
								Move <InfoOutlined className={editIcon} />
							</span>
						</div>
					];
					coatingDone.push(data4);
				} else if (item.status === "in_transit") {
					index5 = index5 + 1;
					let data5 = [
						index5,
						<b className={detailsViewBut} onClick={() => handleCustomerView(item.customer_info)}>
							{item.customer_info.name}
						</b>,
						<b className={detailsViewBut} onClick={() => handlePoEnteryView(item, "in-transit")}>
							Po Entries
						</b>,
						<b className={detailsViewBut} onClick={() => handleCustomerView(item.po_entries)}>
							Delivery Points
						</b>,
						<b className={detailsViewBut} onClick={() => handleCustomerView(item.po_entries)}>
							Origin Points
						</b>,
						item.gross_weight ? item.gross_weight : "_",
						item.net_weight ? item.net_weight : "_",
						<div className={flexIcon}>
							<span className={editBut} onClick={() => handleView(item)}>
								Move <InfoOutlined className={editIcon} />
							</span>
						</div>
					];
					transits.push(data5);
				} else if (item.status === "ready_for_dispatch") {
					index6 = index6 + 1;
					let data6 = [
						index6,
						<b className={detailsViewBut} onClick={() => handleCustomerView(item.customer_info)}>
							{item.customer_info.name}
						</b>,
						<b className={detailsViewBut} onClick={() => handlePoEnteryView(item, "ready-for-dispatch")}>
							Po Entries
						</b>,
						<b className={detailsViewBut} onClick={() => handleCustomerView(item.po_entries)}>
							Delivery Points
						</b>,
						<b className={detailsViewBut} onClick={() => handleCustomerView(item.po_entries)}>
							Origin Points
						</b>,
						item.gross_weight ? item.gross_weight : "_",
						item.net_weight ? item.net_weight : "_",
						<div className={flexIcon}>
							<span className={editBut} onClick={() => handleView(item)}>
								Move <InfoOutlined className={editIcon} />
							</span>
						</div>
					];
					readyDispatch.push(data6);
				} else {
					index7 = index7 + 1;
					let data7 = [
						index7,
						<b className={detailsViewBut} onClick={() => handleCustomerView(item.customer_info)}>
							{item.customer_info.name}
						</b>,
						<b className={detailsViewBut} onClick={() => handlePoEnteryView(item, "finished")}>
							Po Entries
						</b>,
						<b className={detailsViewBut} onClick={() => handleCustomerView(item.po_entries)}>
							Delivery Points
						</b>,
						<b className={detailsViewBut} onClick={() => handleCustomerView(item.po_entries)}>
							Origin Points
						</b>,
						item.gross_weight ? item.gross_weight : "_",
						item.net_weight ? item.net_weight : "_",
						<div className={flexInovioceIcon}>
							<span className={editInvoiceBut}>
								<AddOutlined className={editIcon} onClick={() => handleDownload(item, "open")} />
							</span>
							<span className={editInvoiceBut}>
								<DownloadOutlined
									className={editIcon}
									onClick={() => handleDownload(item, "download")}
								/>
							</span>
						</div>,
						<div className={flexIcon}>
							<span className={editFinishBut}>
								Finish
								<DoneOutline className={editIcon} />
							</span>
						</div>
					];
					finsihList.push(data7);
				}
				selectList.push([
					item.order_number,
					item.has_raw_material ? "Yes" : "No",
					item.issued_date
						? `${String(new Date(item.issued_date)).slice(3, 10)},${String(
								new Date(item.issued_date)
						  ).slice(10, 16)}`
						: "_",
					item.status,
					item.po_entries ? (
						<b className={detailsViewBut}>
							Count
							<span className={countLine}></span> {item.po_entries.length}
						</b>
					) : (
						"_"
					)
				]);
			});
			setTableSelectData(selectList);
			setTableData(list);
			setInTransitTableData(transits);
			setFinishTableData(finsihList);
			setCoatingInDoneTableData(coatingDone);
			setDispatchReadyTableData(readyDispatch);
			setReadyForCoatingTableData(coatingReady);
			setCoatingInProgressTableData(coatingInprogress);
			setLoader(false);
			setFetchAgain(false);
		}
	};
	const getAllProduct = async () => {
		if (!products.isLoading) {
			let list: any = [];
			let dataproduct: any = await products.data;
			dataproduct?.forEach((item: any) => {
				let obj = { name: item, id: item.id };
				list.push(obj);
			});
			setProductsList(list);
		}
	};
	const handleOnInvoceClick = (currentRowsSelected: any, allRowsSelected: any, setFieldValue: any) => {
		setProductPODetails(productPoList[allRowsSelected.rowIndex].name);
		setFieldValue(["associated_poId"], {
			name: productPoList[allRowsSelected.rowIndex].name,
			id: productPoList[allRowsSelected.rowIndex].id
		});
	};

	return {
		perChasevalue,
		getAllPurchaseList,
		onClick,
		tableData,
		columns,
		fetchagain,
		setPurchaseValue,
		products,
		IsDetails,
		IsOpen,
		getAllProduct,
		handleDelete,
		productslist,
		poEntriesValue,
		loader,
		handleValue,
		Selectedproductslist,
		handleView,
		finishTableData,
		handleProductApprove,
		readyForCoatingTableData,
		productmenu,
		productPurchaseOrderlist,
		isOpenCustomer,
		handleCustomerView,
		CoatingInDoneTableData,
		customerObj,
		isOpenProduct,
		handleProductView,
		productObjList,
		InvoiceClick,
		productDetailsList,
		menuCustomer,
		InvoiceValue,
		handleTableData,
		tableDataSelectPurcahse,
		tableDataProductSelect,
		ProductClick,
		handleOnClick,
		productRatelist,
		getAllList,
		productPoList,
		handleOnClickPurchase,
		handleOnInvoceClick,
		InTransitTableData,
		CoatingInProgressTableData,
		DispatchReadyTableData,
		productPODetails,
		verifyValue
	};
}
