import TableComponent from "@common/tables/custom-table";
import TableDetailsComponent from "@common/tables/details-table";
import { customerViewColums } from "@component/utils/form/constant";

export default function CustomerCard({ customerObj }: any) {
	return (
		<TableComponent
			title="Branch List"
			tableData={["name", "email", "phone"]}
			columns={customerViewColums}
			onDelete={() => {}}
			loading={false}
			buttonTitle="Add Branch"
		/>
	);
}
