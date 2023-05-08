import { HeaderPage } from "@component/commoncomponent/common-components";
import TableComponent from "common/tables/custom-table";
import { memo } from "react";
import AddProductType from "./add-product-type";
const ProductTypeListWeb = (props: any) => {
	const { tableData, onClickByAdmin, columns, onDelete, loading, isOpen, typeValue } = props;

	return (
		<>
			<HeaderPage onClickByAdmin={onClickByAdmin} tableData={tableData} />
			{!isOpen ? (
				<TableComponent
					title="Product Coating List"
					columns={columns}
					tableData={tableData}
					onDelete={onDelete}
					loading={loading}
					buttonTitle="Add Product Coating"
					clickAction={onClickByAdmin}
				/>
			) : (
				<AddProductType typeValue={typeValue} onClickByAdmin={onClickByAdmin} />
			)}
		</>
	);
};

export default memo(ProductTypeListWeb);
