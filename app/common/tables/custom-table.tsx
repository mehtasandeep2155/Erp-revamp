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
import { YourPurchaseOrderTable } from "./collapsible-table";

export default function TableComponent(props: any) {
	const {
		columns,
		tableData,
		innertitle,
		title,
		loading,
		buttonTitle,
		tableInnerData,
		clickAction,
		tableInnerHead,
		iconAt,
		expandable,
	} = props;
	const [page, setPage] = useState(1);
	const [rowsPerPage, setRowsPerPage] = useState(5);

	const handleChangePage = (event: any, newPage: any) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event: any) => {
		setRowsPerPage(event.target.value);
	};

	const options: object = {
		filterType: "checkbox",
		fixedSelectColumn: false,
		customRow: true,
		customRowRender: (tableData: any, index: any) => {
			return (
				<>
					{index < page * rowsPerPage ? (
						expandable ? (
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
						)
					) : null}
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
		rowsPerPage: [5],
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
