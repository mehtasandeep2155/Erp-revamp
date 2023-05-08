import { Form, Formik } from "formik";
import { Input, MultiCompanySelectInput } from "@component/utils/form-fields";
import { ProductTypeProps, productTypeValuesType } from "@component/utils/type/interfaces";
import {
	verifyForm,
	formGroupMultiSelect,
	btnDiv,
	flexCol2Autoinput,
	formDiv,
	formControlProduct,
	inputError,
	formGroupProduct
} from "@css/styles";
import useHandleChange from "@component/utils/form/handle-change";
import { memo, useEffect } from "react";
import { getColor } from "@api/get-api-queries";
import { useValidation } from "@component/utils/form/validation";
import useColor from "../color/color-hook";
import { AddHeader } from "@component/commoncomponent/add-header";
import { IconButtons } from "@common/buttons";
import { cancleButton, submitButton } from "@css/mui-styles";
import { typeFormikFieldsData } from "@component/utils/helper";

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
							<div className={flexCol2Autoinput}>
								{typeFormikFieldsData.map(({ placeholder, name, label, InputComponent }: any) => (
									<>
										{InputComponent === "input" ? (
											<Input
												onChange={handleChange}
												error={name}
												name={name}
												valueProps={props}
												value={props.values[name]}
												label={label}
												placeholder={placeholder}
												require={true}
												itemName={companyName}
												options={colorList}
												handleDelete={handleDelete}
												formGroupStyle={formGroupProduct}
												inputStyle={
													props.touched[name] && props.errors[name]
														? inputError
														: formControlProduct
												}
											/>
										) : (
											<MultiCompanySelectInput
												onChange={handleChange}
												itemName={companyName}
												options={colorList}
												error={name}
												name={name}
												valueProps={props}
												label={label}
												placeholder={placeholder}
												handleDelete={handleDelete}
												require={true}
												formGroupStyle={formGroupMultiSelect}
												inputStyle={
													props.touched[name] && props.errors[name]
														? inputError
														: formControlProduct
												}
											/>
										)}
									</>
								))}
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
