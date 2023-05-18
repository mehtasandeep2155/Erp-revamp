import { Form, Formik } from "formik";
import { Input, AutocompleteInput } from "@component/utils/form-fields";
import { VerifyUserProps } from "@component/utils/type/interfaces";
import { verifyUserForm, loginBtn, formControlVerify, formGroupProduct, iconVerify } from "@css/styles";
import { btnDiv } from "@component/auth/login/styles";
import useHandleChange from "@component/utils/form/handle-change";
import { memo, useState } from "react";
import SimpleTable from "@common/tables/simple-table";
import { useValidation } from "@component/utils/form/validation";
import { usePasswordVisibility } from "@component/auth/password-visibility-hook";
import { VisibilityOffOutlined, VisibilityOutlined } from "@mui/icons-material";

const VerifyUserForm = (props: VerifyUserProps) => {
	const [moduleList, setModuleList] = useState<any>([]);
	const { handleChange } = useHandleChange(moduleList, setModuleList);
	const { userdetails, submit, Members } = props;
	const { VerifySchema } = useValidation(userdetails);
	const { showPassword, visibilityIconProps } = usePasswordVisibility();

	return (
		<div className={verifyUserForm}>
			<Formik initialValues={userdetails} validationSchema={VerifySchema} onSubmit={submit}>
				{(props) => (
					<Form>
						<h4>{userdetails.id ? "Upadate User" : "Add User"}</h4>
						<Input
							disabled={userdetails.id && true}
							placeholder={"Enter User Name"}
							name={"name"}
							onChange={handleChange}
							label={"Name"}
							valueProps={props}
							error={"name"}
							value={props.values.name}
							inputStyle={formControlVerify}
						/>
						<Input
							disabled={userdetails.id && true}
							placeholder={"Enter a Email address"}
							name={"email"}
							onChange={handleChange}
							label={"Email"}
							valueProps={props}
							error={"email"}
							value={props.values.email}
							inputStyle={formControlVerify}
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
							formGroup={formGroupProduct}
						/>
						{!userdetails.id && (
							<>
								<Input
									disabled={userdetails.id && true}
									placeholder={"Enter a Password"}
									name={"password"}
									onChange={handleChange}
									label={"Password"}
									valueProps={props}
									error={"password"}
									type={showPassword ? "text" : "password"}
									value={props.values.password}
									inputStyle={formControlVerify}
									icon={
										<div className={iconVerify}>
											{showPassword ? (
												<VisibilityOutlined {...visibilityIconProps} />
											) : (
												<VisibilityOffOutlined {...visibilityIconProps} />
											)}
										</div>
									}
								/>
							</>
						)}
						<SimpleTable controls={moduleList} valueProps={props} modules={props.values} />
						{/* <FormControlLabel
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
							label="Verify User"
							defaultChecked={props.values.verifyUser}
							checked={props.values.verifyUser}
							onChange={(e) => handleChange(e, props, "", "")}
							name={"verifyUser"}
						/> */}
						<div className={btnDiv}>
							<button className={loginBtn} type="submit">
								{userdetails.id ? "Update" : "Create User"}
							</button>
						</div>
					</Form>
				)}
			</Formik>
		</div>
	);
};

export default memo(VerifyUserForm);
