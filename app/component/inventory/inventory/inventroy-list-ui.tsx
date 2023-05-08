import { tableTitle, header } from "@css/styles";
import TableComponent from "common/tables/custom-table";
import { memo } from "react";

const InventoryListWeb = (props: any) => {
	const { coloums, onDelete, loading, tableData } = props;

	return (
		<>
			<div className={header}>
				<h3 className={tableTitle}></h3>
			</div>
			<TableComponent
				columns={coloums}
				title="Inventory List"
				tableData={tableData}
				onDelete={onDelete}
				loading={loading}
			/>
		</>
	);
};
export default memo(InventoryListWeb);
