import CollapsibleTable from "@common/tables/collapsible-table";
import TableComponent from "@common/tables/custom-table";
import { HeaderPage } from "@component/commoncomponent/common-components";
import { yourPurchaseOrderInnerHead, rateColums } from "@component/utils/form/constant";
import { memo } from "react";

const ProductVariantListWeb = ({ coloums, onClickByAdmin, onDelete, loading, tableInnerData, tableData }: any) => {
	return (
		<>
			<HeaderPage onClickByAdmin={onClickByAdmin} tableData={tableData} />
			<TableComponent
				columns={coloums}
				title="Product List"
				tableData={tableData}
				onDelete={onDelete}
				expandable={true}
				loading={loading}
				tableHead={rateColums}
				tableInnerHead={yourPurchaseOrderInnerHead}
				tableInnerData={tableInnerData}
				clickAction={onClickByAdmin}
				buttonTitle="Add Product"
				expandableRow={true}
				iconAt={1}
				innertitle={"Products Details"}
			/>
		</>
	);
};
export default memo(ProductVariantListWeb);
