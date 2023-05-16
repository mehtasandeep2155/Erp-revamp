import { useEffect, memo } from "react";
import { useValidation } from "@component/utils/form/validation";
import CompanyListWeb from "./comapnay-list-ui";
import useCompany from "./company-hook";
import { getCompany } from "@api/get-api-queries";

function CompanyList() {
	const { menu, onClick, companyValue, columns, allComapnyList, fetchagain, getAllCompanyList, tableData, loader } =
		useCompany();
	const { CompanySchema } = useValidation(companyValue);
	const { companies } = getCompany();

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
				allComapnyList={allComapnyList}
			/>
		</>
	);
}
export default memo(CompanyList);
