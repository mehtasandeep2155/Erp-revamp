import { memo } from "react";
import ResetPassword from "./reset-password";
import { resetPasswordValues } from "@component/utils/form/initial-values";
import useHandleChange from "@component/utils/form/handle-change";
import useSubmit from "@component/utils/form/submit";

const ResetPasswordPageWeb = () => {
	const { handleChange } = useHandleChange("", "");
	const { handleResetPassword, loader } = useSubmit();

	return (
		<ResetPassword
			values={resetPasswordValues}
			submit={handleResetPassword}
			handleChange={handleChange}
			loader={loader}
		/>
	);
};

export default memo(ResetPasswordPageWeb);
