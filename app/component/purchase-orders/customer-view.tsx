import TableDetailsComponent from "@common/tables/details-table";
import useConstant from "@component/utils/form/constant";

export default function CustomerCard({ customerObj }: any) {
	const { customerViewColums } = useConstant();
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
