import TableDetailsComponent from "@common/tables/details-table";
import { customerViewColums } from "@component/utils/form/constant";

export default function CustomerCard({ customerObj }: any) {
	return (
		<TableDetailsComponent
			title="Product Rate List"
			columns={customerViewColums}
			tableData={customerObj}
			loading={false}
			pagination={false}
		/>
	);
}
