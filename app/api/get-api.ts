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
	subCompany
} from "@api/network";
import axios from "axios";

export const getColorDetails = async () => {
	const { data } = await axios.get(baseUrlProduct + productColor);

	return data;
};

export const getProductDetails = async () => {
	const { data } = await axios.get(baseUrlProduct + product);
	return data;
};

export const getRecentPoDetails = async (id: any) => {
	const { data } = await axios.post(baseUrlPurchaseOrder + recentPo + `/${id}`);
	return data;
};
export const getDeminsionDetails = async () => {
	const { data } = await axios.get(baseUrlProduct + getProductDeminsion);
	return data;
};

export const getTypeDetails = async () => {
	const { data } = await axios.get(baseUrlProduct + productType);
	return data;
};

export const getPoentriesDetails = async () => {
	const { data } = await axios.get(baseUrlPurchaseOrder + entry);
	return data;
};

export const getBranchDetails = async () => {
	const { data } = await axios.get(baseUrlPurchaseOrder + branch);
	return data;
};

export const getJobDetails = async () => {
	const { data } = await axios.get(baseUrlJob + job);
	return data;
};
export const getInventoryMastertDetails = async () => {
	const { data } = await axios.get(baseUrlInventory + inventoryMaster);
	return data;
};
export const getInventorytDetails = async () => {
	const { data } = await axios.get(baseUrlInventory + inventory);
	return data;
};
export const getGarbagetDetails = async () => {
	const { data } = await axios.get(baseUrlInventory + garbage);
	return data;
};

export const getPurchaserderlist = async () => {
	const { data } = await axios.get(baseUrlPurchaseOrder + purchaseOrder);
	return data;
};

export const getApprovedPurchaserderlist = async () => {
	const { data } = await axios.get(baseUrlPurchaseOrder + purchaseOrder);
	return data;
};
export const getRateDetails = async () => {
	const { data } = await axios.get(baseUrlProduct + productRate);
	return data;
};

export const getCompanyDetails = async () => {
	const { data } = await axios.get(baseUrlCompany + company);
	return data;
};

export const getCustomerDetails = async () => {
	const { data } = await axios.get(baseUrlCustmer + customer);
	return data;
};

export const getLedgerDetails = async () => {
	const { data } = await axios.get(baseUrlLedger + ledger);
	return data;
};
export const getInVoiceDetails = async () => {
	const { data } = await axios.get(baseUrlPurchaseOrder + invoice);
	return data;
};
export const getSubCompanyDetails = async () => {
	const { data } = await axios.get(baseUrlCompany + subCompany);
	return data;
};

export const getUserlist = async () => {
	let localData = JSON.parse(localStorage.getItem("userdata"));
	if (localData != null) {
		const { data } = await axios.get(baseUrl + getUser, {
			headers: { Authorization: `Bearer ${localData.jwt}` }
		});
		return data;
	}
};
