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

const loginFormikFieldsData = [
	{ placeholder: "Email", name: "email" },
	{ placeholder: "Password", name: "password", icon: "true" }
];

const colorFormikFieldsData = [{ placeholder: "Enter Color Name", name: "color", label: "Color Name" }];
const typeFormikFieldsData = [
	{ placeholder: "Enter Coating Name", name: "type", label: "Coating Name", InputComponent: "input" },
	{ placeholder: "Search...", name: "colors", label: "Colors Name", InputComponent: "select" }
];
const productFormikFieldsData1 = [
	{
		placeholder: "Enter Product Name",
		name: "name",
		label: "Product Name",
		InputComponent: "select",
		flex: true
	},
	{
		placeholder: "Enter Product Height",
		name: "height",
		label: "Height",
		InputComponent: "input",
		flex: false,
		uomType: "mm"
	},
	{
		placeholder: "Enter Product Width",
		name: "width",
		label: "Width",
		InputComponent: "input",
		flex: false,
		uomType: "mm"
	}
];
const productFormikFieldsData = [
	{
		placeholder: "Enter Product Thickness",
		name: "thickness",
		label: "Thickness",
		InputComponent: "input",
		flex: true,
		uomType: "mm"
	},
	{
		placeholder: "Enter Product Length",
		name: "length",
		label: "Length",
		InputComponent: "input",
		flex: false,
		uomType: "ft"
	},
	{
		placeholder: "Enter Product Weight",
		name: "weight",
		label: "Weight",
		InputComponent: "input",
		flex: false,
		uomType: "kg"
	}
];
const getVisibilityIconProps = (setShowPassword: Dispatch<SetStateAction<boolean>>, showPassword: boolean) => {
	return {
		className: showPassErr,
		onClick: () => setShowPassword(!showPassword)
	};
};

const returnNextStatus = (status: string) => {
	const nextStatus: any = {
		Initiated: "Coating Initiated",
		"Coating Initiated": "Coating Processing",
		"Coating Processing": "Ready for Dispatch",
		"Ready for Dispatch": "Intransit"
	};
	return nextStatus[status];
};

export {
	signUpFormikFieldsData,
	userNavObject,
	isMenuItemSelected,
	loginFormikFieldsData,
	colorFormikFieldsData,
	typeFormikFieldsData,
	productFormikFieldsData1,
	productFormikFieldsData,
	getVisibilityIconProps,
	returnNextStatus
};
