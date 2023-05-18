import { IconButtons } from "@common/buttons";
import { customeSearch, flexTitleToolbar, flexToolbar } from "@css/styles";
import { CloudDownload, Print, FilterList, ViewColumn } from "@mui/icons-material";
import { cloudStyle, printStyle, filterStyle, titleStyle, columnStyle } from "@css/mui-styles";
import { downloadRowsAsCSV, getRowsToBeDownloaded, handlePrint } from "./custom-function";

export const CustomToolbar = ({
	selectedRows,
	data,
	columns,
	handleSearch,
	datatableTitle,
	title,
	clickAction
}: any) => {
	return (
		<div className={title ? flexTitleToolbar : flexToolbar}>
			<input placeholder="Search" onChange={(e) => handleSearch(e)} className={customeSearch} />
			{/* <IconButtons
				icon={<ViewColumn />}
				styles={columnStyle}
				lebel={<h6>View Columns</h6>}
				clickEvent={() => {}}
			/>
			<IconButtons
				icon={<CloudDownload />}
				styles={cloudStyle}
				lebel={<h6>CSV Export</h6>}
				clickEvent={() => downloadRowsAsCSV(getRowsToBeDownloaded(selectedRows, data), columns, datatableTitle)}
			/>
			<IconButtons clickEvent={handlePrint} icon={<Print />} styles={printStyle} lebel={<h6>Print</h6>} />
			<IconButtons icon={<FilterList />} styles={filterStyle} lebel={<h6>Filter</h6>} /> */}
			{title && <IconButtons clickEvent={clickAction} styles={titleStyle} lebel={<h6>{title}</h6>} />}
		</div>
	);
};
