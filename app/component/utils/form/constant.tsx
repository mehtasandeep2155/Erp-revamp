export default function useConstant() {
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
	const uomColums = [
		{ name: "Kilogram" },
		{ name: "Tonne" },
		{ name: "Feet" },
		{ name: "Inches" },
		{ name: "gram" },
		{ name: "millimeter" },
		{ name: "centimeter" }
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

	const colorColumns = [
		{
			label: "#",
			options: {
				filter: false
			}
		},
		"Color",
		"Coating Type",
		{
			label: "Action",
			options: {
				filter: false
			}
		}
	];
	const productColums = [
		{
			label: "#",
			options: {
				filter: false
			}
		},
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

	const productCardColums = ["Variants", "Quantity", "weight", "Rate", "Coating", "Height (mm)"];
	const productViewColums = ["Product", "Coating", "Rate", "Length", "Quantity", "Color", "Weight", "Action"];
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
		"Po Entries",
		"Delivery Points",
		"Origin Points",
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
		"Po Entries",
		"Delivery Points",
		"Origin Points",
		"Gross Weight",
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
	const statusList = [
		{ name: "InTransit", id: "in_transit" },
		{ name: "Ready For Dispatch", id: "ready_for_dispatch" },
		{ name: "Dispatched", id: "dispatched" }
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
	const rateColums = [
		{
			label: "#",
			options: {
				filter: false
			}
		},
		"Product",
		"Coating",
		"Rate",
		{
			label: "Action",
			options: {
				filter: false
			}
		}
	];

	const rateColumsSelect = ["Product", "Coating", "Rate"];
	const rateColumsView = [
		"Rate",
		"Section Name",
		"Section Number",
		"Height (mm)",
		"Width",
		"Weight (kg)",
		"Thickness",
		"Outer Diameter",
		"Dimension (Height)"
	];
	const poColumsSelect = ["Order Number", "Raw Material Included", "Issue Date", "Products Count"];
	const uomColumns = [
		{
			label: "#",
			options: {
				filter: false
			}
		},
		"Unity Of Measurement",
		"Unity Of Measurement Type",
		{
			label: "Action",
			options: {
				filter: false
			}
		}
	];
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
	const customerViewColums = ["Customer Name", "Customer Email", "Customer Phone", "Credit Status"];
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
	const branchColums = [
		{
			label: "#",
			options: {
				filter: false
			}
		},
		"Type",
		"Phone",
		"Contact Name",
		"Contact Phone",
		"Address",
		"Code",
		{
			label: "Action",
			options: {
				filter: false
			}
		}
	];
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
	const array: any = ["User", "Company", "Products", "Customers", "PurchaseOrders", "Ledger", "Inventory", "Job"];
	const companyNames = ["bitontree", "Nstack"];
	const members = ["Admin", "Super Admin", "Branch User", "Factory User", "Labour"];
	const module = ["Read", "Edit", "Delete"];
	const stockChangeList = [
		{ value: "Raw Stock", name: "rawChange_after_action" },
		{ value: "Garbage Stock", name: "garbageChange_after_action" },
		{ value: "Finished Stock", name: "finishedChange_after_action" }
	];

	const inStockList = [
		{ name: "DecreaseInStock", value: "Decrease In Stock" },
		{ name: "IncreaseInStock", value: "Increase In Stock" }
	];

	const adminRoles = ["Admin", "SuperAdmin"];

	return {
		adminRoles,
		verifyColumns,
		jobColums,
		colorColumns,
		productColums,
		productViewColums,
		dimensionColums,
		productTypeColums,
		variantColums,
		variantViewColums,
		purchaseOrderColums,
		rateColums,
		uomColumns,
		customerColums,
		customerViewColums,
		companyColums,
		subCompanyColums,
		inventoryViewColums,
		garbageColums,
		array,
		companyNames,
		members,
		branchColums,
		module,
		InVoiceColums,
		inventoryColums,
		stockChangeList,
		productCardColums,
		purchaseOrderFincishColums,
		rateColumsView,
		inStockList,
		rateColumsSelect,
		uomColums,
		ledgerColums,
		userViewColumns,
		poColumsSelect,
		PoViewColums,
		CoatingColums,
		CoatingDoneColums,
		superAdminModules,
		statusList,
		monthNames,
		adminModules,
		PoEntriesViewColums
	};
}

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

export { adminModules, superAdminModules };
