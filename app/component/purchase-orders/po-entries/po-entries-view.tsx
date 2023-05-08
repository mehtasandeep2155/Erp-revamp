import ProductCardComponent from "@common/card-component";
import TableDetailsComponent from "@common/tables/details-table";
import useConstant from "@component/utils/form/constant";
import { productText, productCardDiv } from "@css/styles";
import { memo, useState } from "react";
function ProductView({ products }: any) {
	const { rateColumsView } = useConstant();
	return (
		<TableDetailsComponent
			title="Product Rate List"
			columns={rateColumsView}
			tableData={products}
			loading={false}
			pagination={false}
		/>
	);
}

export default memo(ProductView);
