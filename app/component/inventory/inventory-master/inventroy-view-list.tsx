import { memo, useEffect } from "react";
import InventoryListWeb from "./inventroy-view-list-ui";
import { useValidation } from "@component/utils/form/validation";
import AddInventoryView from "./add-inventoryview-ui";
import CustomizedDialogs from "@common/dailog/dailog-model";
import useInventoryView from "./inventroy-view-hook";
import VariantCard from "@component/product/rate/variant-details";
import { getInventoryMaster, getProduct } from "@api/get-api-queries";
import useProduct from "@component/product/products/product-hook";

function InventroyList() {
	const {
		coloums,
		fetchagain,
		menu,
		getAllInventoryViewList,
		TableData,
		onClick,
		InvevtoryViewvalue,
		loader,
		isOpenVariant,
		handleView,
		variantObj
	} = useInventoryView();

	const { inventoryviews } = getInventoryMaster();
	const { ProductSchema } = useValidation(InvevtoryViewvalue);
	const { tableDataSelect, getAllVariantList } = useProduct();
	const { products } = getProduct();

	useEffect(() => {
		getAllInventoryViewList();
		getAllVariantList();
	}, [inventoryviews.isLoading, fetchagain, inventoryviews.isRefetching, products.isLoading]);

	const handleDelete = async (id: string) => {};

	return (
		<>
			<InventoryListWeb
				tableData={TableData}
				coloums={coloums}
				onClickByAdmin={onClick}
				onDelete={handleDelete}
				loading={loader}
			/>
			<CustomizedDialogs
				title="Inventory Master"
				isOpen={menu}
				handleClose={onClick}
				content={
					<AddInventoryView
						invevtoryViewvalue={InvevtoryViewvalue}
						validation={ProductSchema}
						onClickByAdmin={onClick}
						tableDataSelect={tableDataSelect}
					/>
				}
			/>
			<CustomizedDialogs
				title="Variants"
				isOpen={isOpenVariant}
				handleClose={handleView}
				width="md"
				content={<VariantCard variantObj={variantObj} />}
			/>
		</>
	);
}
export default memo(InventroyList);
