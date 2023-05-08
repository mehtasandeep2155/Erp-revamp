import { useEffect, memo } from "react";
import { useValidation } from "@component/utils/form/validation";
import CustomizedDialogs from "@common/dailog/dailog-model";
import CompanyListWeb from "./comapnay-list-ui";
import AddCompany from "./add-company";
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
			<CustomizedDialogs
				title="Company"
				isOpen={menu}
				handleClose={onClick}
				content={<AddCompany comapnyValue={companyValue} validation={CompanySchema} onClickByAdmin={onClick} />}
			/>
		</>
	);
}
export default memo(CompanyList);
