import { HeaderPage } from "@component/commoncomponent/common-components";
import TableComponent from "common/tables/custom-table";
import { memo } from "react";

const StockListWeb = (props: any) => {
	const { coloums, onClickByAdmin, onDelete, loading, tableData } = props;

	return (
		<>
			<HeaderPage title="none" onClickByAdmin={onClickByAdmin} tableData={tableData} />
			<TableComponent
				columns={coloums}
				title="Stock List"
				tableData={tableData}
				onDelete={onDelete}
				loading={loading}
			/>
		</>
	);
};
export default memo(StockListWeb);
