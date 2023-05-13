import { memo, useEffect } from "react";
import ProductVariantListWeb from "./product-list-ui";
import useProduct from "./product-hook";
import { getProduct, getRate } from "@api/get-api-queries";
import useRate from "../rate/rate-hook";
import AddProductVariant from "./add-product-ui";
import AddProductRate from "../rate/add-rate";

function ProductVariantList() {
	const { tableDataSelect, menu, rateMenu, getAllVariantList, onClick, onClickRate, variantvalue, rateValue } =
		useProduct();
	const { getAllRateList, tableData, fetchagain, columns, loader, handleOnClick, getAllList } = useRate();
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
			{!menu && !rateMenu ? (
				<ProductVariantListWeb
					tableData={tableData}
					coloums={columns}
					tableDataSelect={tableDataSelect}
					onDelete={handleDelete}
					loading={loader}
					onClickByAdmin={onClick}
				/>
			) : null}
			{menu && (
				<AddProductVariant
					tableDataSelect={tableDataSelect}
					variantvalues={variantvalue}
					onClickByAdmin={onClick}
				/>
			)}
			{rateMenu && (
				<AddProductRate
					tableDataSelect={tableDataSelect}
					rateValue={rateValue}
					onClickByAdmin={onClickRate}
					handleOnClick={handleOnClick}
				/>
			)}
		</>
	);
}
export default memo(ProductVariantList);
