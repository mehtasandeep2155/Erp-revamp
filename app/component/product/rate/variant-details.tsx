import ProductCardComponent from "@common/card-component";
import {
	flexBoxVariant,
	productCardRate,
	productHedaing,
	productTitle,
	variantDetails,
	flexBoxProduct,
	flexBoxDiv
} from "@css/styles";

export default function VariantCard({ variantObj }: any) {
	return (
		<>
			{variantObj && Object.keys(variantObj).length > 0 && (
				<div className={variantDetails}>
					<ProductCardComponent
						className={productCardRate}
						children={
							<>
								<div>
									<div className={flexBoxProduct}>
										<h5 className={productHedaing}>Product Name:</h5>
										<span className={productTitle}>{variantObj.name}</span>
									</div>
									<div className={flexBoxVariant}>
										<h5 className={productHedaing}>Height (mm):</h5>
										<span className={productTitle}>{variantObj.height}</span>
									</div>
									<div className={flexBoxDiv}>
										<h5 className={productHedaing}>Width (mm):</h5>
										<span className={productTitle}>{variantObj.width}</span>
									</div>
									<div className={flexBoxVariant}>
										<h5 className={productHedaing}>Thickness (mm):</h5>
										<span className={productTitle}>{variantObj.thickness}</span>
									</div>
									<div className={flexBoxDiv}>
										<h5 className={productHedaing}>Weight (kg):</h5>
										<span className={productTitle}>
											{variantObj.weight}
											{variantObj.weightUom != null ? variantObj.weightUom.type : ""}
										</span>
									</div>
									<div className={flexBoxVariant}>
										<h5 className={productHedaing}>Length (ft):</h5>
										<span className={productTitle}>{variantObj.length}</span>
									</div>
								</div>
							</>
						}
					/>
				</div>
			)}
		</>
	);
}
