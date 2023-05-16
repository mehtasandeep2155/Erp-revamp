import { HeaderPage } from "@component/commoncomponent/common-components";
import TableComponent from "common/tables/custom-table";
import { memo } from "react";
import AddProductRate from "./add-rate";

const ProductRateListWeb = (props: any) => {
	const { columns, tableData, onClickByAdmin, onDelete, loading, isOpen, rateValue, handleOnClick } = props;

	return (
		<>
			<HeaderPage onClickByAdmin={onClickByAdmin} tableData={tableData} />
		</>
	);
};

export default memo(ProductRateListWeb);
