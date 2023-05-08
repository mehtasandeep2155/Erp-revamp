import CircularIntegration from "@common/loader";
import MUIDataTable from "mui-datatables";
import CustomFilterList from "./table-components";
import { ThemeProvider } from "@mui/material/styles";
import { getMuiTheme } from "./table-style";

export default function TableDetailsComponent(props: any) {
	const { columns, tableData, onRowClick, loading, pagination } = props;
	const options: object = {
		filterType: "checkbox",
		search: false,
		download: false,
		print: false,
		viewColumns: false,
		filter: false,
		selectableRows: false,
		textLabels: {
			body: {
				noMatch: loading ? <CircularIntegration /> : "Sorry, there is no matching data to display"
			}
		},
		onRowClick: onRowClick,
		pagination: pagination,
		rowsPerPageOptions: [5, 10, 15, 100],
		rowsPerPage: 5,
		responsive: "vertical",
		title: false
	};

	return (
		<ThemeProvider theme={getMuiTheme()}>
			<MUIDataTable
				title={false}
				data={tableData}
				columns={columns}
				options={options}
				components={{
					TableFilterList: CustomFilterList
				}}
			/>
		</ThemeProvider>
	);
}
