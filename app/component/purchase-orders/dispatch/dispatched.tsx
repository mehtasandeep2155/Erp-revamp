import CustomizedDialogs from "@common/dailog/dailog-model";
import { HeaderPage } from "@component/commoncomponent/common-components";
import TableComponent from "common/tables/custom-table";
import { memo, useEffect } from "react";
import usePurchaseOrder from "../purchase-order-hook";
import CustomerCard from "../customer-view";
import ProductView from "../po-entries/po-entries-view";
import { getPurchaseOrders } from "@api/get-api-queries";
import useConstant from "@component/utils/form/constant";
import AddInvoice from "@component/purchase-orders/invoice/add-invoice";

const Dispatched = () => {
	const {
		getAllPurchaseList,
		columns,
		fetchagain,
		loader,
		finishTableData,
		isOpenCustomer,
		handleCustomerView,
		customerObj,
		isOpenProduct,
		handleProductView,
		productObjList,
		InvoiceClick,
		InvoiceValue,
		menuCustomer
	} = usePurchaseOrder(0);
	const { purchaseOrderds } = getPurchaseOrders();
	const { purchaseOrderFincishColums } = useConstant();
	useEffect(() => {
		getAllPurchaseList();
	}, [purchaseOrderds.isLoading, fetchagain, purchaseOrderds.isRefetching]);

	return (
		<>
			<TableComponent
				title="Dispatched List"
				columns={purchaseOrderFincishColums}
				tableData={finishTableData}
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
				title="Generate Invoice"
				isOpen={menuCustomer}
				handleClose={InvoiceClick}
				width="sm"
				content={
					<AddInvoice
						InvoiceValue={InvoiceValue}
						onClickByAdmin={InvoiceClick}
						purchase={false}
						disabled={true}
						handleOnInvoceClick={undefined}
						tableDataSelect={undefined}
						setIsOpen={undefined}
						productPoList={undefined}
					/>
				}
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

export default memo(Dispatched);
