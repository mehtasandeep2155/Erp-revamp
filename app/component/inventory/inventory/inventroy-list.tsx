import { memo, useEffect } from "react";
import InventoryListWeb from "./inventroy-list-ui";
import { useValidation } from "@component/utils/form/validation";
import AddInventoryView from "./add-inventory-ui";
import CustomizedDialogs from "@common/dailog/dailog-model";
import useInventory from "./inventroy-hook";
import { getInventory, getProduct } from "@api/get-api-queries";
import useProduct from "@component/product/products/product-hook";

function InventroyViewList() {
	const { coloums, fetchagain, menu, getAllInventoryViewList, TableData, onClick, inventoryvalue, loader } =
		useInventory();
	const { inventries } = getInventory();
	const { ProductSchema } = useValidation(inventoryvalue);
	const { tableDataSelect, getAllVariantList } = useProduct();
	const { products } = getProduct();

	useEffect(() => {
		getAllVariantList();
		getAllInventoryViewList();
	}, [inventries.isLoading, fetchagain, inventries.isRefetching, products.isLoading]);

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
				title="Inventory"
				isOpen={menu}
				handleClose={onClick}
				content={
					<AddInventoryView
						inventoryvalue={inventoryvalue}
						validation={ProductSchema}
						onClickByAdmin={onClick}
						tableDataSelect={tableDataSelect}
					/>
				}
			/>
		</>
	);
}
export default memo(InventroyViewList);
