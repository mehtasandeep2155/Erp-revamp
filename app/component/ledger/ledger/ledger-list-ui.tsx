import TableComponent from "@common/tables/custom-table";
import { memo } from "react";
import { HeaderPage } from "@component/commoncomponent/common-components";
import { header, tableTitle } from "@css/styles";

const LedgerListWeb = (props: any) => {
	const { columns, tableData, onClickByAdmin, onDelete, loading } = props;

	return (
		<>
			<div className={header}>
				<h3 className={tableTitle}></h3>
			</div>
			<TableComponent
				title="Ledger List"
				tableData={tableData}
				columns={columns}
				onDelete={onDelete}
				loading={loading}
				buttonTitle="Add Ledger"
			/>
		</>
	);
};
export default memo(LedgerListWeb);
