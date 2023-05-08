import { HeaderPage } from "@component/commoncomponent/common-components";
import TableComponent from "common/tables/custom-table";
import { memo } from "react";
import AddProductRate from "./add-rate";

const ProductRateListWeb = (props: any) => {
	const { columns, tableData, onClickByAdmin, onDelete, loading, isOpen, tableDataSelect, rateValue, handleOnClick } =
		props;

	return (
		<>
			<HeaderPage onClickByAdmin={onClickByAdmin} tableData={tableData} />
			{!isOpen ? (
				<TableComponent
					title="Product Rate List"
					columns={columns}
					tableData={tableData}
					onDelete={onDelete}
					loading={loading}
					buttonTitle="Add Rate"
					clickAction={onClickByAdmin}
				/>
			) : (
				<AddProductRate
					tableDataSelect={tableDataSelect}
					rateValue={rateValue}
					onClickByAdmin={onClickByAdmin}
					handleOnClick={handleOnClick}
				/>
			)}
		</>
	);
};

export default memo(ProductRateListWeb);
