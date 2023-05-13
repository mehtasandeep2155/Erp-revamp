import { useEffect, useState } from "react";
import TablePagination from "@mui/material/TablePagination";
import { Pagination } from "@mui/material";

export default function TablePaginationComponent({
	dataCount,
	data,
	page,
	handleChangePage,
	rowsPerPage,
	handleChangeRowsPerPage
}: any) {
	const [domLoaded, setDomLoaded] = useState(false);

	useEffect(() => {
		setDomLoaded(true);
	}, []);
	return (
		<>
			{domLoaded && (
				<TablePagination
					component="div"
					count={dataCount}
					page={page}
					sx={{ width: "100%" }}
					onPageChange={handleChangePage}
					rowsPerPageOptions={[5, 10, 15, 25, 50, 100]}
					rowsPerPage={rowsPerPage}
					onRowsPerPageChange={handleChangeRowsPerPage}
					labelDisplayedRows={({ from, to, count }) =>
						`Results: ${from - rowsPerPage}-${rowsPerPage} of ${count}`
					}
					ActionsComponent={() => {
						return (
							<Pagination
								defaultPage={1}
								count={Math.floor(dataCount / rowsPerPage) + 1}
								onChange={handleChangePage}
								page={page}
							></Pagination>
						);
					}}
				/>
			)}
		</>
	);
}
