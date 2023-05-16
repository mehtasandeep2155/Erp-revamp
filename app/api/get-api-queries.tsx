import { useQuery } from "react-query";
import {
	getColorDetails,
	getCompanyDetails,
	getCustomerDetails,
	getInVoiceDetails,
	getInventoryMastertDetails,
	getInventorytDetails,
	getLedgerDetails,
	getProductDetails,
	getGarbagetDetails,
	getPurchaserderlist,
	getRateDetails,
	getSubCompanyDetails,
	getTypeDetails,
	getUserlist,
	getPoentriesDetails,
	getJobDetails,
	getBranchDetails,
	getProductWithRateDetails,
	getProductRateDetails
} from "./get-api";

export const getJob = () => {
	const jobs = useQuery("joblist", getJobDetails);
	return { jobs };
};

export const getBranch = (page: any, limit: any) => {
	const branches = useQuery(["branchlist", page, limit], getBranchDetails);
	return { branches };
};

export const getUsers = (page: any, limit: any) => {
	const users = useQuery(["userlist", page, limit], getUserlist);
	return { users };
};

export const getPoentries = (page: any, limit: any) => {
	const poentries = useQuery(["poentriesList", page, limit], getPoentriesDetails);
	return { poentries };
};

export const getProduct = (page: any, limit: any) => {
	const products = useQuery(["productlist", page, limit], getProductDetails);
	return { products };
};
export const getCompany = (page: any, limit: any) => {
	const companies = useQuery(["companylist", page, limit], getCompanyDetails);
	return { companies };
};
export const getSubCompany = (page: any, limit: any) => {
	const subcompanies = useQuery(["subcompanylist", page, limit], getSubCompanyDetails);
	return { subcompanies };
};
export const getRate = (page: any, limit: any) => {
	const rates = useQuery(["ratelist", page, limit], getRateDetails);
	return { rates };
};
export const getProductRate = () => {
	const productsRate = useQuery(["productratelist"], getProductRateDetails);
	return { productsRate };
};
export const getType = (page: any, limit: any) => {
	const types = useQuery(["typelist", page, limit], getTypeDetails);
	return { types };
};

export const getProductWithRate = () => {
	const productsWithRate = useQuery("productWithRateList", getProductWithRateDetails);
	return { productsWithRate };
};

export const getColor = (page: any, limit: any) => {
	const colors = useQuery(["colorlist", page, limit], getColorDetails);
	return { colors };
};

export const getCustomer = (page: any, limit: any) => {
	const customerlists = useQuery(["customerlist", page, limit], getCustomerDetails);
	return { customerlists };
};

export const getInventory = () => {
	const inventries = useQuery("inventorylist", getInventorytDetails);
	return { inventries };
};

export const getInventoryMaster = () => {
	const inventoryviews = useQuery("inventoryviewlist", getInventoryMastertDetails);
	return { inventoryviews };
};

export const getInvoice = (page: any, limit: any) => {
	const invoices = useQuery(["invoicelist", page, limit], getInVoiceDetails);
	return { invoices };
};

export const getGarbage = () => {
	const garbages = useQuery("stocklist", getGarbagetDetails);
	return { garbages };
};

export const getLedger = () => {
	const ledgers = useQuery("ledgerlist", getLedgerDetails);
	return { ledgers };
};
export const getPurchaseOrders = () => {
	const purchaseOrderds: any = useQuery("purchaseorderlist", getPurchaserderlist, {
		refetchInterval: 60000,
		refetchIntervalInBackground: true
	});
	return { purchaseOrderds };
};
