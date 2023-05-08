import { useEffect, memo } from "react";
import { useValidation } from "@component/utils/form/validation";
import CustomizedDialogs from "@common/dailog/dailog-model";
import AddSubCompany from "./add-subcompany";
import SubCompanyListWeb from "./subcompany-list-ui";
import useSubCompany from "./sub-company-hook";
import { getSubCompany } from "@api/get-api-queries";

function SubCompanyList() {
	const { getSubCompanyList, onClick, subCompanyValue, columns, tableData, menu, loader, fetchagain } =
		useSubCompany();
	const { SubCompanySchema } = useValidation(subCompanyValue);
	const { subcompanies } = getSubCompany();

	useEffect(() => {
		getSubCompanyList();
	}, [subcompanies.isLoading, fetchagain, subcompanies.isRefetching]);

	const handleDelete = async (id: string) => {};
	return (
		<>
			<SubCompanyListWeb
				tableData={tableData}
				columns={columns}
				onClickByAdmin={onClick}
				onDelete={handleDelete}
				loading={loader}
			/>
			<CustomizedDialogs
				title="Sub Company"
				isOpen={menu}
				handleClose={onClick}
				content={
					<AddSubCompany
						subCompanyValue={subCompanyValue}
						validation={SubCompanySchema}
						onClickByAdmin={onClick}
					/>
				}
			/>
		</>
	);
}
export default memo(SubCompanyList);
