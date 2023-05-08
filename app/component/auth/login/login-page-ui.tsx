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
						<Input
							disabled={false}
							placeholder={"Email"}
							name={"email"}
							onChange={handleChange}
							valueProps={props}
							error={"email"}
							value={props.values.email}
						/>

						{props.values.email && !props.errors.email && (
							<div className={checkDiv}>
								<CheckCircle className={check} />
							</div>
						)}
						<Input
							placeholder={"Password"}
							name={"password"}
							onChange={handleChange}
							error="password"
							valueProps={props}
							type={!showPassword ? "text" : "password"}
							value={props.values.password}
							icon={
								<div className={checkDiv}>
									{showPassword ? (
										<VisibilityOffOutlined {...visibilityIconProps} />
									) : (
										<VisibilityOutlined {...visibilityIconProps} />
									)}
								</div>
							}
						/>
						{props.values.password && !props.errors.email && (
							<div className={checkDiv}>
								<CheckCircle className={check} />
							</div>
						)}
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
