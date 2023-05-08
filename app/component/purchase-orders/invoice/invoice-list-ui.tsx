import TableComponent from "@common/tables/custom-table";
import { memo } from "react";
import { HeaderPage } from "@component/commoncomponent/common-components";

const LedgerListWeb = (props: any) => {
	const { columns, tableData, onClickByAdmin, onDelete, loading } = props;

	return (
		<>
			<TableComponent
				title="Invoice List"
				tableData={tableData}
				columns={columns}
				onDelete={onDelete}
				loading={loading}
				buttonTitle="Add Invoice"
			/>
		</>
	);
};
export default memo(LedgerListWeb);
