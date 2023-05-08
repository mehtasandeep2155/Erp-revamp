import { userNavObject } from "@component/utils/helper";
import { useEffect, useState } from "react";

export const userRole = () => {
	const [moduleAccess, setModulesAccess] = useState<string[]>([]);

	useEffect(() => {
		let localData = JSON.parse(localStorage.getItem("userdata"));
		if (localData) {
			setModulesAccess(
				userNavObject[localData.user.role.match(/^(Admin|SuperAdmin)$/)[0] || "Default"]([], localData)
			);
		}
	}, []);
	return {
		moduleAccess
	};
};
