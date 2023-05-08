import TableComponent from "@common/tables/custom-table";
import { memo, useEffect } from "react";
import { HeaderPage } from "@component/commoncomponent/common-components";
import useLedger from "./ledger-hook";
import CustomizedDialogs from "@common/dailog/dailog-model";
import CustomerCard from "@component/purchase-orders/customer-view";
import PurchaseOrderDetails from "./purchase-order-details";
import { getLedger } from "@api/get-api-queries";

const LedgerListPaidWeb = () => {
	const {
		columns,
		fetchagain,
		getAllLedgerList,
		customerObj,
		loader,
		tablePaidData,
		isOpenCustomer,
		handleCustomerView,
		IsOpenPo,
		handlePoView,
		PoDetails
	} = useLedger();

	const { ledgers } = getLedger();

	useEffect(() => {
		getAllLedgerList();
	}, [ledgers.isLoading, fetchagain, ledgers.isFetching]);

	return (
		<>
			<HeaderPage />
			<TableComponent title="Paid Ledger List" tableData={tablePaidData} columns={columns} loading={loader} />
			<CustomizedDialogs
				title="Customer Info"
				isOpen={isOpenCustomer}
				handleClose={handleCustomerView}
				width="sm"
				content={<CustomerCard customerObj={customerObj} />}
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
};
export default memo(LedgerListPaidWeb);
