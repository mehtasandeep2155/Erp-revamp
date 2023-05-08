import { Form, Formik } from "formik";
import { Input, AutoCompleteSelect } from "@component/utils/form-fields";
import { ProductVariantProps, productValuesType } from "@component/utils/type/interfaces";
import { verifyForm, btnDiv, flexInput, formDivProduct, uomDiv } from "@css/styles";
import useHandleChange from "@component/utils/form/handle-change";
import { useValidation } from "@component/utils/form/validation";
import { memo, useEffect } from "react";
import useProduct from "./product-hook";
import { getProduct } from "@api/get-api-queries";
import { IconButtons } from "@common/buttons";
import { cancleButton, submitButton } from "@css/mui-styles";
import { AddHeader } from "@component/commoncomponent/add-header";

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
								<AutoCompleteSelect
									disabled={true}
									options={varinatSectionNameList}
									placeholder={"Enter Product Name"}
									name={"name"}
									onChange={handleChange}
									label={"Product Name"}
									valueProps={props}
									optionLebel="name"
									error={"name"}
									value={props.values.name}
									require={true}
								/>
								<Input
									disabled={false}
									placeholder={"Enter Product height"}
									name={"height"}
									onChange={handleChange}
									label={"Height"}
									valueProps={props}
									error={"height"}
									value={props.values.height}
									uom={<span className={uomDiv}>mm</span>}
								/>
								<Input
									disabled={false}
									placeholder={"Enter a width"}
									name={"width"}
									onChange={handleChange}
									label={"Width"}
									valueProps={props}
									error={"width"}
									value={props.values.width}
									uom={<span className={uomDiv}>mm</span>}
								/>
							</div>
							<div className={flexInput}>
								<Input
									disabled={false}
									placeholder={"Enter Product Thickness"}
									name={"thickness"}
									onChange={handleChange}
									label={"Thickness"}
									valueProps={props}
									error={"thickness"}
									value={props.values.thickness}
									uom={<span className={uomDiv}>mm</span>}
								/>
								<Input
									disabled={false}
									placeholder={"Enter a Length"}
									name={"length"}
									onChange={handleChange}
									label={"Length"}
									valueProps={props}
									error={"length"}
									value={props.values.length}
									uom={<span className={uomDiv}>ft</span>}
								/>
								<Input
									disabled={false}
									placeholder={"Enter a weight"}
									name={"weight"}
									onChange={handleChange}
									label={"Weight"}
									valueProps={props}
									error={"weight"}
									value={props.values.weight}
									require={true}
									uom={<span className={uomDiv}>kg</span>}
								/>
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
