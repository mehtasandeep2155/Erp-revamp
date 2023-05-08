import { poEntriesValues, verifyPoValues, purchaseOrderValues } from "../form/initial-values";

const initialState: any = {
	IsOpen: false,
	IsDetails: false,
	loader: false,
	productslist: [],
	Selectedproductslist: [],
	productValue: poEntriesValues,
	verifyValue: verifyPoValues,
	fetchagain: false,
	perChasevalue: purchaseOrderValues,
	productmenu: false,
	tableData: [],
	readyForCoatingTableData: [],
	CoatingInProgressTableData: []
};
export function Poreducer(state = initialState, action: any) {
	switch (action.type) {
		case "increment":
			return { count: state.count + 1 };
		case "decrement":
			return { count: state.count - 1 };
		default:
			throw new Error();
	}
}
