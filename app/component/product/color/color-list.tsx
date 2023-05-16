import { memo, useEffect } from "react";
import ProductColorListWeb from "./color-list-ui";
import { useValidation } from "@component/utils/form/validation";
import AddProductColor from "./add-color";
import CustomizedDialogs from "@common/dailog/dailog-model";
import useColor from "./color-hook";
import { getColor } from "@api/get-api-queries";

function ProductColorList() {
	const {
		menu,
		fetchagain,
		tableData,
		getAllColorList,
		rowsPerPage,
		page,
		handleChangePage,
		handleChangeRowsPerPage,
		colorValue,
		onClick,
		loader,
		totalCount
	} = useColor();
	const { colors } = getColor(page, rowsPerPage);
	useEffect(() => {
		getAllColorList();
	}, [colors.isLoading, fetchagain, colors.isRefetching, rowsPerPage, page]);

	const { ProductColorSchema } = useValidation(colorValue);

	const handleDelete = async (id: string) => {};
	return (
		<>
			<ProductColorListWeb
				tableData={tableData}
				onClickByAdmin={onClick}
				onDelete={handleDelete}
				loading={loader}
				colorValue={colorValue}
				handleChangeRowsPerPage={handleChangeRowsPerPage}
				handleChangePage={handleChangePage}
				rowsPerPage={rowsPerPage}
				page={page}
				totalCount={totalCount}
			/>
			<CustomizedDialogs
				title={colorValue.id ? "Edit Color" : "Add Color"}
				width={"xs"}
				isOpen={menu}
				handleClose={onClick}
				content={
					<AddProductColor colorValue={colorValue} validation={ProductColorSchema} onClickByAdmin={onClick} />
				}
			/>
		</>
	);
}
export default memo(ProductColorList);
