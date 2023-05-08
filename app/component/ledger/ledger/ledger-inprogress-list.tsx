import TableComponent from "@common/tables/custom-table";
import { memo, useEffect, useState } from "react";
import { HeaderPage } from "@component/commoncomponent/common-components";
import useLedger from "./ledger-hook";
import CustomizedDialogs from "@common/dailog/dailog-model";
import AddCustomer from "./add-ledger";
import CustomerCard from "@component/purchase-orders/customer-view";
import { useValidation } from "@component/utils/form/validation";
import PurchaseOrderDetails from "./purchase-order-details";
import { getLedger } from "@api/get-api-queries";

const LedgerListInprogressWeb = () => {
	const [role, setRole] = useState("");
	const {
		columns,
		fetchagain,
		getAllLedgerList,
		customerObj,
		loader,
		menuCustomer,
		onClick,
		ledgerValue,
		isOpenCustomer,
		handleCustomerView,
		IsOpenPo,
		handlePoView,
		tableInprogessData,
		PoDetails
	} = useLedger();
	const { ledgers } = getLedger();
	const { CompanySchema } = useValidation(ledgerValue);

	useEffect(() => {
		let localData: any = JSON.parse(localStorage.getItem("userdata"));
		if (localData) {
			setRole(localData.user.role);
		}
		getAllLedgerList();
	}, [ledgers.isLoading, fetchagain, ledgers.isFetching]);

	return (
		<>
			<HeaderPage />
			<TableComponent
				title="Processing Ledger List"
				tableData={tableInprogessData}
				columns={columns}
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
						disabled={role !== "Admin" && role !== "SuperAdmin"}
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
};
export default memo(LedgerListInprogressWeb);
