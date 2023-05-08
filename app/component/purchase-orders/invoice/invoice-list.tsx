import { useEffect, memo } from "react";
import CustomizedDialogs from "@common/dailog/dailog-model";
import CompanyListWeb from "./invoice-list-ui";
import AddInVoice from "./add-invoice";
import useInVoice from "./invoice-hook";
import PurchaseOrderDetails from "@component/ledger/ledger/purchase-order-details";
import usePurchaseOrder from "@component/purchase-orders/purchase-order-hook";
import { getPurchaseOrders } from "@api/get-api-queries";

function InVoiceList() {
	const {
		menuCustomer,
		IsOpenPo,
		onClick,
		InvoiceValue,
		columns,
		invoices,
		fetchagain,
		handlePoView,
		PoDetails,
		getAllLedgerList,
		tableData,
		loader
	} = useInVoice();
	const { getAllPurchaseList, tableDataSelectPurcahse, handleOnInvoceClick, productPoList } =
		usePurchaseOrder(0);
	const { purchaseOrderds } = getPurchaseOrders();

	useEffect(() => {
		getAllPurchaseList();
		getAllLedgerList();
	}, [invoices.isLoading, fetchagain, invoices.isRefetching, purchaseOrderds.isLoading]);

	useEffect(() => {
		invoices.refetch();
	}, []);
	const handleDelete = async (id: string) => {};
	return (
		<>
			<CompanyListWeb
				tableData={tableData}
				columns={columns}
				onClickByAdmin={onClick}
				onDelete={handleDelete}
				loading={loader}
			/>
			<CustomizedDialogs
				title="Invoice"
				isOpen={menuCustomer}
				handleClose={onClick}
				content={
					<AddInVoice
						setIsOpen={false}
						InvoiceValue={InvoiceValue}
						onClickByAdmin={onClick}
						purchase={false}
						disabled={false}
						productPoList={productPoList}
						tableDataSelect={tableDataSelectPurcahse}
						handleOnInvoceClick={handleOnInvoceClick}
					/>
				}
			/>
			<CustomizedDialogs
				title="Purchase Order Info"
				isOpen={IsOpenPo}
				handleClose={handlePoView}
				width="sm"
				content={<PurchaseOrderDetails poDetailsobj={PoDetails} />}
			/>
		</>
	);
}
export default memo(InVoiceList);
