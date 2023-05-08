import ForgettPassword from "./forgot-password";
import { ForgettPasswordValues } from "@component/utils/form/initial-values";
import { memo } from "react";

const ForgettPasswordPageWeb = () => {
	return <ForgettPassword values={ForgettPasswordValues} />;
};

export default memo(ForgettPasswordPageWeb);
