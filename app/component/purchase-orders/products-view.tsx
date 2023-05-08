import TableDetailsComponent from "@common/tables/details-table";
import { productViewColums } from "@component/utils/form/constant";

export default function ProductCard({ productDetailsList }: any) {
	return (
		<>
			{productDetailsList && (
				<TableDetailsComponent
					title="Product Rate List"
					columns={productViewColums}
					tableData={productDetailsList}
					loading={false}
					pagination={true}
				/>
			)}
		</>
	);
}
