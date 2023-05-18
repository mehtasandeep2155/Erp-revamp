import { memo, useEffect } from "react";
import ProductVariantListWeb from "./product-list-ui";
import useProduct from "./product-hook";
import { getProduct, getRate } from "@api/get-api-queries";
import useRate from "../rate/rate-hook";

function ProductVariantList() {
	const {
		tableDataSelect,
		TableData,
		getAllList,
		onClick,
		getAllRateList,
		loader,
		totalCount,
		rowsPerPage,
		fetchagain,
		page,
		handleChangePage,
		handleChangeRowsPerPage
	} = useProduct();
	const { columns } = useRate();
	const { rates } = getRate(page, rowsPerPage);

	const { products } = getProduct("", "");

	useEffect(() => {
		getAllRateList();
		getAllList();
	}, [rates.isLoading, fetchagain, rates.isRefetching, products.isLoading]);

	const handleDelete = async (id: string) => {};

	return (
		<>
			<ProductVariantListWeb
				tableData={TableData}
				coloums={columns}
				onDelete={handleDelete}
				loading={loader}
				onClickByAdmin={onClick}
				handleChangeRowsPerPage={handleChangeRowsPerPage}
				handleChangePage={handleChangePage}
				rowsPerPage={rowsPerPage}
				page={page}
				totalCount={totalCount}
			/>
		</>
	);
}
export default memo(ProductVariantList);
