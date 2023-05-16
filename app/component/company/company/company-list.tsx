import { useEffect, memo } from "react";
import { useValidation } from "@component/utils/form/validation";
import CompanyListWeb from "./comapnay-list-ui";
import useCompany from "./company-hook";
import { getCompany } from "@api/get-api-queries";

function CompanyList() {
	const {
		menu,
		onClick,
		companyValue,
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
	const { CompanySchema } = useValidation(companyValue);
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
				companyValue={companyValue}
			/>
		</>
	);
}
export default memo(CompanyList);
