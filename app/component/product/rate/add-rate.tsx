import { Form, Formik } from "formik";
import { memo, useEffect } from "react";
import { Input, AutoCompleteSeacrhSelect, MultiSelectInput } from "@component/utils/form-fields";
import { ProductRateProps } from "@component/utils/type/interfaces";
import {
	verifyForm,
	btnDiv,
	flexCol2input,
	formDiv,
	flex,
	formGroupProduct,
	inputError,
	formControlProduct,
	flexCol2Autoinput
} from "@css/styles";
import useHandleChange from "@component/utils/form/handle-change";
import useRate from "./rate-hook";
import { variantViewColums } from "@component/utils/form/constant";
import { getColor } from "@api/get-api-queries";
import VariantCard from "./variant-details";
import { useValidation } from "@component/utils/form/validation";
import { AddHeader } from "@component/commoncomponent/add-header";
import { IconButtons } from "@common/buttons";
import { cancleButton, submitButton } from "@css/mui-styles";

const AddProductRate = (data: ProductRateProps) => {
	const { handleChange } = useHandleChange("", "");
	const { rateValue, onClickByAdmin, tableDataSelect, handleOnClick } = data;
	const { getAllList, productVariantlist, productTypelist } = useRate();
	const { colors } = getColor();
	const { ProductRateSchema } = useValidation(rateValue);

	const handleRateSubmit = (values: any) => {
		const castValues: any = ProductRateSchema.cast(values);
		onClickByAdmin(castValues, "close", rateValue.id);
	};

	useEffect(() => {
		getAllList();
	}, [colors.isLoading]);

	return (
		<div className={verifyForm}>
			<AddHeader title={rateValue.id ? "Edit Product Rate" : "Product Rate"} />
			<Formik initialValues={rateValue} onSubmit={handleRateSubmit} validationSchema={ProductRateSchema}>
				{(props) => (
					<Form>
						<div className={flex}>
							<div className={formDiv}>
								<div className={flexCol2Autoinput}>
									<MultiSelectInput
										onChange={handleChange}
										productRateDetails={{}}
										options={productVariantlist}
										error="productId"
										name="productId"
										valueProps={props}
										disabled={false}
										label={"Product"}
										placeholder={"Select Product"}
										value={props.values.productId}
										require={true}
										handleOnClick={handleOnClick}
										columdata={tableDataSelect}
										colums={variantViewColums}
										formGroupStyle={formGroupProduct}
										inputStyle={
											props.touched["productId"] && props.errors["productId"]
												? inputError
												: formControlProduct
										}
									/>
									<AutoCompleteSeacrhSelect
										onChange={handleChange}
										options={productTypelist}
										error="typeId"
										name="typeId"
										valueProps={props}
										label={"Coating Type"}
										placeholder={"Select Coating Type"}
										value={props.values.typeId}
										require={true}
										formGroupStyle={formGroupProduct}
										inputStyle={
											props.touched["productId"] && props.errors["productId"]
												? inputError
												: formControlProduct
										}
									/>
								</div>
								<div className={flexCol2input}>
									<Input
										disabled={false}
										placeholder={"Enter Product Rate"}
										name={"rate"}
										onChange={handleChange}
										label={"Rate"}
										valueProps={props}
										error={"rate"}
										value={props.values.rate}
										require={true}
										formGroupStyle={formGroupProduct}
										inputStyle={
											props.touched["productId"] && props.errors["productId"]
												? inputError
												: formControlProduct
										}
									/>
								</div>
							</div>
							<div>
								<VariantCard variantObj={props.values.productId} />
							</div>
						</div>
						<div className={btnDiv}>
							<IconButtons
								clickEvent={() => onClickByAdmin("", "model", "")}
								styles={cancleButton}
								lebel={"Cancel"}
								type="button"
							/>
							<IconButtons
								clickEvent={() => {}}
								styles={submitButton}
								lebel={rateValue.id ? "Save" : "Next"}
								type="submit"
							/>
						</div>
					</Form>
				)}
			</Formik>
		</div>
	);
};

export default memo(AddProductRate);
