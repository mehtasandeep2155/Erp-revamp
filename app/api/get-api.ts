import {
	baseUrl,
	baseUrlCompany,
	baseUrlCustmer,
	baseUrlInventory,
	baseUrlJob,
	baseUrlLedger,
	baseUrlProduct,
	baseUrlPurchaseOrder
} from "@api/base-url";
import {
	branch,
	company,
	customer,
	entry,
	getProductDeminsion,
	getUser,
	inventory,
	inventoryMaster,
	invoice,
	job,
	ledger,
	product,
	productColor,
	productRate,
	productType,
	purchaseOrder,
	recentPo,
	garbage,
	subCompany,
	productWithRate,
	productGetRate
} from "@api/network";
import axios from "axios";

export const getColorDetails = async ({ queryKey }: any) => {
	const page = queryKey[1];
	const limit = queryKey[2];
	const { data } = await axios.get(`${baseUrlProduct + productColor}?page=${page}&limit=${limit}`);
	return data;
};

export const getProductDetails = async ({ queryKey }: any) => {
	const page = queryKey[1];
	const limit = queryKey[2];
	const { data } = await axios.get(`${baseUrlProduct + product}?page=${page}&limit=${limit}`);
	return data;
};

export const getProductRateDetails = async ({ queryKey }: any) => {
	const page = queryKey[1];
	const limit = queryKey[2];
	const { data } = await axios.get(`${baseUrlProduct + productRate}?page=${page}&limit=${limit}`);
	return data;
};

export const getRecentPoDetails = async (id: any) => {
	const { data } = await axios.post(baseUrlPurchaseOrder + recentPo + `/${id}`);
	return data;
};
export const getDeminsionDetails = async ({ queryKey }: any) => {
	const page = queryKey[1];
	const limit = queryKey[2];
	const { data } = await axios.get(`${baseUrlProduct + getProductDeminsion}?page=${page}&limit=${limit}`);
	return data;
};

export const getTypeDetails = async ({ queryKey }: any) => {
	const page = queryKey[1];
	const limit = queryKey[2];
	const { data } = await axios.get(`${baseUrlProduct + productType}?page=${page}&limit=${limit}`);
	return data;
};

export const getProductWithRateDetails = async ({ queryKey }: any) => {
	const page = queryKey[1];
	const limit = queryKey[2];
	const { data } = await axios.get(`${baseUrlProduct + productWithRate}?page=${page}&limit=${limit}`);
	return data;
};

export const getPoentriesDetails = async ({ queryKey }: any) => {
	const page = queryKey[1];
	const limit = queryKey[2];
	const { data } = await axios.get(`${baseUrlPurchaseOrder + entry}?page=${page}&limit=${limit}`);
	return data;
};

export const getBranchDetails = async ({ queryKey }: any) => {
	const page = queryKey[1];
	const limit = queryKey[2];
	const { data } = await axios.get(`${baseUrlPurchaseOrder + branch}?page=${page}&limit=${limit}`);
	return data;
};

export const getJobDetails = async ({ queryKey }: any) => {
	const page = queryKey[1];
	const limit = queryKey[2];
	const { data } = await axios.get(`${baseUrlJob + job}?page=${page}&limit=${limit}`);
	return data;
};

export const getInventoryMastertDetails = async ({ queryKey }: any) => {
	const page = queryKey[1];
	const limit = queryKey[2];
	const { data } = await axios.get(`${baseUrlInventory + inventoryMaster}?page=${page}&limit=${limit}`);
	return data;
};
export const getInventorytDetails = async ({ queryKey }: any) => {
	const page = queryKey[1];
	const limit = queryKey[2];
	const { data } = await axios.get(`${baseUrlInventory + inventory}?page=${page}&limit=${limit}`);
	return data;
};
export const getGarbagetDetails = async ({ queryKey }: any) => {
	const page = queryKey[1];
	const limit = queryKey[2];
	const { data } = await axios.get(`${baseUrlInventory + garbage}?page=${page}&limit=${limit}`);
	return data;
};

export const getPurchaserderlist = async ({ queryKey }: any) => {
	const page = queryKey[1];
	const limit = queryKey[2];
	const status = queryKey[3] && `&status=${queryKey[3]}`;
	const { data } = await axios.get(`${baseUrlPurchaseOrder + purchaseOrder}?page=${page}&limit=${limit}${status}`);
	return data;
};

export const getRateDetails = async ({ queryKey }: any) => {
	const page = queryKey[1];
	const limit = queryKey[2];
	const { data } = await axios.get(`${baseUrlProduct + productGetRate}?page=${page}&limit=${limit}`);
	return data;
};

export const getCompanyDetails = async ({ queryKey }: any) => {
	const page = queryKey[1];
	const limit = queryKey[2];
	const { data } = await axios.get(`${baseUrlCompany + company}?page=${page}&limit=${limit}`);
	return data;
};

export const getCustomerDetails = async ({ queryKey }: any) => {
	const page = queryKey[1];
	const limit = queryKey[2];
	const { data } = await axios.get(`${baseUrlCustmer + customer}?page=${page}&limit=${limit}`);
	return data;
};

export const getLedgerDetails = async ({ queryKey }: any) => {
	const page = queryKey[1];
	const limit = queryKey[2];
	const { data } = await axios.get(`${baseUrlLedger + ledger}?page=${page}&limit=${limit}`);
	return data;
};
export const getInVoiceDetails = async ({ queryKey }: any) => {
	const page = queryKey[1];
	const limit = queryKey[2];
	const { data } = await axios.get(`${baseUrlPurchaseOrder + invoice}?page=${page}&limit=${limit}`);
	return data;
};
export const getSubCompanyDetails = async ({ queryKey }: any) => {
	const page = queryKey[1];
	const limit = queryKey[2];
	const { data } = await axios.get(`${baseUrlCompany + subCompany}?page=${page}&limit=${limit}`);
	return data;
};

export const getUserlist = async ({ queryKey }: any) => {
	const page = queryKey[1];
	const limit = queryKey[2];
	let localData = JSON.parse(localStorage.getItem("userdata"));
	if (localData != null) {
		const { data } = await axios.get(`${baseUrl + getUser}?page=${page}&limit=${limit}`, {
			headers: { Authorization: `Bearer ${localData.jwt}` }
		});
		return data;
	}
};
