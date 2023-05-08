import TableDetailsComponent from "@common/tables/details-table";
import useConstant from "@component/utils/form/constant";

export default function PurchaseOrderDetails({ poDetailsobj }: any) {
	const { poColumsSelect } = useConstant();
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
