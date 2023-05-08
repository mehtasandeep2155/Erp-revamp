import { CheckCircle, VisibilityOffOutlined, VisibilityOutlined } from "@mui/icons-material";
import { Form, Formik } from "formik";
import { Input, Button } from "@component/utils/form-fields";
import { SignUpProps } from "@component/utils/type/interfaces";
import BottomLoginDiv from "@common/bottom-login";
import { useState, memo } from "react";
import { login } from "@component/utils/routes";
import { useValidation } from "@component/utils/form/validation";
import { IconButtons } from "@common/buttons";
import { authButton, checkDiv } from "../login/styles";
import Layout from "../layout";
import { signUpFormik } from "../login/styles";
import { signUpFormikFieldsData } from "@component/utils/helper";
import { usePasswordVisibility } from "../password-visibility-hook";

const SignUpPage = (data: SignUpProps) => {
	const { values, submit, handleChange } = data;
	const { SignUpSchema } = useValidation(values);
	const { showPassword, visibilityIconProps } = usePasswordVisibility();

	return (
		<Layout title="Sign Up Your Account" subTitle="Enter your credentials to continue">
			<Formik initialValues={values} validationSchema={SignUpSchema} onSubmit={submit}>
				{(props) => (
					<Form className={signUpFormik}>
						{signUpFormikFieldsData.map(({ placeholder, name, error, icon, type }: any) => (
							<Input
								key={name}
								placeholder={placeholder}
								name={name}
								onChange={handleChange}
								error={error}
								valueProps={props}
								type={type !== "password" ? "text" : showPassword ? "text" : "password"}
								icon={
									icon ? (
										<div className={checkDiv}>
											{showPassword ? (
												<VisibilityOutlined {...visibilityIconProps} />
											) : (
												<VisibilityOffOutlined {...visibilityIconProps} />
											)}
										</div>
									) : null
								}
							/>
						))}
						<IconButtons styles={authButton} lebel="Register" type="submit" />
						<BottomLoginDiv title="Already have An Account ?" routeText="Login" route={login} />
					</Form>
				)}
			</Formik>
		</Layout>
	);
};
export default memo(SignUpPage);
