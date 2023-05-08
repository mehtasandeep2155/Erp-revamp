import { HeaderPage } from "@component/commoncomponent/common-components";
import TableComponent from "common/tables/custom-table";
import { memo } from "react";

const PurchaseOrderWeb = (props: any) => {
	const { columns, tableData, onClickByAdmin, loading } = props;

	return (
		<>
			<HeaderPage onClickByAdmin={onClickByAdmin} tableData={tableData} />
			<TableComponent
				columns={columns}
				title="Initiated Purchase Order List"
				tableData={tableData}
				loading={loading}
				buttonTitle="Add Purchase Order"
			/>
		</>
	);
};
export default memo(PurchaseOrderWeb);
