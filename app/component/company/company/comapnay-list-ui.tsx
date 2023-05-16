import TableComponent from "@common/tables/custom-table";
import { memo } from "react";
import { HeaderPage } from "@component/commoncomponent/common-components";

const CompanyListWeb = (props: any) => {
	const {
		columns,
		tableData,
		onClickByAdmin,
		onDelete,
		loading,
		handleChangeRowsPerPage,
		handleChangePage,
		page,
		rowsPerPage,
		totalCount
	} = props;

	return (
		<>
			<HeaderPage onClickByAdmin={onClickByAdmin} tableData={tableData} />
			<TableComponent
				title="Company"
				tableData={tableData}
				columns={columns}
				onDelete={onDelete}
				clickAction={onClickByAdmin}
				loading={loading}
				buttonTitle="Add Company"
				handleChangeRowsPerPage={handleChangeRowsPerPage}
				handleChangePage={handleChangePage}
				page={page}
				totalCount={totalCount}
				rowsPerPage={rowsPerPage}
			/>
		</>
	);
};
export default memo(CompanyListWeb);
