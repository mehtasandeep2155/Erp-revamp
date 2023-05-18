import CollapsibleTable from "@common/tables/collapsible-table";
import TableComponent from "@common/tables/custom-table";
import { HeaderPage } from "@component/commoncomponent/common-components";
import { yourPurchaseOrderInnerHead, rateColums } from "@component/utils/form/constant";
import { memo } from "react";

const ProductVariantListWeb = ({
	coloums,
	onClickByAdmin,
	handleChangeRowsPerPage,
	handleChangePage,
	onDelete,
	loading,
	tableInnerData,
	tableData,
	rowsPerPage,
	totalCount,
	page
}: any) => {
	return (
		<>
			<HeaderPage onClickByAdmin={onClickByAdmin} tableData={tableData} />
			<TableComponent
				columns={coloums}
				title="Product List"
				tableData={tableData}
				onDelete={onDelete}
				expandable={false}
				loading={loading}
				tableHead={rateColums}
				tableInnerHead={yourPurchaseOrderInnerHead}
				tableInnerData={tableInnerData}
				clickAction={onClickByAdmin}
				buttonTitle="Add Product"
				expandableRow={true}
				iconAt={1}
				innertitle={"Products Details"}
				handleChangeRowsPerPage={handleChangeRowsPerPage}
				handleChangePage={handleChangePage}
				rowsPerPage={rowsPerPage}
				page={page}
				totalCount={totalCount}
			/>
		</>
	);
};
export default memo(ProductVariantListWeb);
