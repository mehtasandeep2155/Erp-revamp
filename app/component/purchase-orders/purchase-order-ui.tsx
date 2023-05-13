import TabsComponent from "@common/tabs/tabs";
import { HeaderPage } from "@component/commoncomponent/common-components";
import { purchaseOrderTabsData } from "@component/utils/form/constant";
import TableComponent from "common/tables/custom-table";
import { memo } from "react";
import PurchaseOrderViewDetails from "./purchase-order-view";

const PurchaseOrderWeb = ({
	columns,
	tableData,
	onClickByAdmin,
	loading,
	value,
	tabListData,
	handleTabChange,
	open,
	listTitle,
	headTitle,
	handleView,
	data
}: any) => {
	return (
		<>
			<HeaderPage onClickByAdmin={onClickByAdmin} tableData={tableData} title="Add Purchase Order" />
			<TabsComponent tabData={purchaseOrderTabsData} value={value} handleTabChange={handleTabChange} />
			<TableComponent columns={columns} title={listTitle} tableData={tabListData} loading={loading} />
		</>
	);
};
export default memo(PurchaseOrderWeb);
