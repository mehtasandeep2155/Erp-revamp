import { useEffect, useState } from "react";
import { replaceRegExp } from "../regex-helper";

export default function useHandleChange(moduleList: any, setModuleList: any) {
	const [password, setPassword] = useState<any>("");
	const [companyName, setcompanyName] = useState([]);
	const [companyID, setcompanyId] = useState([]);
	const [personName, setPersonName] = useState([]);
	const typelist = ["Anodized", "Powdered"];

	useEffect(() => {
		if (moduleList.subCompanyId) {
			setcompanyName(moduleList.subCompanyId);
			let list: any = [];
			moduleList.subCompanyId.map((item: any) => {
				list.push(item.id);
			});
			setcompanyId(list);
		} else if (moduleList.colors) {
			let list: any = [];
			moduleList.colors.map((item: any) => {
				list.push(item.id);
				companyName.push(item);
				companyID.push(item.id);
			});
		}
	}, []);

	const handleDelete = (item: any, name: any, id: any, setFieldValue: any) => {
		if (name === "subCompanyId") {
			let company = companyName.filter((chip: string) => chip !== item);
			setcompanyName(company);
			setcompanyId(companyID.filter((chip: string) => chip !== id));
			setFieldValue(["subCompanyId"], company);
		} else if (name === "colors") {
			let company = companyName.filter((chip: string) => chip !== item);
			setcompanyName(company);
			setcompanyId(companyID.filter((chip: string) => chip !== id));
			setFieldValue(["subCompanyId"], company);
		} else if (name === "moduleAccess") {
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

	const handleChange = (event: any, props: any, id: any, uid: any) => {
		console.log(event.target.value, "handle change");
		const { setFieldValue, values } = props;
		if (event.target.value.name === "raw") {
			setFieldValue(["length"], values.productId.length);
		}
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
		} else if (event.target.name == "subCompanyId" || event.target.name === "colors") {
			if (event.target.value) {
				if (event.target.value.length > 0) {
					event.target.value.map((item: any) => {
						if (!companyID.includes(item.id)) {
							companyName.push(item);
							companyID.push(item.id);
						} else {
							const index = companyName.indexOf(item);
							const index1 = companyID.indexOf(item.id);
							companyName.splice(index, 1);
							companyID.splice(index1, 1);
						}
					});
				} else {
					if (!companyID.includes(event.target.value.id)) {
						companyName.push(event.target.value);
						companyID.push(event.target.value.id);
					} else {
						const index = companyName.indexOf(event.target.value);
						const index1 = companyID.indexOf(event.target.value.id);
						companyName.splice(index, 1);
						companyID.splice(index1, 1);
					}
				}
				setFieldValue(event.target.name, companyName);
			}
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
		companyName,
		personName,
		moduleList,
		typelist,
		handleDelete,
		setModuleList
	};
}
