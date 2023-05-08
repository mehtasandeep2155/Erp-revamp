import { memo, useEffect } from "react";
import ProductVariantListWeb from "./product-list-ui";
import useProduct from "./product-hook";
import { getProduct } from "@api/get-api-queries";

function ProductVariantList() {
	const { coloums, fetchagain, tableDataSelect, menu, getAllVariantList, TableData, onClick, variantvalue, loader } =
		useProduct();
	const { products } = getProduct();
	useEffect(() => {
		getAllVariantList();
	}, [products.isLoading, fetchagain, products.isRefetching]);

	const handleDelete = async (id: string) => {};

	return (
		<>
			<ProductVariantListWeb
				tableData={TableData}
				coloums={coloums}
				tableDataSelect={tableDataSelect}
				onClickByAdmin={onClick}
				onDelete={handleDelete}
				variantvalues={variantvalue}
				loading={loader}
				isOpen={menu}
			/>
		</>
	);
}
export default memo(ProductVariantList);
