import { useState, memo } from "react";
import VerifyUserForm from "@component/users/module-access-ui/verify-user-form";
import { VerifyUserWebProps } from "@component/utils/type/interfaces";
import useHandleChange from "@component/utils/form/handle-change";
import { members, moduleAccess } from "@component/utils/form/constant";
import { useValidation } from "@component/utils/form/validation";
import { companyNames } from "@component/utils/form/constant";

const VerifyUserFormWeb = (props: VerifyUserWebProps) => {
	const { onClick } = props;
	const [moduleList, setModuleList] = useState([]);
	const [userdetails, setuserDetails] = useState<any>(props.userdetails);
	const [companyList, setCompanyList] = useState(props.userdetails.sub_companies);
	const [ModuleName, setModuleName] = useState<any>([]);
	const { handleChange } = useHandleChange(moduleList, setModuleList);
	const { VerifySchema } = useValidation(userdetails);

	const handleSubmitVerify = (values: any) => {
		const castValues = VerifySchema.cast(values);
		setuserDetails(castValues);
		onClick(castValues, "submit");
	};

	const handleDelete = (id: any, type: string) => {
		if (type == "module") {
			setModuleList(moduleList.filter((item) => item != id));
			setModuleName(ModuleName.filter((item: any) => item != id.name));
		}
		if (type == "controls") {
			moduleList.map((item, index) => {
				let data = moduleList[index]["controls"].filter((filterValue: string) => filterValue != id);
				moduleList[index]["controls"] = data;
			});
		}
		if (type == "company") {
			setCompanyList(companyList.filter((item: any) => item != id));
		}
	};

	return (
		<VerifyUserForm
			submit={handleSubmitVerify}
			onChange={handleChange}
			modulearray={moduleList}
			handleDelete={handleDelete}
			userdetails={userdetails}
			companyList={companyList}
			modules={moduleAccess}
			companyNames={companyNames}
			Members={members}
			onClose={onClick}
		/>
	);
};

export default memo(VerifyUserFormWeb);
