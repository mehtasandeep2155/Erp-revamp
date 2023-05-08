import { HeaderPage } from "@component/commoncomponent/common-components";
import { header, tableTitle } from "@css/styles";
import TableComponent from "common/tables/custom-table";
import { memo } from "react";

const GarbageListWeb = (props: any) => {
	const { coloums, onClickByAdmin, onDelete, loading, tableData } = props;

	return (
		<>
			<div className={header}>
				<h3 className={tableTitle}></h3>
			</div>
			<TableComponent
				columns={coloums}
				title="Garbage List"
				tableData={tableData}
				onDelete={onDelete}
				loading={loading}
			/>
		</>
	);
};
export default memo(GarbageListWeb);
