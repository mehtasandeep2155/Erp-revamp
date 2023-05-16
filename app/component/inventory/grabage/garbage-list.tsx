import { memo, useEffect } from "react";
import GarbageListWeb from "./garbage-list-ui";
import AddGarbage from "./add-garbage";
import CustomizedDialogs from "@common/dailog/dailog-model";
import useGarbage from "./garbage-hook";
import { getGarbage, getProduct } from "@api/get-api-queries";
import useProduct from "@component/product/products/product-hook";

function GarbageList() {
	const { coloums, fetchagain, menu, getGarbageList, TableData, onClick, GarbageValue, loader } = useGarbage();
	const { garbages } = getGarbage();
	const { tableDataSelect, getAllVariantList } = useProduct();
	const { products } = getProduct("", "");

	useEffect(() => {
		getGarbageList();
		getAllVariantList();
	}, [garbages.isLoading, fetchagain, garbages.isRefetching, products.isLoading]);

	const handleDelete = async (id: string) => {};

	return (
		<>
			<GarbageListWeb
				tableData={TableData}
				coloums={coloums}
				onClickByAdmin={onClick}
				onDelete={handleDelete}
				loading={loader}
			/>
			<CustomizedDialogs
				title="Garbage"
				isOpen={menu}
				handleClose={onClick}
				content={
					<AddGarbage
						garbageValues={GarbageValue}
						onClickByAdmin={onClick}
						tableDataSelect={tableDataSelect}
					/>
				}
			/>
		</>
	);
}
export default memo(GarbageList);
