import CircularIntegration from "@common/loader";
import MUIDataTable from "mui-datatables";
import CustomFilterList from "./table-components";
import { ThemeProvider } from "@mui/material/styles";
import { getMuiTheme } from "./table-style";
import { TableCell, TableRow } from "@mui/material";
import { secondary100, white } from "@css/color-palette";
import { YourPurchaseOrderTable } from "./collapsible-table";

export default function TableDetailsComponent(props: any) {
	const {
		columns,
		tableData,
		onRowClick,
		innertitle,
		expandable,
		loading,
		tableInnerHead,
		tableInnerData,
		iconAt,
		pagination
	} = props;
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
		customRow: true,
		customRowRender: (tableData: any, index: any) => {
			return (
				<>
					{expandable ? (
						<YourPurchaseOrderTable
							rows={tableData}
							tableInnerData={tableInnerData}
							iconAt={iconAt}
							tableInnerHead={tableInnerHead}
							title={innertitle}
							index={index}
						/>
					) : (
						<TableRow sx={{ background: index % 2 === 0 ? white : secondary100 }}>
							{tableData.map((item: any) => (
								<TableCell sx={{ width: "100px" }}>{item}</TableCell>
							))}
						</TableRow>
					)}
				</>
			);
		},
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
