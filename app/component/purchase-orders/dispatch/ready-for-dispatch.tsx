import CustomizedDialogs from "@common/dailog/dailog-model";
import { HeaderPage } from "@component/commoncomponent/common-components";
import TableComponent from "common/tables/custom-table";
import { memo, useEffect } from "react";
import usePurchaseOrder from "../purchase-order-hook";
import VerifyPurchaseOrder from "../verify-purchase-order";
import CustomerCard from "../customer-view";
import ProductView from "../po-entries/po-entries-view";
import { getPurchaseOrders } from "@api/get-api-queries";
import { CoatingDoneColums } from "@component/utils/form/constant";
import { useValidation } from "@component/utils/form/validation";

const ReadyForDispatch = () => {
	const {
		perChasevalue,
		getAllPurchaseList,
		fetchagain,
		loader,
		DispatchReadyTableData,
		handleProductApprove,
		handleView,
		isOpenCustomer,
		handleCustomerView,
		customerObj,
		isOpenProduct,
		handleProductView,
		productObjList,
		verifyValue,
		IsDetails
	} = usePurchaseOrder(0);
	const { purchaseOrderds } = getPurchaseOrders();
	const { varifyPoStatusSchema } = useValidation(verifyValue);

	useEffect(() => {
		getAllPurchaseList();
	}, [purchaseOrderds.isLoading, fetchagain, purchaseOrderds.isRefetching]);

	return (
		<>
			<TableComponent
				title="Dispatch Ready List"
				columns={CoatingDoneColums}
				tableData={DispatchReadyTableData}
				onDelete={""}
				loading={loader}
			/>
			<CustomizedDialogs
				title="Customer Info"
				isOpen={isOpenCustomer}
				handleClose={handleCustomerView}
				width="sm"
				content={<CustomerCard customerObj={customerObj} />}
			/>

			<CustomizedDialogs
				title="Product Info"
				isOpen={isOpenProduct}
				handleClose={handleProductView}
				width="md"
				content={<ProductView products={productObjList} />}
			/>
			<CustomizedDialogs
				title="Purchase Order Details"
				isOpen={IsDetails}
				width="sm"
				handleClose={handleView}
				content={
					<VerifyPurchaseOrder
						disabled={false}
						validation={varifyPoStatusSchema}
						verifyValue={verifyValue}
						perChasevalue={perChasevalue}
						handleProductApprove={handleProductApprove}
						status="dispatched"
						productObjList={productObjList}
					/>
				}
			/>
		</>
	);
};

export default memo(ReadyForDispatch);
