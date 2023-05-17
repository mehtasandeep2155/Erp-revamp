const adminRoles = ["Admin", "SuperAdmin"];
const companyNames = ["bitontree", "Nstack"];
const jobColums = [
	{
		label: "#",
		options: {
			filter: false
		}
	},
	"User",
	"Payment Month",
	"Payment Type",
	"Feet Per Month",
	"Rate Per Foot",
	"Total Pay",
	{
		label: "Action",
		options: {
			filter: false
		}
	}
];
const verifyColumns = [
	{
		label: "#",
		options: {
			filter: false
		}
	},
	"User Email",
	"User Role",
	"Company",
	"Sub Companies",
	"Verification",
	{
		label: "Action",
		options: {
			filter: false
		}
	}
];
const userViewColumns = ["User Email", "User Role", "Company", "Verified"];
const colorColumns = [
	{
		label: "#",
		options: {
			filter: false
		}
	},
	"Color",
	"Color Code",
	{
		label: "Action",
		options: {
			filter: false
		}
	}
];
const monthNames: any = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December"
];
const array: any = ["User", "Company", "Products", "Customers", "PurchaseOrders", "Ledger", "Inventory", "Job"];
const adminModules = ["Users", "Products", "PurchaseOrders", "Branch", "Customers", "Inventory", "Ledger", "Job"];
const superAdminModules = [
	"Users",
	"Products",
	"Company",
	"PurchaseOrders",
	"Branch",
	"Customers",
	"Inventory",
	"Ledger",
	"Job"
];
const productColums = [
	"#",
	"Product",
	"Coating",
	"Rate",
	"Length",
	"Quantity",
	"Color",
	"Weight",
	{
		label: "Action",
		options: {
			filter: false
		}
	}
];

const productViewColums = ["Product Name", "Color", "Height", "Rate", "Width", "Length", "Weight", "Quantity"];
const PoEntriesViewColums = ["Product", "Coating", "Rate", "Length", "Quantity", "Color", "Weight"];
const dimensionColums = [
	{
		label: "#",
		options: {
			filter: false
		}
	},
	"Height (mm)",
	{
		label: "Action",
		options: {
			filter: false
		}
	}
];
const productTypeColums = [
	{
		label: "#",
		options: {
			filter: false
		}
	},
	"Product Coating",
	"Colors",
	{
		label: "Action",
		options: {
			filter: false
		}
	}
];
const members = ["Admin", "Super Admin", "Branch User", "Factory User", "Labour"];
const moduleAccess = ["Read", "Edit", "Delete"];
const inventoryViewColums = [
	{
		label: "#",
		options: {
			filter: false
		}
	},
	"Product",
	"Quantity",
	"Type",
	"Action Type",
	{
		label: "Action",
		options: {
			filter: false
		}
	}
];
const inventoryColums = [
	{
		label: "#",
		options: {
			filter: false
		}
	},
	"Product",
	"Quantiy",
	{
		label: "Action",
		options: {
			filter: false
		}
	}
];
const garbageColums = [
	{
		label: "#",
		options: {
			filter: false
		}
	},
	"Product",
	"Quantity",
	"Length",
	{
		label: "Action",
		options: {
			filter: false
		}
	}
];

const variantColums = [
	{
		label: "#",
		options: {
			filter: false
		}
	},
	"Product Name",
	"Height(mm)",
	"Width(mm)",
	"Weight(kg)",
	"Thickness(mm)",
	"Length(ft)",
	{
		label: "Action",
		options: {
			filter: false
		}
	}
];

const variantViewColums = ["Product Name", "Height (mm)", "Width", "Weight (kg)", "Thickness", "Length"];

const purchaseOrderColums = [
	{
		label: "#",
		options: {
			filter: false
		}
	},
	"Customer",
	"Product",
	"Delivery Points",
	"Origin Points",
	"Gross Weight",
	"Net Weight",
	"Order Number",
	"Issue Date",
	"Status",
	{
		label: "Action",
		options: {
			filter: false
		}
	}
];
const CoatingColums = [
	{
		label: "#",
		options: {
			filter: false
		}
	},
	"Customer",
	"Product",
	"Delivery Points",
	"Origin Points",
	"Gross Weight",
	"Net Weight",
	"Order Number",
	"Issue Date",
	{
		label: "Action",
		options: {
			filter: false
		}
	}
];
const CoatingDoneColums = [
	{
		label: "#",
		options: {
			filter: false
		}
	},
	"Customer",
	"Po Entries",
	"Delivery Points",
	"Origin Points",
	"Gross Weight",
	"Net Weight",
	{
		label: "Action",
		options: {
			filter: false
		}
	}
];

const subCompanyColums = [
	{
		label: "#",
		options: {
			filter: false
		}
	},
	"Sub Company",
	{
		label: "Action",
		options: {
			filter: false
		}
	}
];

