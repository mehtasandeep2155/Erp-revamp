import LoginPage from "./login-page-ui";
import { LoginValues } from "@component/utils/form/initial-values";
import useSubmit from "@component/utils/form/submit";
import { memo } from "react";

const LoginPageWeb = () => {
	const { handleSubmitLogin, loader } = useSubmit();
	return <LoginPage values={LoginValues} submit={handleSubmitLogin} loader={loader} />;
};

export default memo(LoginPageWeb);
