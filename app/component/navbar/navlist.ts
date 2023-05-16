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
	purchaseOrderList,
	productColorList,
	productRateList,
	productTypeList,
	productVariantList,
	subCompanyList,
	ledgerList,
	inVoiceList
} from "@component/utils/routes";
import { navListObjectInterface } from "@component/utils/type/interfaces";
import {
	AddShoppingCartOutlined,
	BusinessOutlined,
	InventoryOutlined,
	ManageAccounts,
	PeopleOutlineOutlined,
	Receipt,
	ReceiptOutlined,
	Shop2Outlined,
	WorkHistory,
	WorkHistoryOutlined,
	ColorLens,
	FormatColorReset
} from "@mui/icons-material";

export const navListObject: Array<navListObjectInterface> = [
	{
		moduleAccess: "Users",
		title: "Users Verification",
		icon: ManageAccounts,
		route: dashboard
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
		route: productVariantList
	},
	{
		moduleAccess: "Products",
		title: "Color",
		icon: ColorLens,
		route: productColorList
	},
	{
		moduleAccess: "Products",
		title: "Coating",
		icon: FormatColorReset,
		route: productTypeList
	},
	{
		moduleAccess: "PurchaseOrders",
		title: "Purchase Orders",
		icon: Shop2Outlined,
		route: purchaseOrderList
	},
	{
		moduleAccess: "PurchaseOrders",
		title: "Invoice",
		icon: Receipt,
		route: inVoiceList
	},
	{
		moduleAccess: "Customers",
		title: "Customers",
		icon: PeopleOutlineOutlined,
		route: customerList
	},
	{
		moduleAccess: "PurchaseOrders",
		title: "Branch",
		icon: WorkHistoryOutlined,
		route: branchList
	},
	{
		moduleAccess: "Ledger",
		title: "Ledger",
		icon: ReceiptOutlined,
		route: ledgerList
	},
	{
		moduleAccess: "Job",
		title: "Job Details",
		icon: WorkHistory,
		route: jobList
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
