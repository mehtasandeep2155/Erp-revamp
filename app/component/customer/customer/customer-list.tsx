import { useEffect, memo } from "react";
import { useValidation } from "@component/utils/form/validation";
import CustomizedDialogs from "@common/dailog/dailog-model";
import CompanyListWeb from "./customer-list-ui";
import AddCustomer from "./add-customer";
import useCompany from "./customer-hook";
import { getCustomer } from "@api/get-api-queries";

function CompanyList() {
	const { menuCustomer, onClick, customerValue, columns, fetchagain, getAllCompanyList, tableData, loader } =
		useCompany();
	const { customerlists } = getCustomer();
	const { CompanySchema } = useValidation(customerValue);

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
			/>
		</>
	);
}
export default memo(CompanyList);
