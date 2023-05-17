import CustomizedDialogs from "@common/dailog/dailog-model";
import { HeaderPage } from "@component/commoncomponent/common-components";
import TableComponent from "common/tables/custom-table";
import { memo, useEffect } from "react";
import usePurchaseOrder from "../purchase-order-hook";
import CustomerCard from "../customer-view";
import ProductView from "../po-entries/po-entries-view";
import { getPurchaseOrders } from "@api/get-api-queries";
import { CoatingColums } from "@component/utils/form/constant";
import { useValidation } from "@component/utils/form/validation";

const ReadyForCoatingList = () => {
	const {
		perChasevalue,
		getAllPurchaseList,
		fetchagain,
		loader,
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
	} = usePurchaseOrder();
	const { varifyPoSchema } = useValidation(verifyValue);
	const { purchaseOrderds } = getPurchaseOrders("", "", "");

	useEffect(() => {
		getAllPurchaseList();
	}, [purchaseOrderds.isLoading, fetchagain, purchaseOrderds.isRefetching]);

	return (
		<>
			<TableComponent
				title="Coating Initiated List"
				columns={CoatingColums}
				tableData={[[]]}
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

export default memo(ReadyForCoatingList);
