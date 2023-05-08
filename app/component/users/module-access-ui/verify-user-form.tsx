import { Form, Formik } from "formik";
import { Input, AutocompleteInput } from "@component/utils/form-fields";
import { VerifyUserProps } from "@component/utils/type/interfaces";
import { verifyForm, loginBtn } from "@css/styles";
import { btnDiv } from "@component/auth/login/styles";
import useHandleChange from "@component/utils/form/handle-change";
import { memo, useEffect, useState } from "react";
import useVerification from "./verify-user-hook";
import { Checkbox, FormControlLabel } from "@mui/material";
import SimpleTable from "@common/tables/simple-table";
import { useValidation } from "@component/utils/form/validation";
import { getCompany } from "@api/get-api-queries";
import { pelorous } from "@css/color-palette";

const VerifyUserForm = (props: VerifyUserProps) => {
	const [moduleList, setModuleList] = useState<any>([]);
	const { handleChange } = useHandleChange(moduleList, setModuleList);
	const { userdetails, submit, Members } = props;
	const { companies } = getCompany();
	const { companyList, getCompanyList } = useVerification();
	const { VerifySchema } = useValidation(userdetails);

	useEffect(() => {
		getCompanyList();
	}, [companies.isLoading]);

	return (
		<div className={verifyForm}>
			<Formik initialValues={userdetails} validationSchema={VerifySchema} onSubmit={submit}>
				{(props) => (
					<Form>
						<Input
							disabled={true}
							placeholder={"Enter a Email address"}
							name={"email"}
							onChange={handleChange}
							label={"Email"}
							valueProps={props}
							error={"email"}
							value={props.values.email}
						/>
						<AutocompleteInput
							options={companyList}
							onChange={handleChange}
							error="companyName"
							name="companyName"
							value={props.values.company ? props.values.company.name : props.values.companyName}
							valueProps={props}
							label={"Company Name"}
							placeholder={"Select a USer Company Name"}
						/>
						<AutocompleteInput
							options={Members}
							onChange={handleChange}
							error="role"
							name="role"
							value={props.values.role}
							valueProps={props}
							label={"User Role"}
							placeholder={"Select a USer Role"}
						/>
						<SimpleTable controls={moduleList} valueProps={props} modules={props.values} />
						<FormControlLabel
							control={
								<Checkbox
									sx={{
										color: pelorous,
										"&.Mui-checked": {
											color: pelorous
										}
									}}
								/>
							}
							sx={{ fontSize: "14px" }}
							label="Is User Verified"
							defaultChecked={props.values.verifyUser}
							checked={props.values.verifyUser}
							onChange={(e) => handleChange(e, props, "", "")}
							name={"verifyUser"}
						/>
						<div className={btnDiv}>
							<button className={loginBtn} type="submit">
								Update
							</button>
						</div>
					</Form>
				)}
			</Formik>
		</div>
	);
};

export default memo(VerifyUserForm);
