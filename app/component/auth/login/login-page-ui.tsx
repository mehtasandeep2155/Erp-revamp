import { CheckCircle, VisibilityOutlined, VisibilityOffOutlined } from "@mui/icons-material";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import { Input } from "@component/utils/form-fields";
import { LoginProps } from "@component/utils/type/interfaces";
import { check, checkDiv, forgett, showPassErr, authButton } from "./styles";
import BottomLoginDiv from "@common/bottom-login";
import useHandleChange from "@component/utils/form/handle-change";
import { memo, useState } from "react";
import { signUp } from "@component/utils/routes";
import { useValidation } from "@component/utils/form/validation";
import { IconButtons } from "@common/buttons";
import Layout from "../layout";
import { signUpFormik } from "../login/styles";
import { formControl, formControlAuth, formGroup, inputError } from "@css/styles";
import { loginFormikFieldsData } from "@component/utils/helper";
import { usePasswordVisibility } from "../password-visibility-hook";

const LoginPage = (data: LoginProps) => {
	const { handleChange } = useHandleChange("", "");
	const { values, submit, loader } = data;
	const { LoginSchema } = useValidation(values);
	const { push } = useRouter();
	const { showPassword, visibilityIconProps } = usePasswordVisibility();

	return (
		<Layout title="Login to Your Account" subTitle="Enter your credentials to continue">
			<Formik initialValues={values} validationSchema={LoginSchema} onSubmit={submit}>
				{(props) => (
					<Form className={signUpFormik}>
						{loginFormikFieldsData.map(({ placeholder, name, icon }: any) => (
							<>
								<Input
									disabled={false}
									placeholder={placeholder}
									name={name}
									onChange={handleChange}
									valueProps={props}
									error={name}
									value={props.values[name]}
									formGroupStyle={formGroup}
									type={name !== name ? "text" : showPassword ? "text" : name}
									inputStyle={
										props.touched[name] && props.errors[name] ? inputError : formControlAuth
									}
									icon={
										icon ? (
											<div className={checkDiv}>
												{showPassword ? (
													<VisibilityOffOutlined {...visibilityIconProps} />
												) : (
													<VisibilityOutlined {...visibilityIconProps} />
												)}
											</div>
										) : null
									}
								/>
							</>
						))}
						<p
							className={forgett}
							onClick={() => {
								push("/user-login/forgot-password");
							}}
						>
							Forgot Password?
						</p>
						<IconButtons styles={authButton} lebel="Login" s type="submit" />
					</Form>
				)}
			</Formik>
			<BottomLoginDiv title={"Don't have Account?"} routeText={"Register"} route={signUp} />
		</Layout>
	);
};

export default memo(LoginPage);
