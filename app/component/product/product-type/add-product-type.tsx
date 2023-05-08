import { Form, Formik } from "formik";
import { Input, MultiCompanySelectInput } from "@component/utils/form-fields";
import { ProductTypeProps, productTypeValuesType } from "@component/utils/type/interfaces";
import { verifyForm, submitBtn, btnDiv, flexCol2input, formDiv } from "@css/styles";
import useHandleChange from "@component/utils/form/handle-change";
import { memo, useEffect } from "react";
import { getColor } from "@api/get-api-queries";
import { useValidation } from "@component/utils/form/validation";
import useColor from "../color/color-hook";
import { AddHeader } from "@component/commoncomponent/add-header";
import { IconButtons } from "@common/buttons";
import { cancleButton, submitButton } from "@css/mui-styles";

const AddProductType = (data: ProductTypeProps) => {
	const { typeValue, onClickByAdmin } = data;
	const { handleChange, companyName, handleDelete } = useHandleChange(typeValue, "");
	const { ProductTypeSchema } = useValidation(typeValue);
	const handleTypeSubmit = (values: productTypeValuesType) => {
		const castValues = ProductTypeSchema.cast(values);
		onClickByAdmin(castValues, "close", typeValue.id);
	};
	const { colorList, getAllColorList } = useColor();
	const { colors } = getColor();

	useEffect(() => {
		getAllColorList();
	}, [colors.isLoading]);

	return (
		<div className={verifyForm}>
			<AddHeader title={typeValue.id ? "Edit Coating" : "Add Coating"} />
			<Formik initialValues={typeValue} onSubmit={handleTypeSubmit} validationSchema={ProductTypeSchema}>
				{(props) => (
					<Form>
						<div className={formDiv}>
							<div className={flexCol2input}>
								<Input
									onChange={handleChange}
									error="type"
									name="type"
									valueProps={props}
									value={props.values.type}
									label={"Product Coating"}
									placeholder={"Enter Product Coating"}
									require={true}
								/>
								<MultiCompanySelectInput
									onChange={handleChange}
									itemName={companyName}
									options={colorList}
									error="colors"
									name="colors"
									valueProps={props}
									label={"Coating Colors"}
									placeholder={"Select Coating Color"}
									handleDelete={handleDelete}
									require={true}
								/>
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
								lebel={typeValue.id ? "Save" : "Next"}
								type="submit"
							/>
						</div>
					</Form>
				)}
			</Formik>
		</div>
	);
};
export default memo(AddProductType);