const statusList = [
	{ name: "Coating Initiated", id: "coating_initiated" },
	{ name: "Coating Processing", id: "coating_processing" },
	{ name: "Ready for Dispatch", id: "ready_for_dispatch" }
];
const purchaseOrderFincishColums = [
	{
		label: "#",
		options: {
			filter: false
		}
	},
	"Customer",
	"Po Entries",
	"Delivery Points",
	"Origin Points",
	"Gross Weight",
	"Net Weight",
	"Invoice",
	{
		label: "Action",
		options: {
			filter: false
		}
	}
];
const InVoiceColums = [
	{
		label: "#",
		options: {
			filter: false
		}
	},
	"P.O Details",
	"Challan No.",
	"Net weight",
	"Cost Per Kg",
	"Tax",
	"Coating Amt",
	"Coating Discount",
	"Gross Amt",
	"Net Amt",
	"Final Amt",
	"Issue Date",
	{
		label: "Action",
		options: {
			filter: false
		}
	}
];
const rateColums = ["#", "Product", "Coating", "Rate", "Action"];

const rateColumsSelect = ["Product", "Coating", "Rate"];
const rateColumsView = ["Product", "Coating", "Color", "Rate", "Length"];
const poColumsSelect = ["Order Number", "Raw Material Included", "Issue Date", "Products Count"];

const companyColums = [
	{
		label: "#",
		options: {
			filter: false
		}
	},
	"Company",
	"Sub Companies",
	{
		label: "Action",
		options: {
			filter: false
		}
	}
];
const customerViewColums = ["Customer Name", "Customer Email", "Customer Phone"];
const customerColums = [
	{
		label: "#",
		options: {
			filter: false
		}
	},
	"Cutomer Name",
	"Customer Email",
	"Customer Phone",
	"Credit Status",
	{
		label: "Action",
		options: {
			filter: false
		}
	}
];

const generateInvoiceColumns = [
	"Order Number",
	"Customer",
	"Product",
	"Issue Date",
	"Raw Material",
	"Net Weight",
	"Status"
];
const branchColums = [
	{
		label: "#",
		options: {
			filter: false
		}
	},
	"Name",
	"Type",
	"Phone",
	"Contact Name",
	"Contact Phone",
	"Address",
	{
		label: "Action",
		options: {
			filter: false
		}
	}
];

const branchViewColums = ["Point", "Name", "Type", "Phone", "Contact Phone", "Address"];

const PoViewColums = ["Order Number", "Raw Material Included", "Issue Date", "Status", "Po Entries"];

const ledgerColums = [
	{
		label: "#",
		options: {
			filter: false
		}
	},
	"Cutomer",
	"P.O Details",
	"Amount",
	"Transaction Type",
	"Transaction Status",
	{
		label: "Action",
		options: {
			filter: false
		}
	}
];

const purchaseOrderTabsData = [
	{
		label: "All",
		component: <>1</>,
		route: "purchase-order"
	},
	{
		label: "Initiated",
		component: <>2</>,
		route: "ready-for-coating"
	},
	{
		label: "Coating Initiated",
		component: <>3</>,
		route: "coating-in-progress"
	},
	{
		label: "Processing",
		component: <>4</>,
		route: "purchase-order"
	},
	{
		label: "Ready for Dispatch",
		component: <>6</>,
		route: "purchase-order"
	}
];

const statusTabs = [
	{
		label: "Initiated",
		status: "initiated"
	},
	{
		label: "Coating Initiated",
		status: "coating_initiated"
	},
	{
		label: "Coating Processing",
		status: "coating_processing"
	},
	{
		label: "In Transit",
		status: "in_transit"
	},
	{
		label: "Ready For Dispatch",
		status: "ready_for_dispatch"
	},
	{
		label: "Dispatched",
		status: "dispatched"
	}
];

const yourPurchaseOrderHead = ["#", "Product", "Coating", "Rate", "Length", "Quantity", "Color", "Action"];
const yourPurchaseOrderInnerHead = ["Product Name", "Height", "Width", "Weight", "Thickness", "Length"];

export {
	colorColumns,
	statusTabs,
	userViewColumns,
	verifyColumns,
	companyNames,
	monthNames,
	adminRoles,
	array,
	jobColums,
	adminModules,
	garbageColums,
	superAdminModules,
	productColums,
	productViewColums,
	members,
	moduleAccess,
	inventoryColums,
	variantColums,
	variantViewColums,
	purchaseOrderColums,
	rateColums,
	customerColums,
	customerViewColums,
	companyColums,
	subCompanyColums,
	inventoryViewColums,
	branchColums,
	InVoiceColums,
	purchaseOrderFincishColums,
	rateColumsView,
	rateColumsSelect,
	ledgerColums,
	poColumsSelect,
	PoViewColums,
	CoatingColums,
	CoatingDoneColums,
	statusList,
	productTypeColums,
	dimensionColums,
	PoEntriesViewColums,
	branchViewColums,
	purchaseOrderTabsData,
	generateInvoiceColumns,
	yourPurchaseOrderHead,
	yourPurchaseOrderInnerHead
};
