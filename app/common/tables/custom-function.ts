export const saveCsvStringAsFile = (csvString: any, fileName: any) => {
	const url = window.URL.createObjectURL(new Blob([csvString]));
	const link = document.createElement("a");
	link.href = url;
	link.setAttribute("download", `${fileName.replace(" ", "")}.csv`);
	document.body.appendChild(link);
	link.click();
	link.parentNode.removeChild(link);
};

export const getCsvStringFromArrayOfStrings = (columns: any, data: any) => {
	const csvHeader = columns.map((column: any) => `"${column.label}"`).join();
	const csvBody = data
		.map((row: any) => row.map((cell: any) => (cell !== null ? `"${cell}"` : '""')).join())
		.join("\n");
	return `${csvHeader}\n${csvBody}`;
};

export const getRowsToBeDownloaded = (selectedRows: any, data: any) => {
	return selectedRows;
};

export const downloadRowsAsCSV = (rows: any, columns: any, fileName: any) => {
	const csvString = getCsvStringFromArrayOfStrings(columns, rows);
	saveCsvStringAsFile(csvString, fileName);
};

export function handlePrint() {
	var printContents = document.getElementById("table").innerHTML;
	document.body.innerHTML = printContents;
	window.print();
}
