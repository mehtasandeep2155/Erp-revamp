import CircularIntegration from "@common/loader";
import MUIDataTable from "mui-datatables";
import CustomFilterList from "./table-components";
import { ThemeProvider } from "@mui/material/styles";
import { getMuiTheme } from "./table-style";
import { CustomToolbar } from "./custom-toolbar";
import { TableCell, TableRow } from "@mui/material";
import TablePaginationComponent from "./pagination";
import { footerPage } from "@css/styles";
import { secondary100, white } from "@css/color-palette";
import { YourPurchaseOrderTable } from "./collapsible-table";

export default function TableComponent(props: any) {
	const {
		columns,
		tableData,
		innertitle,
		page,
		rowsPerPage,
		handleChangeRowsPerPage,
		title,
		loading,
		buttonTitle,
		totalCount,
		tableInnerData,
		handleChangePage,
		clickAction,
		tableInnerHead,
		iconAt,
		expandable
	} = props;

	const options: object = {
		filterType: "checkbox",
		fixedSelectColumn: false,
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
		selectableRows: false,
		search: false,
		download: false,
		print: false,
		viewColumns: false,
		filter: false,
		textLabels: {
			body: {
				noMatch: loading ? <CircularIntegration /> : "Sorry, there is no matching data to display"
			}
		},
		pagination: false,
		customFooter: () => {
			return (
				<>
					<TablePaginationComponent
						dataCount={totalCount}
						page={page}
						rowsPerPage={rowsPerPage}
						handleChangeRowsPerPage={handleChangeRowsPerPage}
						handleChangePage={handleChangePage}
					/>
				</>
			);
		},
		responsive: "vertical",
		customToolbar: () => (
			<CustomToolbar
				selectedRows={tableData}
				data={tableData}
				columns={columns}
				datatableTitle={title}
				title={buttonTitle}
				clickAction={() => clickAction(tableData, "open")}
			/>
		),
		toolbar: false
	};

	return (
		<ThemeProvider theme={getMuiTheme()}>
			<div id="table">
				<MUIDataTable
					title={title ? title : false}
					data={tableData}
					columns={columns}
					options={options}
					components={{
						TableFilterList: CustomFilterList
					}}
				/>
			</div>
		</ThemeProvider>
	);
}
