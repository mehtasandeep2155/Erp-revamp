import ProductCardComponent from "@common/card-component";
import TableDetailsComponent from "@common/tables/details-table";
import { rateColumsView } from "@component/utils/form/constant";
import { productText, productCardDiv } from "@css/styles";
import { memo, useState } from "react";
function ProductView({ data }: any) {
	return (
		<TableDetailsComponent
			title="Product Rate List"
			columns={rateColumsView}
			tableData={["rate", "data"]}
			loading={false}
			pagination={false}
		/>
	);
}

export default memo(ProductView);
