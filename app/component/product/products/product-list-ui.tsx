import { HeaderPage } from "@component/commoncomponent/common-components";
import TableComponent from "common/tables/custom-table";
import { memo } from "react";

const ProductVariantListWeb = ({ coloums, onClickByAdmin, onDelete, loading, tableData }: any) => {
	return (
		<>
			<HeaderPage onClickByAdmin={onClickByAdmin} tableData={tableData} />
			<TableComponent
				columns={coloums}
				title="Product List"
				tableData={tableData}
				onDelete={onDelete}
				loading={loading}
				clickAction={onClickByAdmin}
				buttonTitle="Add Product"
				expandableRow={true}
			/>
		</>
	);
};
export default memo(ProductVariantListWeb);
