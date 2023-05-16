import TableComponent from "@common/tables/custom-table";
import { memo } from "react";
import { HeaderPage } from "@component/commoncomponent/common-components";
import { colorColumns } from "@component/utils/form/constant";
const ProductColorListWeb = (props: any) => {
	const {
		tableData,
		onClickByAdmin,
		onDelete,
		loading,
		handleChangeRowsPerPage,
		handleChangePage,
		rowsPerPage,
		page,
		totalCount
	} = props;

	return (
		<>
			<HeaderPage onClickByAdmin={onClickByAdmin} tableData={tableData} />
			<TableComponent
				title="Product Color List"
				tableData={tableData}
				columns={colorColumns}
				onDelete={onDelete}
				loading={loading}
				buttonTitle={"Add Color"}
				clickAction={onClickByAdmin}
				handleChangeRowsPerPage={handleChangeRowsPerPage}
				handleChangePage={handleChangePage}
				rowsPerPage={rowsPerPage}
				page={page}
				totalCount={totalCount}
			/>
		</>
	);
};
export default memo(ProductColorListWeb);
