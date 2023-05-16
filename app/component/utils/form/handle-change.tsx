import { useEffect, useState } from "react";
import { replaceRegExp } from "../regex-helper";

export default function useHandleChange(moduleList: any, setModuleList: any) {
	const [password, setPassword] = useState<any>("");
	const [personName, setPersonName] = useState([]);
	const typelist = ["Anodized", "Powdered"];

	useEffect(() => {}, []);

	const handleDelete = (item: any, name: any, id: any, setFieldValue: any) => {
		if (name === "moduleAccess") {
			setModuleList(moduleList.filter((item1: any) => item1 != item));
			setFieldValue(
				"moduleAccess",
				moduleList.filter((item1: any) => item1 != item)
			);
		} else if (setFieldValue === "modules") {
			let person = id.filter((chip: string) => chip != item);
			moduleList[name].controls = person;
			setPersonName(person);
		} else {
			let person = moduleList[name].instock.filter((chip: any) => chip.name != item.name);
			moduleList[name].instock = person;
		}
	};

	const handleChange = (event: any, { setFieldValue, values }: any, id: any, uid: any) => {
		if (event.target.name === "type") {
			setFieldValue(event.target.name, event.target.value);
		} else if (event.target.name === "rate" || event.target.name === "amount") {
			setFieldValue(event.target.name, String(event.target.value).replace(replaceRegExp, ","));
		} else if (event.target.name === id?.name) {
			if (uid === "Edit") {
				setFieldValue(event.target.name, {
					name: event.target.name,
					controls: { ...id.controls, ["Read"]: event.target.checked, [uid]: event.target.checked }
				});
			} else if (uid === "Delete") {
				setFieldValue(event.target.name, {
					name: event.target.name,
					controls: {
						...id.controls,
						["Read"]: event.target.checked,
						["Edit"]: event.target.checked,
						[uid]: event.target.checked
					}
				});
			} else {
				setFieldValue(event.target.name, {
					name: event.target.name,
					controls: {
						...id.controls,
						[uid]: event.target.checked
					}
				});
			}
		} else if (event.target.name === "colors") {
			setFieldValue(event.target.name, event.target.value);
		} else if (event.target.name === "subCompanyId") {
			setFieldValue(event.target.name, event.target.value);
		} else if (event.target.name === "password") {
			setPassword(event.target.value);
			setFieldValue(event.target.name, event.target.value);
		} else if (event.target.name === "product") {
			setFieldValue(id);
		} else if (event.target.name === "role") {
			setFieldValue(event.target.name, event.target.value.replace(/ /g, ""));
		} else if (event.target.name === "verifyUser" || event.target.name === "mailToCustomer") {
			setFieldValue(event.target.name, event.target.checked);
		} else if (event.target.name === "coating_discount" || event.target.name === "tax") {
			if (event.target.value.match(/[0-9]/)) {
				setFieldValue(event.target.name, event.target.value);
			} else {
				setFieldValue(event.target.name, event.target.value);
			}
		} else if (event.target.name === "totalPay") {
			setFieldValue(["feet_per_month"], event.target.value);
			setFieldValue(["rate_per_foot"], event.target.value);
			setFieldValue(event.target.name, event.target.value);
		} else if (event.target.name === "feet_per_month") {
			setFieldValue(["totalPay"], event.target.value);
			setFieldValue(event.target.name, event.target.value);
		} else if (event.target.name === "totalPay") {
			setFieldValue(event.target.name, event.target.value);
		} else {
			setFieldValue(event.target.name, event.target.value);
		}
	};

	return {
		handleChange,
		password,
		personName,
		moduleList,
		typelist,
		handleDelete,
		setModuleList
	};
}
