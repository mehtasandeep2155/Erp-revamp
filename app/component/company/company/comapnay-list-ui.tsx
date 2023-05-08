import TableComponent from "@common/tables/custom-table";
import { memo } from "react";
import { HeaderPage } from "@component/commoncomponent/common-components";

const CompanyListWeb = (props: any) => {
	const { columns, tableData, onClickByAdmin, onDelete, loading, allComapnyList } = props;

	return (
		<>
			<HeaderPage onClickByAdmin={onClickByAdmin} tableData={tableData} />
			<TableComponent
				title="Company"
				tableData={tableData}
				columns={columns}
				onDelete={onDelete}
				loading={loading}
				buttonTitle="Add Company"
			/>
		</>
	);
};
export default memo(CompanyListWeb);
