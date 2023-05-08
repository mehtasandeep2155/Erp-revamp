import { Form, Formik } from "formik";
import { Input, AutoCompleteSelect } from "@component/utils/form-fields";
import { ProductVariantProps, productValuesType } from "@component/utils/type/interfaces";
import {
	verifyForm,
	btnDiv,
	flexInput,
	formDivProduct,
	uomDiv,
	formGroupProduct,
	inputError,
	formControlProduct,
	flexCol2input
} from "@css/styles";
import useHandleChange from "@component/utils/form/handle-change";
import { useValidation } from "@component/utils/form/validation";
import { memo, useEffect } from "react";
import useProduct from "./product-hook";
import { getProduct } from "@api/get-api-queries";
import { IconButtons } from "@common/buttons";
import { cancleButton, submitButton } from "@css/mui-styles";
import { AddHeader } from "@component/commoncomponent/add-header";
import { productFormikFieldsData, productFormikFieldsData1 } from "@component/utils/helper";

const AddProductVariant = (data: ProductVariantProps) => {
	const { variantvalues, onClickByAdmin } = data;
	const { handleChange } = useHandleChange("", "");
	const { varinatSectionNameList, getAllVariantList } = useProduct();
	const { ProductVariantSchema } = useValidation({ array: varinatSectionNameList, values: variantvalues });
	const handleProductVariantSubmit = (values: productValuesType) => {
		const castValues = ProductVariantSchema.cast(values);
		onClickByAdmin(castValues, "close", variantvalues.id);
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
			<AddHeader title={variantvalues.id ? "Edit Product" : "Add Product"} />
			<Formik
				initialValues={variantvalues}
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
													formGroupStyle={formGroupProduct}
													inputStyle={
														props.touched[name] && props.errors[name]
															? inputError
															: formControlProduct
													}
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
														formGroupStyle={formGroupProduct}
														inputStyle={
															props.touched[name] && props.errors[name]
																? inputError
																: formControlProduct
														}
													/>
												</>
											)}
										</>
									)
								)}
							</div>
							<div className={flexCol2input}>
								{productFormikFieldsData.map(
									({ placeholder, name, label, InputComponent, uomType }: any) => (
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
											inputStyle={
												props.touched[name] && props.errors[name]
													? inputError
													: formControlProduct
											}
										/>
									)
								)}
							</div>
						</div>
						<div className={btnDiv}>
							<IconButtons
								clickEvent={() => onClickByAdmin("", "model")}
								styles={cancleButton}
								lebel={"Cancel"}
								type="button"
							/>
							<IconButtons
								clickEvent={() => {}}
								styles={submitButton}
								lebel={variantvalues.id ? "Save" : "Next"}
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
