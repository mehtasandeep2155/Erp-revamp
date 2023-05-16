import { header, tableTitle } from "@css/styles";
import TableComponent from "common/tables/custom-table";
import { memo } from "react";
import { verifyColumns } from "@component/utils/form/constant";

const Dashboard = (props: any) => {
	const { tableData, onDelete, loading, page, rowsPerPage, totalCount, handleChangePage, handleChangeRowsPerPage } =
		props;

	return (
		<>
			<div className={header}>
				<h3 className={tableTitle}></h3>
			</div>
			<TableComponent
				title="Users List"
				columns={verifyColumns}
				tableData={tableData}
				onDelete={onDelete}
				loading={loading}
				page={page}
				rowsPerPage={rowsPerPage}
				handleChangePage={handleChangePage}
				handleChangeRowsPerPage={handleChangeRowsPerPage}
				totalCount={totalCount}
			/>
		</>
	);
};

export default memo(Dashboard);
