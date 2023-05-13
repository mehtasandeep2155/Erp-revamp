import { check, checkDiv } from "./styles";
import { Form, Formik } from "formik";
import { CheckCircle } from "@mui/icons-material/";
import { Input } from "@component/utils/form-fields";
import { ForgetPaasWordPassword } from "@component/utils/type/interfaces";
import useSubmit from "@component/utils/form/submit";
import useHandleChange from "@component/utils/form/handle-change";
import { memo } from "react";
import { useValidation } from "@component/utils/form/validation";
import Layout from "../layout";
import { IconButtons } from "@common/buttons";
import { authButton } from "../login/styles";
import BottomLoginDiv from "@common/bottom-login";
import { signUpFormik } from "../login/styles";
import { login } from "@component/utils/routes";
import { formControlAuth, formGroup, inputError } from "@css/styles";

const ForgettPassword = (data: ForgetPaasWordPassword) => {
	const { values } = data;
	const { ForgettPasswordSchema } = useValidation(values);
	const { handleChange } = useHandleChange("", "");
	const { handleSubmitForgettPassword } = useSubmit();

	return (
		<Layout title="Forget Password" subTitle="Enter your email and we will send you a link to reset your password">
			<Formik
				initialValues={values}
				validationSchema={ForgettPasswordSchema}
				onSubmit={handleSubmitForgettPassword}
			>
				{(props) => (
					<Form className={signUpFormik}>
						<Input
							disabled={false}
							placeholder={"Email"}
							name={"email"}
							onChange={handleChange}
							valueProps={props}
							error={"email"}
							formGroupStyle={formGroup}
							inputStyle={props.touched["email"] && props.errors["email"] ? inputError : formControlAuth}
						/>
						{props.values.email && !props.errors.email && (
							<div className={checkDiv}>
								<CheckCircle className={check} />
							</div>
						)}
						<IconButtons styles={authButton} lebel="Submit" type="submit" />
					</Form>
				)}
			</Formik>
			<BottomLoginDiv title={""} routeText={"Back to Sign In"} route={login} />
		</Layout>
	);
};

export default memo(ForgettPassword);
