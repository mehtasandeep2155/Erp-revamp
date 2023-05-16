const LoginValues = {
	email: "",
	password: ""
};

const ForgettPasswordValues = {
	email: ""
};

const signUpValues = {
	companyName: "",
	name: "",
	email: "",
	password: "",
	confirmPassword: ""
};

const resetPasswordValues = {
	password: "",
	confirmPassword: ""
};

const productDeminsionValues = {
	height: "",
	name: "",
	id: "",
	uom: ""
};
const productColorValues = {
	color: "",
	id: "",
	name: ""
};
const CompanyValues = {
	name: "",
	subCompanyId: ""
};
const subCompanyValues = {
	name: ""
};

const productTypeValues: any = {
	type: "",
	colors: []
};

const productUomValues = {
	type: "",
	id: "",
	uomType: ""
};

const productRateValues = {
	rate: "",
	productId: "",
	typeId: "",
	id: ""
};

const VerifyValues = {
	email: "",
	companyName: "",
	role: "",
	Products: "",
	PurchaseOrders: "",
	Company: "",
	Inventory: "",
	Customers: "",
	verifyUser: false
};

const productValues = {
	name: "",
	width: "",
	height: "",
	thickness: "",
	length: "",
	weight: "",
	id: ""
};

const inventoryMasterValues = {
	productId: "",
	quantity: "",
	type: "",
	id: "",
	actionType: "",
	length: ""
};

const inventoryValues = {
	productId: "",
	quantity: ""
};

const garbageValues = {
	productId: "",
	quantity: "",
	length: ""
};

const verifyPoValues = {
	status: "",
	gross_weight: "",
	net_weight: ""
};
const poEntriesValues: any = {
	id: "",
	rateId: "",
	typeId: "",
	length: "",
	quantity: "",
	colorId: "",
	productId: []
};
const purchaseOrderValues: any = {
	customer_id: "",
	has_raw_material: "No",
	delivery_pointId: "",
	origin_pointId: ""
};
const CustomerValues = {
	name: "",
	email: "",
	phone: ""
};

const jobValues = {
	userId: "",
	payType: "",
	month: `${new Date().getFullYear()}-${
		new Date().getMonth() + 1 > 9 ? new Date().getMonth() + 1 : `0${new Date().getMonth() + 1}`
	}`,
	totalPay: "",
	feet_per_month: "",
	rate_per_foot: ""
};
const branchValues = {
	address: "",
	type: "",
	phone: "",
	contact_name: "",
	contact_phone: ""
};
const LedgerValues = {
	customerId: "",
	transaction_type: "",
	amount: "",
	transaction_status: ""
};
const InvoiceValues: any = {
	associated_poId: "",
	cost_per_kg: null,
	mailToCustomer: false
};
export {
	CustomerValues,
	InvoiceValues,
	LoginValues,
	productUomValues,
	signUpValues,
	resetPasswordValues,
	VerifyValues,
	productValues,
	poEntriesValues,
	ForgettPasswordValues,
	productDeminsionValues,
	productColorValues,
	productRateValues,
	productTypeValues,
	purchaseOrderValues,
	subCompanyValues,
	CompanyValues,
	LedgerValues,
	inventoryMasterValues,
	verifyPoValues,
	garbageValues,
	jobValues,
	inventoryValues,
	branchValues
};
