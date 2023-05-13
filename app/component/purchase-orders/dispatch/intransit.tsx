import CustomizedDialogs from "@common/dailog/dailog-model";
import TableComponent from "common/tables/custom-table";
import { memo, useEffect } from "react";
import usePurchaseOrder from "../purchase-order-hook";
import CustomerCard from "../customer-view";
import ProductView from "../po-entries/po-entries-view";
import { getPurchaseOrders } from "@api/get-api-queries";
import { CoatingDoneColums } from "@component/utils/form/constant";
import { useValidation } from "@component/utils/form/validation";

const InTransit = () => {
	const {
		perChasevalue,
		getAllPurchaseList,
		fetchagain,
		loader,
		InTransitTableData,
		handleProductApprove,
		handleView,
		isOpenCustomer,
		verifyValue,
		handleCustomerView,
		customerObj,
		isOpenProduct,
		handleProductView,
		productObjList,
		IsDetails
	} = usePurchaseOrder();
	const { purchaseOrderds } = getPurchaseOrders();
	useEffect(() => {
		getAllPurchaseList();
	}, [purchaseOrderds.isLoading, fetchagain, purchaseOrderds.isRefetching]);
	const { varifyPoStatusSchema } = useValidation(verifyValue);

	return (
		<>
			<TableComponent
				title="InTransits List"
				columns={CoatingDoneColums}
				tableData={InTransitTableData}
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
		</>
	);
};

export default memo(InTransit);
