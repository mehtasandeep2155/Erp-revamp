import CircularIntegration from "@common/loader";
import MUIDataTable from "mui-datatables";
import CustomFilterList from "./table-components";
import { ThemeProvider } from "@mui/material/styles";
import { getMuiTheme } from "./table-style";
import { CustomToolbar } from "./custom-toolbar";
import { TableCell, TableRow } from "@mui/material";
import { useState } from "react";
import TablePaginationComponent from "./pagination";
import { footerPage } from "@css/styles";
import { secondary100, white } from "@css/color-palette";

export default function TableComponent(props: any) {
	const { columns, tableData, title, loading, buttonTitle, clickAction } = props;
	const [page, setPage] = useState(1);
	const [rowsPerPage, setRowsPerPage] = useState(5);

	const handleChangePage = (event: any, newPage: any) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event: any) => {
		setRowsPerPage(event.target.value);
		setPage(0);
	};

	const options: object = {
		filterType: "radio",
		fixedSelectColumn: false,
		customRow: true,
		customRowRender: (tableData: any, index: any) => {
			return (
				<>
					{index < rowsPerPage && (
						<TableRow sx={{ background: index % 2 === 0 ? white : secondary100 }}>
							{tableData.map((item: any) => (
								<TableCell>{item}</TableCell>
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
			pagination: {
				next: <h1>next</h1>,
				previous: "Previous Page",
				rowsPerPage: "Rows per page:",
				displayRows: "of"
			},
			body: {
				noMatch: loading ? <CircularIntegration /> : "Sorry, there is no matching data to display"
			}
		},
		pagination: false,
		customFooter: () => {
			return (
				<>
					{tableData?.length > rowsPerPage ? (
						<TablePaginationComponent
							dataCount={tableData?.length}
							page={page}
							rowsPerPage={rowsPerPage}
							handleChangeRowsPerPage={handleChangeRowsPerPage}
							handleChangePage={handleChangePage}
						/>
					) : (
						<>
							<div className={footerPage}></div>
						</>
					)}
				</>
			);
		},
		rowsPerPageOptions: [5, 10, 15, 100],
		rowsPerPage: 5,
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
					title={title}
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
