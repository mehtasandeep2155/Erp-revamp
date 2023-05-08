import { getVisibilityIconProps } from "@component/utils/helper";
import { useState } from "react";

export const usePasswordVisibility = () => {
	const [showPassword, setShowPassword] = useState(false);
	const visibilityIconProps = getVisibilityIconProps(setShowPassword, showPassword);

	return {
		showPassword,
		visibilityIconProps
	};
};
