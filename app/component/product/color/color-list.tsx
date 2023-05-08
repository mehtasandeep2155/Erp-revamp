import { memo, useEffect } from "react";
import ProductColorListWeb from "./color-list-ui";
import { useValidation } from "@component/utils/form/validation";
import AddProductColor from "./add-color";
import CustomizedDialogs from "@common/dailog/dailog-model";
import useColor from "./color-hook";
import { getColor } from "@api/get-api-queries";

function ProductColorList() {
	const { menu, fetchagain, tableData, getAllColorList, colorValue, columns, onClick, loader } = useColor();
	const { colors } = getColor();
	useEffect(() => {
		getAllColorList();
	}, [colors.isLoading, fetchagain, colors.isRefetching]);

	const { ProductColorSchema } = useValidation(colorValue);

	const handleDelete = async (id: string) => {};
	return (
		<>
			<ProductColorListWeb
				tableData={tableData}
				columns={columns}
				onClickByAdmin={onClick}
				onDelete={handleDelete}
				loading={loader}
				colorValue={colorValue}
			/>
			<CustomizedDialogs
				title="Add Color"
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
