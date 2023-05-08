import ProductCardComponent from "@common/card-component";
import TableDetailsComponent from "@common/tables/details-table";
import { rateColumsView } from "@component/utils/form/constant";
import { productText, productCardDiv } from "@css/styles";
import { memo, useState } from "react";
function ProductView({ products }: any) {
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
