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
	getBranchDetails
} from "./get-api";

export const getJob = () => {
	const jobs = useQuery("joblist", getJobDetails);
	return { jobs };
};

export const getBranch = () => {
	const branches = useQuery("branchlist", getBranchDetails);
	return { branches };
};

export const getUsers = () => {
	const users = useQuery("userlist", getUserlist);
	return { users };
};

export const getPoentries = () => {
	const poentries = useQuery("poentriesList", getPoentriesDetails);
	return { poentries };
};

export const getProduct = () => {
	const products = useQuery("productlist", getProductDetails);
	return { products };
};
export const getCompany = () => {
	const companies = useQuery("companylist", getCompanyDetails);
	return { companies };
};
export const getRate = () => {
	const rates = useQuery("ratelist", getRateDetails);
	return { rates };
};
export const getType = () => {
	const types = useQuery("typelist", getTypeDetails);
	return { types };
};
export const getColor = () => {
	const colors = useQuery("colorlist", getColorDetails);
	return { colors };
};

export const getCustomer = () => {
	const customerlists = useQuery("customerlist", getCustomerDetails);
	return { customerlists };
};

export const getSubCompany = () => {
	const subcompanies = useQuery("subcompanylist", getSubCompanyDetails);
	return { subcompanies };
};

export const getInventory = () => {
	const inventries = useQuery("inventorylist", getInventorytDetails);
	return { inventries };
};

export const getInventoryMaster = () => {
	const inventoryviews = useQuery("inventoryviewlist", getInventoryMastertDetails);
	return { inventoryviews };
};

export const getInvoice = () => {
	const invoices = useQuery("invoicelist", getInVoiceDetails);
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
