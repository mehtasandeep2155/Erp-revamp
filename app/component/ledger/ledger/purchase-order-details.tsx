import TableDetailsComponent from "@common/tables/details-table";
import { poColumsSelect } from "@component/utils/form/constant";

export default function PurchaseOrderDetails({ poDetailsobj }: any) {
	return (
		<TableDetailsComponent
			title="Purchase Order Details"
			columns={poColumsSelect}
			tableData={poDetailsobj}
			loading={false}
			pagination={false}
		/>
	);
}
