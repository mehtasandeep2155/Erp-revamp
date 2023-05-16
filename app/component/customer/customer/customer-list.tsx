import { useEffect, memo } from "react";
import CompanyListWeb from "./customer-list-ui";
import useCompany from "./customer-hook";
import { getCustomer } from "@api/get-api-queries";

function CompanyList() {
	const {
		menuCustomer,
		onClick,
		customerValue,
		columns,
		fetchagain,
		getAllCompanyList,
		tableData,
		loader,
		totalCount,
		page,
		rowsPerPage,
		handleChangePage,
		handleChangeRowsPerPage
	} = useCompany();
	const { customerlists } = getCustomer(page, rowsPerPage);

	useEffect(() => {
		getAllCompanyList();
	}, [customerlists.isLoading, fetchagain, customerlists.isRefetching]);

	const handleDelete = async (id: string) => {};
	return (
		<>
			<CompanyListWeb
				tableData={tableData}
				columns={columns}
				onClickByAdmin={onClick}
				onDelete={handleDelete}
				loading={loader}
				isOpen={menuCustomer}
				page={page}
				rowsPerPage={rowsPerPage}
				totalCount={totalCount}
				handleChangePage={handleChangePage}
				handleChangeRowsPerPage={handleChangeRowsPerPage}
				customerValue={customerValue}
			/>
		</>
	);
}
export default memo(CompanyList);
