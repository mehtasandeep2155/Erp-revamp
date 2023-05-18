import TableComponent from "@common/tables/custom-table";
import { memo } from "react";
import { header, tableTitle } from "@css/styles";
import { HeaderPage } from "@component/commoncomponent/common-components";

const SubCompanyListWeb = (props: any) => {
	const {
		columns,
		tableData,
		onClickByAdmin,
		onDelete,
		loading,
		page,
		rowsPerPage,
		handleChangePage,
		totalCount,
		handleChangeRowsPerPage
	} = props;
	return (
		<>
			<HeaderPage onClickByAdmin={onClickByAdmin} tableData={tableData} />
			<TableComponent
				title="Sub Company List"
				tableData={tableData}
				columns={columns}
				onDelete={onDelete}
				loading={loading}
				buttonTitle="Add Sub Company"
				clickAction={onClickByAdmin}
				page={page}
				rowsPerPage={rowsPerPage}
				handleChangePage={handleChangePage}
				totalCount={totalCount}
				handleChangeRowsPerPage={handleChangeRowsPerPage}
			/>
		</>
	);
};

export default memo(SubCompanyListWeb);
