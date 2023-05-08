import VariantCard from "@component/product/rate/variant-details";
import { useRouter } from "next/router";
import { getRate } from "@api/get-api-queries";
import { useEffect, useState } from "react";
import { detailsPage, backButton, flexWrapPgae } from "@css/styles";
import { ArrowBack } from "@mui/icons-material";
import { poEntriesList, productRateList } from "@component/utils/routes";

export default function VariantDetails() {
	const { rates } = getRate();
	const router = useRouter();
	const { query, pathname, push } = router;
	const [variantObj, setVariantObj] = useState({});

	const handleBack = () => {
		if (query.subPath === "po-entries") {
			push(poEntriesList);
		} else {
			push(productRateList);
		}
	};

	useEffect(() => {
		router.prefetch(pathname);
		getDetails();
	}, [rates.isLoading, router]);

	const getDetails = async () => {
		let data = await rates.data;
		if (!rates.isLoading) {
			if (query.id) {
				let obj = data.find((item: any) => item.id === query.id);
				setVariantObj(obj.product);
			}
		}
	};

	return (
		<div>
			<div className={detailsPage}>
				<ArrowBack className={backButton} onClick={handleBack} />
				<div className={flexWrapPgae}>
					<VariantCard variantObj={variantObj} />
				</div>
			</div>
		</div>
	);
}
