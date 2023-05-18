import TableComponent from "@common/tables/custom-table";
import { memo } from "react";
import { HeaderPage } from "@component/commoncomponent/common-components";

const LedgerListWeb = (props: any) => {
	const {
		columns,
		tableData,
		onClickByAdmin,
		onDelete,
		loading,
		totalCount,
		page,
		rowsPerPage,
		handleChangePage,
		handleChangeRowsPerPage
	} = props;

	return (
		<>
			<HeaderPage onClickByAdmin={onClickByAdmin} tableData={tableData} />
			<TableComponent
				title="Invoice List"
				tableData={tableData}
				columns={columns}
				onDelete={onDelete}
				loading={loading}
				buttonTitle=""
				totalCount={totalCount}
				page={page}
				rowsPerPage={rowsPerPage}
				handleChangePage={handleChangePage}
				handleChangeRowsPerPage={handleChangeRowsPerPage}
			/>
		</>
	);
};
export default memo(LedgerListWeb);
