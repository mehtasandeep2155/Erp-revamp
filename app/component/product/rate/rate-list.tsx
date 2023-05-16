import { memo, useEffect } from "react";
import ProductRateListWeb from "./rate-list-ui";
import useRate from "./rate-hook";
import useProduct from "../products/product-hook";
import { getRate } from "@api/get-api-queries";

function ProductDeminsionList() {
	const {
		getAllRateList,
		tableData,
		onClick,
		fetchagain,
		columns,
		loader,
		handleOnClick,
		getAllList,
		menu,
		rateValue,
		page,
		rowsPerPage
	} = useRate();

	const { tableDataSelect, getAllVariantList } = useProduct();
	const { rates } = getRate(page, rowsPerPage);

	useEffect(() => {
		getAllRateList();
		getAllList();
		getAllVariantList();
	}, [rates.isLoading, fetchagain, rates.isRefetching]);

	return (
		<>
			<ProductRateListWeb
				columns={columns}
				tableData={tableData}
				onClickByAdmin={onClick}
				isOpen={menu}
				loading={loader}
				rateValue={rateValue}
				tableDataSelect={tableDataSelect}
				handleOnClick={handleOnClick}
			/>
		</>
	);
}
export default memo(ProductDeminsionList);
