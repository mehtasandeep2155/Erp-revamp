import { useEffect, memo } from "react";
import { useValidation } from "@component/utils/form/validation";
import CustomizedDialogs from "@common/dailog/dailog-model";
import CompanyListWeb from "./ledger-list-ui";
import AddCustomer from "./add-ledger";
import useLedger from "./ledger-hook";
import CustomerCard from "@component/purchase-orders/customer-view";
import PurchaseOrderDetails from "./purchase-order-details";
import { getLedger } from "@api/get-api-queries";

function LedgerList() {
	const {
		menuCustomer,
		onClick,
		ledgerValue,
		columns,
		fetchagain,
		getAllLedgerList,
		tableData,
		loader,
		isOpenCustomer,
		handleCustomerView,
		customerObj,
		PoDetails,
		handlePoView,
		IsOpenPo
	} = useLedger();
	const { ledgers } = getLedger();
	const { CompanySchema } = useValidation(ledgerValue);

	useEffect(() => {
		getAllLedgerList();
	}, [ledgers.isLoading, fetchagain, ledgers.isRefetching]);

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
				title="Ledger"
				isOpen={menuCustomer}
				handleClose={onClick}
				content={
					<AddCustomer
						setIsOpen={false}
						ledgerValue={ledgerValue}
						validation={CompanySchema}
						onClickByAdmin={onClick}
						purchase={false}
						props={undefined}
						disabled={false}
					/>
				}
			/>
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
}
export default memo(LedgerList);
