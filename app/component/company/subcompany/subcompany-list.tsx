import { useEffect, memo, useState } from "react";
import { useValidation } from "@component/utils/form/validation";
import CustomizedDialogs from "@common/dailog/dailog-model";
import AddSubCompany from "./add-subcompany";
import SubCompanyListWeb from "./subcompany-list-ui";
import useSubCompany from "./sub-company-hook";
import { getSubCompany } from "@api/get-api-queries";

function SubCompanyList() {
	const {
		getSubCompanyList,
		onClick,
		subCompanyValue,
		columns,
		tableData,
		menu,
		loader,
		fetchagain,
		page,
		rowsPerPage,
		handleChangePage,
		handleChangeRowsPerPage,
		totalCount
	} = useSubCompany();
	const { SubCompanySchema } = useValidation(subCompanyValue);
	const { subcompanies } = getSubCompany(page, rowsPerPage);
	

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
				page={page}
				rowsPerPage={rowsPerPage}
				handleChangePage={handleChangePage}
				totalCount={totalCount}
				handleChangeRowsPerPage={handleChangeRowsPerPage}
			/>
			<CustomizedDialogs
				title="Add Sub Company"
				isOpen={menu}
				width={"xs"}
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
