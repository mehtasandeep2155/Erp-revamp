import { useRouter } from "next/router";
import { useEffect } from "react";
import {
	dashboard,
	login,
	productColorList,
	productRateList,
	productTypeList,
	productVariantList,
	purchaseOrderList,
	companyList,
	subCompanyList,
	inventoryMasterList,
	garbageList,
	inventoryList,
	customerList,
	inVoiceList,
	jobList,
	branchList,
	ledgerList,
	InTransitList,
	coatingInProgressList,
	ledgerInProgress,
	ledgerPaidList,
	poEntriesList,
	coatingReadyList,
	DispatchReadyList,
	DispatchedList,
	coatingDoneList,
	signUp,
	forgotPassword,
	resetPassword
} from "@component/utils/routes";
import {
	getColor,
	getCompany,
	getCustomer,
	getGarbage,
	getInventory,
	getInventoryMaster,
	getLedger,
	getProduct,
	getPurchaseOrders,
	getRate,
	getSubCompany,
	getType,
	getUsers,
	getPoentries,
	getInvoice,
	getJob,
	getBranch
} from "@api/get-api-queries";
import { adminRoles } from "@component/utils/form/constant";

export default function AuthContext({ Component, pageProps }: any) {
	const { push, pathname } = useRouter();
	const { purchaseOrderds } = getPurchaseOrders();
	const { ledgers } = getLedger();
	const { inventoryviews } = getInventoryMaster();
	const { inventries } = getInventory();
	const { garbages } = getGarbage();
	const { jobs } = getJob();
	useEffect(() => {
		let localData = JSON.parse(localStorage.getItem("userdata"));
		const path =
			pathname.toLowerCase().includes(login) ||
			pathname.toLowerCase().includes(signUp) ||
			pathname.toLowerCase().includes(forgotPassword) ||
			pathname.toLowerCase().includes(resetPassword);
		if (localData !== null) {
			if (adminRoles.includes(localData.user.role)) {
				if (path && pathname === "/") {
					push(dashboard);
				}
			} else {
				if (path) {
					push(productColorList);
				}
			}
		} else {
			push(login);
		}
	}, []);

	useEffect(() => {
		if (
			pathname.toLocaleLowerCase().includes(purchaseOrderList) ||
			pathname.toLocaleLowerCase().includes(coatingReadyList) ||
			pathname.toLocaleLowerCase().includes(coatingInProgressList) ||
			pathname.toLocaleLowerCase().includes(coatingDoneList) ||
			pathname.toLocaleLowerCase().includes(InTransitList) ||
			pathname.toLocaleLowerCase().includes(DispatchReadyList) ||
			pathname.toLocaleLowerCase().includes(DispatchedList)
		) {
			purchaseOrderds.refetch();
		} else if (
			pathname.toLocaleLowerCase().includes(ledgerList) ||
			pathname.toLocaleLowerCase().includes(ledgerInProgress) ||
			pathname.toLocaleLowerCase().includes(ledgerPaidList)
		) {
			ledgers.refetch();
		} else if (pathname.toLocaleLowerCase().includes(inventoryMasterList)) {
			inventoryviews.refetch();
		} else if (pathname.toLocaleLowerCase().includes(inventoryList)) {
			inventries.refetch();
		} else if (pathname.toLocaleLowerCase().includes(garbageList)) {
			garbages.refetch();
		} else if (pathname.toLocaleLowerCase().includes(jobList)) {
			jobs.refetch();
		}
	}, [pathname]);

	return <Component {...pageProps} />;
}
