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
import { DeleteOutline } from "@mui/icons-material";
import {
	detailsViewBut,
	editBut,
	editIcon,
	countLine,
	detailsPointViewBut,
	detailsStatusBut,
	customerViewBut,
	originDiv,
	deliveryDiv
} from "css/styles";
import { useState } from "react";
import { FailureAlert, LoadingAlert, SuccessAlert } from "@common/toastify";
import { getRecentPoDetails } from "@api/get-api";
import {
	CoatingColums,
	branchViewColums,
	customerViewColums,
	generateInvoiceColumns,
	yourPurchaseOrderInnerHead,
	purchaseOrderColums,
	rateColumsView,
	statusTabs
} from "@component/utils/form/constant";
import Swal from "sweetalert2";
import { getProduct, getProductRate, getProductWithRate, getPurchaseOrders } from "@api/get-api-queries";
import { useRouter } from "next/router";
import { poEntriesDetails } from "@component/utils/routes";
import PurcharseOrderTableAction from "./purchase-order-table-action";

export default function usePurchaseOrder() {
	const [IsOpen, setIsOpen] = useState(false);
	const [page, setPage] = useState(1);
	const [totalCount, setTotalCount] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(5);
	const handleChangePage = (event: any, newPage: any) => {
		setPage(newPage);
	};
	const handleChangeRowsPerPage = (event: any) => {
		setRowsPerPage(event.target.value);
	};
	const [IsDetails, setIsDetails] = useState(false);
	const { products } = getProduct("", "");
	const [status, setStatus] = useState("");
	const { purchaseOrderds } = getPurchaseOrders(page, rowsPerPage, status);
	const { productsRate } = getProductRate();
	const [loader, setLoader] = useState(false);
	const [productslist, setProductsList] = useState([]);
	const [Selectedproductslist, setSelectedproductslist] = useState([]);
	const [poEntriesValue, setPoEntriesValues] = useState(poEntriesValues);
	const [verifyValue, setVerifyValue] = useState(verifyPoValues);
	const [fetchagain, setFetchAgain] = useState(false);
	const [perChasevalue, setPurchaseValue] = useState<any>(purchaseOrderValues);
	const [productmenu, setProductmenu] = useState(false);
	const [columns, setColumns] = useState(purchaseOrderColums);
	const [tableData, setTableData] = useState([]);
	const [isOpenCustomer, setIsOpenCustomer] = useState(false);
	const [customerObj, setCustomerObj] = useState({});
	const [isOpenProduct, setIsOpenProduct] = useState(false);
	const [productObjList, setProductObjList] = useState([]);
	const [tableDataSelectPurcahse, setTableSelectData] = useState([]);
	const [InvoiceValue, setInvoiceValue] = useState<any>(InvoiceValues);
	const [menuCustomer, setMenuCustomer] = useState(false);
	const [productDetailsList, setProductDetailsList] = useState([]);
	const [tableDataProductSelect, setTableDataProductSelect] = useState([]);
	const [productRatelist, setProductRatelist] = useState([]);
	const [productPurchaseOrderlist, setProductPurchaseOrderlist] = useState([]);
	const [productPoList, setProductPoList] = useState([]);
	const [productPODetails, setProductPODetails] = useState({});
	const [poDetails, setPoDetails] = useState([]);
	const { push } = useRouter();
	const [headTitle, setHeadTitle] = useState("");
	const { productsWithRate } = getProductWithRate();
	const [productWithRateData, setProductWithRateData] = useState<any>([]);
	const [openGenerateInvoice, setOpenGenerateInvoice] = useState<boolean>(false);
	const [invoiceDetails, setInvoiceDetails] = useState<any>([]);
	const [allRateList, setAllRateList] = useState([]);
	const [ListTitle, setListTitle] = useState("All Purchase Order List");
	const [value, setValue] = useState(0);
	var poEntries: any = [];

	const handleTabChange = (event: any, newValue: number) => {
		setPage(1);
		setRowsPerPage(5);
		setValue(newValue);
		if (newValue === 0) {
			setStatus("");
			setColumns(purchaseOrderColums);
			setListTitle("All Purchase Order List");
		} else {
			setColumns(CoatingColums);
			// setTableData(listData);
			if (newValue === 1) {
				setStatus("initiated");
				setListTitle("Initiated Purchase Order List");
			} else if (newValue === 2) {
				setStatus("coating_initiated");
				setListTitle("Coating Initiated Purchase Order List");
			} else if (newValue === 3) {
				setStatus("coating_processing");
				setListTitle("Processing Purchase Order List");
			} else if (newValue === 4) {
				setStatus("ready_for_dispatch");
				setListTitle("Ready For Dispatch Purchase Order List");
			}
		}
	};

	const handleDetailsView = (item: any) => {
		setPoDetails([]);
		if (item !== "close") {
			let branchData: any = [];
			setHeadTitle(item.customer_info?.name);
			let customerdata: any = [[item.customer_info?.name, item.customer_info?.email, item.customer_info?.phone]];
			let productData: any = [];
			let productInnerData: any = [];
			item.po_entries?.map((item1: any) => {
				productData.push([
					item1.rate ? <span className={detailsViewBut}>{item1.rate?.product?.name}</span> : "_",
					`${item1.rate?.coating_type?.type} ${item1.rate?.coating_type?.code}`,
					`${item1.color?.color} ${item1.color?.code}`,
					item1.rate?.rate,
					item1.length
				]);
				productInnerData.push([
					item1.rate?.product?.name,
					item1.rate?.product?.height,
					item1.rate?.product?.width,
					item1.rate?.product?.weight,
					item1.rate?.product?.thickness,
					item1.rate?.product?.length
				]);
			});
			branchData?.push([
				<span className={deliveryDiv}>Delivery</span>,
				item.delivery_point?.contact_name ? item.delivery_point?.contact_name : "_",
				item.delivery_point?.type ? item.delivery_point?.type : "_",
				item.delivery_point?.phone ? item.delivery_point?.phone : "_",
				item.delivery_point?.contact_phone ? item.delivery_point?.contact_phone : "_",
				item.delivery_point?.address ? item.delivery_point?.address : "_"
			]);
			branchData?.push([
				<span className={originDiv}>Origin</span>,
				item.origin_point?.contact_name ? item.origin_point?.contact_name : "_",
				item.origin_point?.type ? item.origin_point?.type : "_",
				item.origin_point?.phone ? item.origin_point?.phone : "_",
				item.origin_point?.contact_phone ? item.origin_point?.contact_phone : "_",
				item.origin_point?.address ? item.origin_point?.address : "_"
			]);
			setPoDetails([
				...poDetails,
				{ title: "Customer Details", columns: customerViewColums, data: customerdata },
				{
					title: "Products",
					columns: rateColumsView,
					innerColumns: yourPurchaseOrderInnerHead,
					data: productData,
					innerData: productInnerData
				},
				{ title: "Branch", columns: branchViewColums, data: branchData }
			]);
		}
		setIsOpenCustomer(!isOpenCustomer);
	};

	const handleDispatch = (item: any) => {
		setInvoiceValue({ ...InvoiceValue, associated_poId: item?.id });
		if (item !== "close") {
			let invoiceData: any = [
				[
					item?.order_number,
					item.customer_info?.name ? (
						<span className={customerViewBut}>
							<span>{item.customer_info?.name}</span>
						</span>
					) : (
						"_"
					),
					item.po_entries ? (
						<b className={detailsViewBut}>
							View <span>{item.po_entries?.length}</span>
						</b>
					) : (
						"_"
					),
					item.issued_date
						? `${String(new Date(item.issued_date)).slice(3, 10)},${String(
								new Date(item.issued_date)
						  ).slice(10, 16)}`
						: "_",
					item.has_raw_material ? "Yes" : "No",
					item?.net_weight ? item?.net_weight : "_",
					statusTabs.map((filterValue: any) => {
						if (filterValue.status === item.status) {
							return (
								<b
									className={detailsStatusBut}
									style={{
										background:
											item.status !== "dispatched" ? "rgba(33, 150, 243, 0.15)" : "#FBF5C4",
										borderColor:
											item.status !== "dispatched" ? "rgba(33, 150, 243, 0.15)" : "#FBF5C4"
									}}
								>
									{filterValue.label}
								</b>
							);
						}
					})
				]
			];
			setInvoiceDetails({
				title: "Generate Invoice",
				columns: generateInvoiceColumns,
				data: invoiceData,
				id: item?.id
			});
		}
		setOpenGenerateInvoice(!openGenerateInvoice);
	};

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
		perChasevalue.products?.data?.map((item: any) => {
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
		if (!productsRate.isLoading) {
			let ratelist: any = [];
			let list: any = [];
			let datarate: any = await productsRate?.data?.data;
			datarate?.forEach((item: any) => {
				let obj = { name: item, id: item.id };
				ratelist.push(obj);
				list.push(item);
			});
			setAllRateList(list);
			setProductRatelist(ratelist);
		}
		if (!purchaseOrderds.isLoading) {
			let purchaselist: any = [];
			let datarate: any = await purchaseOrderds?.data?.data;
			datarate?.forEach((item: any) => {
				let obj = { name: item, id: item.id };
				purchaselist.push(obj);
			});
			setProductPurchaseOrderlist(purchaselist);
		}
	};

	const getAllProductsWithRate = async () => {
		if (!productsWithRate.isLoading) {
			setProductWithRateData(productsWithRate?.data?.data);
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
				status = "ready_for_dispatch";
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
				setIsOpenCustomer(false);
				setIsOpen(false);
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
		setIsOpen(!IsOpen);
		if (type === "model") {
		}
		if (type === "close") {
			if (!id) {
				setLoader(true);
				mutation.mutate(values);
			} else {
				setLoader(true);
				// let valuedata: any = { name: { ...formDetails, ["status"]: values.status.id }, id: id };
				// mutationEdit.mutate(valuedata);
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
			// setIsOpen(!IsOpen);
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
			let product = [];
			let polist: any = [];
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
			let dataorder: any = await purchaseOrderds?.data;
			setTotalCount(dataorder?.count);
			let list: any = [];
			dataorder?.data?.map((item: any, index: any) => {
				let data2 = [
					rowsPerPage * page + index - rowsPerPage + 1,
					<b className={detailsPointViewBut}>{item?.customer_info?.name}</b>,
					<b className={detailsViewBut}>
						View <span>{item?.po_entries?.length}</span>
					</b>,
					<b className={detailsPointViewBut}>View</b>,
					<b className={detailsPointViewBut}>View</b>,
					item.gross_weight ? item.gross_weight : "_",
					item.net_weight ? item.net_weight : "_",
					item.order_number,
					item.issued_date
						? `${String(new Date(item.issued_date)).slice(3, 10)},${String(
								new Date(item.issued_date)
						  ).slice(10, 16)}`
						: "_",
					<PurcharseOrderTableAction
						handleView={handleView}
						item={item}
						handleDetailsView={handleDetailsView}
					/>
				];
				let data1 = [
					rowsPerPage * page + index - rowsPerPage + 1,
					<b className={detailsPointViewBut}>{item?.customer_info?.name}</b>,
					<b className={detailsViewBut}>
						View <span>{item?.po_entries?.length}</span>
					</b>,
					<b className={detailsPointViewBut}>View</b>,
					<b className={detailsPointViewBut}>View</b>,
					item.gross_weight ? item.gross_weight : "_",
					item.net_weight ? item.net_weight : "_",
					item.order_number,
					item.issued_date
						? `${String(new Date(item.issued_date)).slice(3, 10)},${String(
								new Date(item.issued_date)
						  ).slice(10, 16)}`
						: "_",
					statusTabs.map((filterValue: any) => {
						if (filterValue.status === item.status) {
							return (
								<b
									className={detailsStatusBut}
									style={{
										background:
											item.status !== "dispatched" ? "rgba(33, 150, 243, 0.15)" : "#FBF5C4",
										borderColor:
											item.status !== "dispatched" ? "rgba(33, 150, 243, 0.15)" : "#FBF5C4"
									}}
								>
									{filterValue.label}
								</b>
							);
						}
					}),
					<PurcharseOrderTableAction
						handleView={handleView}
						item={item}
						handleDetailsView={handleDetailsView}
					/>
				];

				if (value === 0) {
					list.push(data1);
				} else {
					list.push(data2);
				}
			});
			setTableData(list);
			setLoader(false);
			setFetchAgain(false);
		}
	};
	const getAllProduct = async () => {
		if (!products.isLoading) {
			let list: any = [];
			let dataproduct: any = await products?.data;
			dataproduct?.data.forEach((item: any) => {
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
		handleProductApprove,
		productmenu,
		productPurchaseOrderlist,
		isOpenCustomer,
		openGenerateInvoice,
		handleCustomerView,
		handleTabChange,
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
		productWithRateData,
		getAllProductsWithRate,
		productPODetails,
		poDetails,
		verifyValue,
		headTitle,
		allRateList,
		handleDetailsView,
		value,
		ListTitle,
		status,
		poEntries,
		handleDispatch,
		handleChangePage,
		handleChangeRowsPerPage,
		page,
		rowsPerPage,
		totalCount,
		invoiceDetails
	};
}
