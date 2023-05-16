import TableComponent from "@common/tables/custom-table";
import { memo } from "react";
import { HeaderPage } from "@component/commoncomponent/common-components";

const BranchListWeb = (props: any) => {
	const {
		columns,
		tableData,
		onClickByAdmin,
		onDelete,
		loading,
		page,
		rowsPerPage,
		totalCount,
		handleChangePage,
		handleChangeRowsPerPage
	} = props;

	return (
		<>
			<HeaderPage onClickByAdmin={onClickByAdmin} tableData={tableData} />
			<TableComponent
				title="Branch List"
				tableData={tableData}
				columns={columns}
				onDelete={onDelete}
				clickAction={onClickByAdmin}
				loading={loading}
				buttonTitle="Add Branch"
				page={page}
				totalCount={totalCount}
				handleChangeRowsPerPage={handleChangeRowsPerPage}
				handleChangePage={handleChangePage}
				rowsPerPage={rowsPerPage}
			/>
		</>
	);
};
export default memo(BranchListWeb);
