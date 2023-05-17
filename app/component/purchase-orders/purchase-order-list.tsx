import { useEffect, memo, useState } from "react";
import PurchaseOrderWeb from "./purchase-order-ui";
import AddPurchaseOrder from "./add-purchase-order";
import usePurchaseOrder from "./purchase-order-hook";
import { useValidation } from "@component/utils/form/validation";
import VerifyPurchaseOrder from "./verify-purchase-order";
import PurchaseOrderDetails from "./purchase-order-view";
import { getProduct, getPurchaseOrders, getRate } from "@api/get-api-queries";
import SwipeableTemporaryDrawer from "@common/drawer/drawer-model";
import OpenGenerateInvoice from "./open-generate-invoice";

function PurchaseOrderList() {
	const {
		perChasevalue,
		getAllPurchaseList,
		onClick,
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
		columns,
		verifyValue,
		handleDetailsView,
		poDetails,
		openGenerateInvoice,
		handleDispatch,
		handleTabChange,
		value,
		page,
		rowsPerPage,
		handleChangePage,
		handleChangeRowsPerPage,
		totalCount,
		ListTitle,
		AlltableData,
		listData,
		status,
		invoiceDetails
	} = usePurchaseOrder();
	const { rates } = getRate("", "");
	const { products } = getProduct("", "");
	const { purchaseOrderds } = getPurchaseOrders(page, rowsPerPage, status);
	const { varifyPoSchema } = useValidation(verifyValue);
	const [submit, setSubmit] = useState(false);
	const [tabData, setTableData] = useState([]);

	useEffect(() => {
		getAllPurchaseList();
	}, [purchaseOrderds.isRefetching, purchaseOrderds.isLoading, fetchagain, status, rowsPerPage, page]);

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
					columns={columns}
					tableData={value !== 0 ? listData : AlltableData}
					onClickByAdmin={onClick}
					loading={loader}
					value={value}
					handleTabChange={handleTabChange}
					tabListData={value !== 0 ? listData : AlltableData}
					listTitle={ListTitle}
					page={page}
					rowsPerPage={rowsPerPage}
					handleChangePage={handleChangePage}
					handleChangeRowsPerPage={handleChangeRowsPerPage}
					totalCount={totalCount}
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
