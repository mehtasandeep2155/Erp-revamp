import { HeaderPage } from "@component/commoncomponent/common-components";
import TableComponent from "common/tables/custom-table";
import { memo } from "react";

const PoEntriesListWeb = (props: any) => {
	const { columns, tableData, onClickByAdmin, onDelete, loading } = props;

	return (
		<>
			<TableComponent
				title="All Po Entries List"
				columns={columns}
				tableData={tableData}
				onDelete={onDelete}
				loading={loading}
				buttonTitle="Add Po Entries"
			/>
		</>
	);
};

export default memo(PoEntriesListWeb);
