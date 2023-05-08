import SignUpPage from "./signup-page";
import { signUpValues } from "@component/utils/form/initial-values";
import useSubmit from "@component/utils/form/submit";
import useHandleChange from "@component/utils/form/handle-change";
import { memo } from "react";

const SignUpPageWeb = () => {
	const { handleChange } = useHandleChange("", "");
	const { handleSubmitSignUp, loader } = useSubmit();

	return <SignUpPage values={signUpValues} submit={handleSubmitSignUp} handleChange={handleChange} loader={loader} />;
};

export default memo(SignUpPageWeb);
