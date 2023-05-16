import { memo, useEffect } from "react";
import ProductVariantListWeb from "./product-list-ui";
import useProduct from "./product-hook";
import { getProduct, getRate } from "@api/get-api-queries";
import useRate from "../rate/rate-hook";

function ProductVariantList() {
	const { tableDataSelect, getAllVariantList, onClick } = useProduct();
	const { getAllRateList, tableData, tableInnerData, fetchagain, columns, loader, getAllList } = useRate();
	const { rates } = getRate();
	const { products } = getProduct();

	useEffect(() => {
		getAllRateList();
		getAllList();
		getAllVariantList();
	}, [rates.isLoading, fetchagain, rates.isRefetching, products.isLoading]);

	const handleDelete = async (id: string) => {};

	return (
		<>
			<ProductVariantListWeb
				tableData={tableData}
				coloums={columns}
				tableDataSelect={tableDataSelect}
				onDelete={handleDelete}
				tableInnerData={tableInnerData}
				loading={loader}
				onClickByAdmin={onClick}
			/>
		</>
	);
}
export default memo(ProductVariantList);
