import { HeaderPage } from "@component/commoncomponent/common-components";
import TableComponent from "common/tables/custom-table";
import { memo } from "react";
const ProductTypeListWeb = (props: any) => {
	const {
		tableData,
		onClickByAdmin,
		columns,
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
				title="Product Coating List"
				columns={columns}
				tableData={tableData}
				onDelete={onDelete}
				loading={loading}
				buttonTitle="Add Product Coating"
				clickAction={onClickByAdmin}
				page={page}
				totalCount={totalCount}
				rowsPerPage={rowsPerPage}
				handleChangePage={handleChangePage}
				handleChangeRowsPerPage={handleChangeRowsPerPage}
			/>
		</>
	);
};

export default memo(ProductTypeListWeb);
