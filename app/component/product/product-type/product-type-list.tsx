import { useEffect } from "react";
import ProductTypeListWeb from "./product-type-list-ui";
import useProductType from "./product-type-hook";
import { memo } from "react";

function ProductTypeList() {
	const { getAllProductType, menu, types, tableData, fetchagain, typeValue, columns, onClick, loader } =
		useProductType();

	useEffect(() => {
		getAllProductType();
	}, [types.isLoading, fetchagain, types.isRefetching]);

	const handleDelete = async (id: string) => {};

	return (
		<>
			<ProductTypeListWeb
				columns={columns}
				tableData={tableData}
				onClickByAdmin={onClick}
				onDelete={handleDelete}
				loading={loader}
				isOpen={menu}
				typeValue={typeValue}
			/>
		</>
	);
}
export default memo(ProductTypeList);
