import { navListObject } from "@component/navbar/navlist";
import { adminModules, superAdminModules } from "./form/constant";
import { Dispatch, SetStateAction } from "react";
import { showPassErr } from "@component/auth/login/styles";

const isMenuItemSelected = (pathName: any, title: string) => {
	let flag;
	const res = navListObject.filter((item: any) => item.title === title);

	res?.[0]?.children?.map((item: any) => {
		if (item.route === pathName) return (flag = true);
		item?.children?.map((nestedItem: any) => {
			if (nestedItem.route === pathName) return (flag = true);
		});
	});
	return flag;
};

const signUpFormikFieldsData = [
	{ placeholder: "Company Name", name: "companyName", error: "companyName" },
	{ placeholder: "Name", name: "name", error: "name" },
	{ placeholder: "Email", name: "email", error: "email" },
	{ placeholder: "Password", name: "password", error: "password", icon: "true", type: "password" },
	{ placeholder: "Confirm Password", name: "confirmPassword", error: "confirmPassword", type: "password" }
];

const userNavObject: any = {
	Admin: (moduleArr: string[]) => moduleArr.concat(adminModules),
	SuperAdmin: (moduleArr: string[]) => moduleArr.concat(superAdminModules),
	Default: (moduleArr: string[], localData: any) => {
		return localData.user.modules.map((item: any) => {
			moduleArr.push(item.name);
		});
	}
};

const getVisibilityIconProps = (setShowPassword: Dispatch<SetStateAction<boolean>>, showPassword: boolean) => {
	return {
		className: showPassErr,
		onClick: () => setShowPassword(!showPassword)
	};
};

export { signUpFormikFieldsData, isMenuItemSelected, userNavObject, getVisibilityIconProps };
