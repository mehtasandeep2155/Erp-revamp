import TableComponent from "@common/tables/custom-table";
import { memo } from "react";
import { HeaderPage } from "@component/commoncomponent/common-components";

const BranchListWeb = (props: any) => {
	const { columns, tableData, onClickByAdmin, onDelete, loading } = props;

	return (
		<>
			<HeaderPage onClickByAdmin={onClickByAdmin} tableData={tableData} />
			<TableComponent
				title="Branch List"
				tableData={tableData}
				columns={columns}
				onDelete={onDelete}
				loading={loading}
				buttonTitle="Add Branch"
			/>
		</>
	);
};
export default memo(BranchListWeb);
