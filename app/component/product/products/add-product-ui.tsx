import { Form, Formik } from "formik";
import { Input, AutoCompleteSelect } from "@component/utils/form-fields";
import {
	verifyForm,
	btnDiv,
	flexInput,
	formDivProduct,
	uomDiv,
	formGroupProduct,
	formControlProduct
} from "@css/styles";
import useHandleChange from "@component/utils/form/handle-change";
import { useValidation } from "@component/utils/form/validation";
import { memo, useEffect } from "react";
import useProduct from "./product-hook";
import { getProduct } from "@api/get-api-queries";
import { IconButtons } from "@common/buttons";
import { cancleButton, style, submitButton } from "@css/mui-styles";
import { AddHeader } from "@component/commoncomponent/add-header";
import { productFormikFieldsData, productFormikFieldsData1 } from "@component/utils/helper";

const AddProductVariant = () => {
	const { handleChange } = useHandleChange("", "");
	const { varinatSectionNameList, getAllVariantList, variantvalue, onClick } = useProduct();
	const { ProductVariantSchema } = useValidation({ array: varinatSectionNameList, values: variantvalue });
	const handleProductVariantSubmit = (values: any) => {
		const castValues = ProductVariantSchema.cast(values);
		onClick(castValues, "close", variantvalue.id);
	};
	const { products } = getProduct();

	useEffect(() => {
		getAllVariantList();
	}, [products.isLoading, products.isRefetching]);

	useEffect(() => {
		products.refetch();
	}, []);

	return (
		<div className={verifyForm}>
			<AddHeader title={variantvalue.id ? "Edit Product" : "Add Product"} />
			<Formik
				initialValues={variantvalue}
				onSubmit={handleProductVariantSubmit}
				validationSchema={ProductVariantSchema}
			>
				{(props) => (
					<Form>
						<div className={formDivProduct}>
							<div className={flexInput}>
								{productFormikFieldsData1.map(
									({ placeholder, name, label, InputComponent, uomType }: any) => (
										<>
											{InputComponent !== "input" ? (
												<AutoCompleteSelect
													disabled={true}
													options={varinatSectionNameList}
													placeholder={placeholder}
													name={name}
													onChange={handleChange}
													label={label}
													valueProps={props}
													optionLebel={name}
													error={name}
													value={props.values[name]}
													require={true}
													style={style}
												/>
											) : (
												<>
													<Input
														disabled={false}
														placeholder={placeholder}
														name={name}
														onChange={handleChange}
														label={label}
														valueProps={props}
														error={name}
														value={props.values[name]}
														uom={uomType && <span className={uomDiv}>{uomType}</span>}
														inputStyle={formControlProduct}
													/>
												</>
											)}
										</>
									)
								)}
							</div>
							<div className={flexInput}>
								{productFormikFieldsData.map(({ placeholder, name, label, uomType }: any) => (
									<Input
										disabled={false}
										placeholder={placeholder}
										name={name}
										onChange={handleChange}
										label={label}
										valueProps={props}
										error={name}
										value={props.values[name]}
										uom={uomType && <span className={uomDiv}>{uomType}</span>}
										formGroupStyle={formGroupProduct}
										inputStyle={formControlProduct}
									/>
								))}
							</div>
						</div>
						<div className={btnDiv}>
							<IconButtons
								clickEvent={() => onClick("", "model", "")}
								styles={cancleButton}
								lebel={"Cancel"}
								type="button"
							/>
							<IconButtons
								clickEvent={() => {}}
								styles={submitButton}
								lebel={variantvalue.id ? "Save" : "Next"}
								type="submit"
							/>
						</div>
					</Form>
				)}
			</Formik>
		</div>
	);
};
export default memo(AddProductVariant);
