import { HeaderPage } from "@component/commoncomponent/common-components";
import TableComponent from "common/tables/custom-table";
import { memo } from "react";
import AddProductVariant from "./add-product-ui";

const ProductVariantListWeb = (props: any) => {
	const { coloums, onClickByAdmin, onDelete, loading, tableData, isOpen, tableDataSelect, variantvalues } = props;

	return (
		<>
			<HeaderPage onClickByAdmin={onClickByAdmin} tableData={tableData} />
			{!isOpen ? (
				<TableComponent
					columns={coloums}
					title="Product List"
					tableData={tableData}
					onDelete={onDelete}
					loading={loading}
					buttonTitle="Add Product"
					clickAction={onClickByAdmin}
				/>
			) : (
				<AddProductVariant
					tableDataSelect={tableDataSelect}
					variantvalues={variantvalues}
					onClickByAdmin={onClickByAdmin}
				/>
			)}
		</>
	);
};
export default memo(ProductVariantListWeb);
