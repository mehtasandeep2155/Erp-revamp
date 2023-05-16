import { useEffect } from "react";
import ProductTypeListWeb from "./product-type-list-ui";
import useProductType from "./product-type-hook";
import { memo } from "react";
import { getType } from "@api/get-api-queries";

function ProductTypeList() {
	const {
		getAllProductType,
		onClick,
		tableData,
		fetchagain,
		typeValue,
		columns,
		loader,
		totalCount,
		page,
		rowsPerPage,
		handleChangePage,
		handleChangeRowsPerPage
	} = useProductType();
	const { types } = getType(page, rowsPerPage);

	useEffect(() => {
		getAllProductType();
	}, [types.isLoading, fetchagain, types.isRefetching, rowsPerPage, page]);

	const handleDelete = async (id: string) => {};

	return (
		<>
			<ProductTypeListWeb
				columns={columns}
				tableData={tableData}
				onClickByAdmin={onClick}
				onDelete={handleDelete}
				loading={loader}
				typeValue={typeValue}
				page={page}
				rowsPerPage={rowsPerPage}
				handleChangePage={handleChangePage}
				handleChangeRowsPerPage={handleChangeRowsPerPage}
				totalCount={totalCount}
			/>
		</>
	);
}
export default memo(ProductTypeList);
