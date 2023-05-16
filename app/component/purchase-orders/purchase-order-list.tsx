import { useEffect, memo, useState } from "react";
import PurchaseOrderWeb from "./purchase-order-ui";
import AddPurchaseOrder from "./add-purchase-order";
import usePurchaseOrder from "./purchase-order-hook";
import { useValidation } from "@component/utils/form/validation";
import VerifyPurchaseOrder from "./verify-purchase-order";
import PurchaseOrderDetails from "./purchase-order-view";
import { getProduct, getPurchaseOrders, getRate } from "@api/get-api-queries";
import { purchaseOrderColums, CoatingColums } from "@component/utils/form/constant";
import SwipeableTemporaryDrawer from "@common/drawer/drawer-model";
import OpenGenerateInvoice from "./open-generate-invoice";

function PurchaseOrderList() {
	const {
		perChasevalue,
		getAllPurchaseList,
		onClick,
		tableData,
		fetchagain,
		IsOpen,
		loader,
		handleProductApprove,
		getAllProduct,
		handleView,
		IsDetails,
		isOpenCustomer,
		headTitle,
		productObjList,
		getAllList,
		readyForCoatingTableData,
		DispatchReadyTableData,
		CoatingInProgressTableData,
		allTableData,
		finishTableData,
		verifyValue,
		handleDetailsView,
		poDetails,
		openGenerateInvoice,
		handleDispatch,
		invoiceDetails
	} = usePurchaseOrder();
	const { rates } = getRate("", "");
	const { products } = getProduct("", "");
	const { purchaseOrderds } = getPurchaseOrders();
	const { varifyPoSchema } = useValidation(verifyValue);
	const [value, setValue] = useState(0);
	const [tabListData, setTabListData] = useState(allTableData);
	const [listTitle, setListTitle] = useState("All Purchase Order List");
	const [columsData, setColumsData] = useState(purchaseOrderColums);
	const [submit, setSubmit] = useState(false);

	const handleTabChange = (event: any, newValue: number) => {
		if (newValue === 0) {
			setTabListData(allTableData);
			setColumsData(purchaseOrderColums);
			setListTitle("All Purchase Order List");
		} else {
			setColumsData(CoatingColums);
			if (newValue === 1) {
				setListTitle("Initiated Purchase Order List");
				setTabListData(tableData);
			} else if (newValue === 2) {
				setTabListData(readyForCoatingTableData);
				setListTitle("Coating Initiated Purchase Order List");
			} else if (newValue === 3) {
				setTabListData(CoatingInProgressTableData);
				setListTitle("Processing Purchase Order List");
			} else if (newValue === 4) {
				setTabListData(DispatchReadyTableData);
				setListTitle("Ready For Dispatch Purchase Order List");
			} else {
				setTabListData(finishTableData);
			}
		}
		setValue(newValue);
	};

	useEffect(() => {
		handleTabChange("", value);
		getAllPurchaseList();
	}, [purchaseOrderds.isRefetching, purchaseOrderds.isLoading, fetchagain, value]);

	useEffect(() => {
		getAllList();
	}, [rates.isLoading]);

	useEffect(() => {
		getAllProduct();
	}, [products.isLoading, fetchagain]);

	return (
		<>
			{!isOpenCustomer && (!IsOpen || submit) && !openGenerateInvoice ? (
				<PurchaseOrderWeb
					columns={columsData}
					tableData={tableData}
					onClickByAdmin={onClick}
					loading={loader}
					value={value}
					handleTabChange={handleTabChange}
					tabListData={tabListData}
					listTitle={listTitle}
				/>
			) : null}
			{isOpenCustomer && (
				<PurchaseOrderDetails data={poDetails} headTitle={headTitle} handleView={handleDetailsView} />
			)}
			{IsOpen && !submit ? (
				<AddPurchaseOrder handleSubmit={onClick} setSubmit={setSubmit} perChasevalue={perChasevalue} />
			) : null}
			{openGenerateInvoice && <OpenGenerateInvoice handleView={handleDispatch} invoiceDetails={invoiceDetails} />}
			<SwipeableTemporaryDrawer
				isOpen={IsDetails}
				handleClose={handleView}
				anchor="right"
				title="Verify User"
				content={
					<VerifyPurchaseOrder
						validation={varifyPoSchema}
						verifyValue={verifyValue}
						handleClose={handleView}
						disabled={false}
						perChasevalue={perChasevalue}
						handleProductApprove={handleProductApprove}
						status="coating_initiated"
						productObjList={productObjList}
					/>
				}
			/>
		</>
	);
}
export default memo(PurchaseOrderList);
