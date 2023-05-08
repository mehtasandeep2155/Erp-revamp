import {
	garbageList,
	dashboard,
	inventoryList,
	inventoryMasterList,
	branchList,
	companyList,
	customerList,
	jobList,
	poEntriesList,
	productColorList,
	productRateList,
	productTypeList,
	productVariantList,
	subCompanyList,
	ledgerList
} from "@component/utils/routes";
import { navListObjectInterface } from "@component/utils/type/interfaces";
import {
	AddShoppingCartOutlined,
	BusinessOutlined,
	InventoryOutlined,
	ManageAccounts,
	PeopleOutlineOutlined,
	ReceiptOutlined,
	Shop2Outlined,
	WorkHistory,
	WorkHistoryOutlined
} from "@mui/icons-material";

export const navListObject: Array<navListObjectInterface> = [
	{
		moduleAccess: "Users",
		title: "Users Verification",
		icon: ManageAccounts,
		route: dashboard
	},
	{
		moduleAccess: "PurchaseOrders",
		title: "Purchase Orders",
		icon: Shop2Outlined,
		route: poEntriesList
	},
	{
		moduleAccess: "PurchaseOrders",
		title: "Branch",
		icon: WorkHistoryOutlined,
		route: branchList
	},
	{
		moduleAccess: "Company",
		title: "Company",
		icon: BusinessOutlined,
		route: null,
		children: [
			{
				title: "Company",
				route: companyList
			},
			{
				title: "Sub Company",
				route: subCompanyList
			}
		]
	},
	{
		moduleAccess: "Products",
		title: "Products",
		icon: AddShoppingCartOutlined,
		route: null,
		children: [
			{
				title: "Color",
				route: productColorList
			},
			{
				title: "Product Coating",
				route: productTypeList
			},
			{
				title: "Products",
				route: productVariantList
			},
			{
				title: "Product Rate",
				route: productRateList
			}
		]
	},
	{
		moduleAccess: "Customers",
		title: "Customers",
		icon: PeopleOutlineOutlined,
		route: customerList
	},
	{
		moduleAccess: "Job",
		title: "Job Details",
		icon: WorkHistory,
		route: jobList
	},
	{
		moduleAccess: "Ledger",
		title: "Ledger",
		icon: ReceiptOutlined,
		route: ledgerList
	},
	{
		moduleAccess: "Inventory",
		title: "Inventory",
		icon: InventoryOutlined,
		route: null,
		children: [
			{
				title: "Inventory Master",
				route: inventoryMasterList
			},
			{
				title: "Inventory",
				route: inventoryList
			},
			{
				title: "Garbage",
				route: garbageList
			}
		]
	}
];

export const filterSideMenu = (moduleAccess: any[]) => {
	const filteredSideMenu = navListObject.filter((item: any) => moduleAccess.includes(item.moduleAccess));
	return filteredSideMenu;
};
