import {
	productVariantList,
	productColorList,
	productRateList,
	productTypeList,
	purchaseOrderList,
	companyList,
	subCompanyList,
	inventoryMasterList,
	garbageList,
	inventoryList,
	customerList,
	ledgerList,
	InTransitList,
	coatingInProgressList,
	ledgerInProgress,
	ledgerPaidList,
	poEntriesList,
	coatingReadyList,
	DispatchReadyList,
	DispatchedList,
	coatingDoneList
} from "@component/utils/routes";
import { navIcon } from "@css/styles";
import {
	Shop2Outlined,
	PeopleOutline,
	BusinessOutlined,
	CorporateFareOutlined,
	ColorLensOutlined,
	TypeSpecimenOutlined,
	MonetizationOnOutlined,
	Inventory2Outlined,
	FolderSpecialOutlined,
	ReceiptOutlined,
	AddShoppingCart
} from "@mui/icons-material";

export const productTabs = [
	{ key: "color", text: "Color", path: productColorList },
	{ key: "producttype", text: "Product Coating", path: productTypeList },
	{ key: "products", text: "Products", path: productVariantList },
	{ key: "rate", text: "Product Rate", path: productRateList }
];

export const productTabsObject: any = {
	color: <ColorLensOutlined className={navIcon} sx={{ maxWidth: 60, maxHeight: 60 }} />,
	producttype: <TypeSpecimenOutlined className={navIcon} sx={{ maxWidth: 60, maxHeight: 60 }} />,
	products: <AddShoppingCart className={navIcon} sx={{ maxWidth: 60, maxHeight: 60 }} />,
	rate: <MonetizationOnOutlined className={navIcon} sx={{ maxWidth: 60, maxHeight: 60 }} />
};

export const purchaseOrderTabs = [
	{ key: "poentries", text: "Po Entries", path: poEntriesList },
	{ key: "purchaseorder", text: "Initiated", path: purchaseOrderList }
];

export const ledgerTabs = [
	{ key: "pending", text: "Pending", path: ledgerList },
	{ key: "inprogress", text: "In Progress", path: ledgerInProgress },
	{ key: "paid", text: "Paid", path: ledgerPaidList }
];

export const ledgerTabsObject: any = {
	pending: <ReceiptOutlined className={navIcon} sx={{ maxWidth: 60, maxHeight: 60 }} />,
	inprogress: <ReceiptOutlined className={navIcon} sx={{ maxWidth: 60, maxHeight: 60 }} />,
	paid: <ReceiptOutlined className={navIcon} sx={{ maxWidth: 60, maxHeight: 60 }} />
};

export const coatingTabs = [
	{ key: "ready_for_coating", text: "Initiated", path: coatingReadyList },
	{ key: "coating_in_progress", text: "Processing", path: coatingInProgressList },
	{ key: "coating_done", text: "Finished", path: coatingDoneList }
];

export const coatingTabsObject: any = {
	ready_for_coating: <ReceiptOutlined className={navIcon} sx={{ maxWidth: 60, maxHeight: 60 }} />,
	coating_in_progress: <ReceiptOutlined className={navIcon} sx={{ maxWidth: 60, maxHeight: 60 }} />,
	coating_done: <ReceiptOutlined className={navIcon} sx={{ maxWidth: 60, maxHeight: 60 }} />
};

export const dispatchTabs = [
	{ key: "in_transit", text: "InTransit", path: InTransitList },
	{ key: "ready_for_dispatch", text: "Processing", path: DispatchReadyList },
	{ key: "dispatched", text: "Dispatched", path: DispatchedList }
];

export const dispatchTabsObject: any = {
	in_transit: <ReceiptOutlined className={navIcon} sx={{ maxWidth: 60, maxHeight: 60 }} />,
	ready_for_dispatch: <ReceiptOutlined className={navIcon} sx={{ maxWidth: 60, maxHeight: 60 }} />,
	dispatched: <ReceiptOutlined className={navIcon} sx={{ maxWidth: 60, maxHeight: 60 }} />
};

export const purchaseOrderTabsObject: any = {
	poentries: <Shop2Outlined className={navIcon} sx={{ maxWidth: 60, maxHeight: 60 }} />,
	purchaseorder: <Shop2Outlined className={navIcon} sx={{ maxWidth: 60, maxHeight: 60 }} />
};

export const customerTabs = [{ key: "customer", text: "Customers", path: customerList }];

export const customerTabsObject: any = {
	customer: <PeopleOutline className={navIcon} sx={{ maxWidth: 60, maxHeight: 60 }} />
};

export const companyTabs = [
	{ key: "company", text: "Company", path: companyList },
	{ key: "subcompany", text: "Sub Company", path: subCompanyList }
];

export const companyTabsObject: any = {
	company: <BusinessOutlined className={navIcon} sx={{ maxWidth: 60, maxHeight: 60 }} />,
	subcompany: <CorporateFareOutlined className={navIcon} sx={{ maxWidth: 60, maxHeight: 60 }} />
};

export const inventoryTabs = [
	{ key: "inventorymaster", text: "Inventory Master", path: inventoryMasterList },
	{ key: "inventory", text: "Inventory", path: inventoryList },
	{ key: "garbage", text: "Garbage", path: garbageList }
];

export const inventoryTabsObject: any = {
	inventorymaster: <Inventory2Outlined className={navIcon} sx={{ maxWidth: 60, maxHeight: 60 }} />,
	inventory: <Inventory2Outlined className={navIcon} sx={{ maxWidth: 60, maxHeight: 60 }} />,
	garbage: <FolderSpecialOutlined className={navIcon} sx={{ maxWidth: 60, maxHeight: 60 }} />
};
