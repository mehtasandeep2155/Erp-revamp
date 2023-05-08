import { Form, Formik } from "formik";
import { CheckCircle, VisibilityOffOutlined, VisibilityOutlined } from "@mui/icons-material/";
import { Input } from "@component/utils/form-fields";
import { ResetPassword } from "@component/utils/type/interfaces";
import { memo } from "react";
import { useValidation } from "@component/utils/form/validation";
import Layout from "../layout";
import { authButton, check, checkDiv, showPassErr } from "../login/styles";
import BottomLoginDiv from "@common/bottom-login";
import { signUpFormik } from "../login/styles";
import { IconButtons } from "@common/buttons";
import { usePasswordVisibility } from "../password-visibility-hook";

const ResetPassword = (data: ResetPassword) => {
	const { values, submit, handleChange } = data;
	const { SignUpSchema } = useValidation(values);
	const { showPassword, visibilityIconProps } = usePasswordVisibility();

	return (
		<Layout
			title="Reset Password"
			subTitle="Enter new password for account:
        admin@gmail.com"
		>
			<Formik initialValues={values} validationSchema={SignUpSchema} onSubmit={submit}>
				{(props) => (
					<Form className={signUpFormik}>
						<Input
							placeholder={"Password"}
							name={"password"}
							onChange={handleChange}
							error={"password"}
							valueProps={props}
							type={showPassword ? "text" : "password"}
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
						{props.values.password && (
							<div className={checkDiv}>
								<CheckCircle className={check} />
							</div>
						)}
						<Input
							placeholder={"Enter confirm Password"}
							name={"confirmPassword"}
							onChange={handleChange}
							error="confirmPassword"
							valueProps={props}
							type={showPassword ? "text" : "password"}
						/>
						<IconButtons styles={authButton} lebel="Reset" type="submit" />
						<BottomLoginDiv title={""} routeText={"Resend the code ?"} route={""} />
					</Form>
				)}
			</Formik>
		</Layout>
	);
};

export default memo(ResetPassword);
