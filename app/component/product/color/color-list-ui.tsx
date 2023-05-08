import TableComponent from "@common/tables/custom-table";
import { memo } from "react";
import { HeaderPage } from "@component/commoncomponent/common-components";
import { colorColumns } from "@component/utils/form/constant";
const ProductColorListWeb = (props: any) => {
	const { tableData, onClickByAdmin, onDelete, loading, colorValue } = props;

	return (
		<>
			<HeaderPage onClickByAdmin={onClickByAdmin} tableData={tableData} />
			<TableComponent
				title="Product Color List"
				tableData={tableData}
				columns={colorColumns}
				onDelete={onDelete}
				loading={loading}
				buttonTitle={colorValue.id ? "Edit Color" : "Add Color"}
				clickAction={onClickByAdmin}
			/>
		</>
	);
};
export default memo(ProductColorListWeb);
