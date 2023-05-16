import { useEffect, memo } from "react";
import PoEntriesListWeb from "./po-entries-list-ui";
import { useValidation } from "@component/utils/form/validation";
import CustomizedDialogs from "@common/dailog/dailog-model";
import AddPoEntries from "./add-po-entries";
import usePoEntries from "./po-entries-hook";
import { getColor, getPoentries, getRate } from "@api/get-api-queries";

function PoEntriesList() {
	const { colors } = getColor("", "");
	const { rates } = getRate("", "");
	const {
		getAllProducList,
		onClick,
		columns,
		tableData,
		poEntriesValue,
		menu,
		fetchagain,
		loader,
		getAllList,
		handleOnClick,
		productRatelist,
		handleOnClickPurchase,
		productUserlist
	} = usePoEntries();
	const { poentries } = getPoentries("", "");
	const { ProductSchema } = useValidation(poEntriesValue);

	useEffect(() => {
		getAllList();
		getAllProducList();
	}, [poentries.isLoading, fetchagain, rates.isLoading, colors.isLoading, poentries.isRefetching]);

	useEffect(() => {
		poentries.refetch();
	}, []);

	const handleDelete = async (id: string) => {};
	return (
		<>
			<PoEntriesListWeb
				columns={columns}
				tableData={tableData}
				onClickByAdmin={onClick}
				onDelete={handleDelete}
				loading={loader}
			/>
			<CustomizedDialogs
				title="Po Entries"
				isOpen={menu}
				width="sm"
				handleClose={onClick}
				content={
					<AddPoEntries
						productRatelist={productRatelist}
						handleOnClick={handleOnClick}
						productUserlist={productUserlist}
						handleOnClickPurchase={handleOnClickPurchase}
						poEntriesValue={poEntriesValue}
						validation={ProductSchema}
						handelSubmit={onClick}
						poOpen={false}
					/>
				}
			/>
		</>
	);
}
export default memo(PoEntriesList);
