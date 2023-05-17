import { useRouter } from "next/router";
import { getPurchaseOrders } from "@api/get-api-queries";
import { useEffect, useState } from "react";
import { detailsPage, backButton, flexWrapPgae, detailsViewBut } from "@css/styles";
import { ArrowBack } from "@mui/icons-material";
import {
	InTransitList,
	coatingDoneList,
	coatingInProgressList,
	coatingReadyList,
	productRateList,
	purchaseOrderList,
	DispatchReadyList,
	DispatchedList
} from "@component/utils/routes";
import { PoEntriesViewColums } from "@component/utils/form/constant";
import TableDetailsComponent from "@common/tables/details-table";

export default function PoEntriesDetails() {
	const { purchaseOrderds } = getPurchaseOrders("", "", "");
	const router = useRouter();
	const { query, pathname, push } = router;
	const [poEntriesObj, setpoEntriesObj] = useState([]);

	useEffect(() => {
		router.prefetch(pathname);
		getDetails();
	}, [purchaseOrderds.isLoading, router]);

	const handleBack = () => {
		if (query.subPath === "initiated") {
			push(purchaseOrderList);
		} else if (query.subPath === "coating-finished") {
			push(coatingDoneList);
		} else if (query.subPath === "coating-processing") {
			push(coatingInProgressList);
		} else if (query.subPath === "coating-initiated") {
			push(coatingReadyList);
		} else if (query.subPath === "in-transit") {
			push(InTransitList);
		} else if (query.subPath === "ready-for-dispatch") {
			push(DispatchReadyList);
		} else if (query.subPath === "finished") {
			push(DispatchedList);
		} else {
			push(productRateList);
		}
	};

	const getDetails = async () => {
		let data = await purchaseOrderds.data;
		if (!purchaseOrderds.isLoading) {
			if (query.id) {
				let obj: any = data.find((item: any) => item.id === query.id);
				obj.po_entries.map((item: any) => {
					setpoEntriesObj([
						...poEntriesObj,
						[
							item.rate.product ? <span className={detailsViewBut}>{item.rate.product.name}</span> : "_",
							item.rate.coating_type
								? `${
										item.rate.coating_type.type.charAt(0).toUpperCase() +
										item.rate.coating_type.type.slice(1)
								  } #${item.rate.coating_type.code} `
								: "_",
							item.rate.rate,
							item.length,
							item.quantity,
							`${item.color.color.charAt(0).toUpperCase() + item.color.color.slice(1)} #${
								item.color.code
							} `,
							`${item.weight} ${item.weightUom != null ? item.weightUom.type : ""}`
						]
					]);
				});
			}
		}
	};

	return (
		<div>
			<div className={detailsPage}>
				<ArrowBack className={backButton} onClick={handleBack} />
				<div className={flexWrapPgae}>
					<div>
						<h4>Po Entries Details:</h4>
						<TableDetailsComponent
							title="Purchase Order Details"
							columns={PoEntriesViewColums}
							tableData={poEntriesObj}
							loading={false}
							pagination={false}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
