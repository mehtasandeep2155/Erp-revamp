import TableDetailsComponent from "@common/tables/details-table";
import useConstant from "@component/utils/form/constant";

export default function ProductCard({ productDetailsList }: any) {
	const { productViewColums } = useConstant();
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
