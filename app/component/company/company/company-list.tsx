import { useEffect, memo } from "react";
import CompanyListWeb from "./comapnay-list-ui";
import useCompany from "./company-hook";
import { getCompany } from "@api/get-api-queries";

function CompanyList() {
	const {
		onClick,
		page,
		rowsPerPage,
		columns,
		allComapnyList,
		fetchagain,
		getAllCompanyList,
		handleChangePage,
		handleChangeRowsPerPage,
		tableData,
		loader,
		totalCount
	} = useCompany();

	const { companies } = getCompany(page, rowsPerPage);

	useEffect(() => {
		getAllCompanyList();
	}, [companies.isLoading, fetchagain, companies.isRefetching]);

	const handleDelete = async (id: string) => {};
	return (
		<>
			<CompanyListWeb
				tableData={tableData}
				columns={columns}
				onClickByAdmin={onClick}
				onDelete={handleDelete}
				loading={loader}
				handleChangeRowsPerPage={handleChangeRowsPerPage}
				handleChangePage={handleChangePage}
				page={page}
				rowsPerPage={rowsPerPage}
				totalCount={totalCount}
				allComapnyList={allComapnyList}
			/>
		</>
	);
}
export default memo(CompanyList);
