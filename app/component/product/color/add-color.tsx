import { Form, Formik } from "formik";
import { Input } from "@component/utils/form-fields";
import { ProductColorProps, productColorValuesEditType } from "@component//utils/type/interfaces";
import { verifyModelForm, dialogBtnDiv, flexInput, formColorControl, formGroupProduct } from "@css/styles";
import useHandleChange from "@component/utils/form/handle-change";
import { memo } from "react";
import { IconButtons } from "@common/buttons";
import { submitButton } from "@css/mui-styles";
import { colorFormikFieldsData } from "@component/utils/helper";

const AddProductColor = (data: ProductColorProps) => {
	const { handleChange } = useHandleChange("", "");
	const { colorValue, onClickByAdmin, validation } = data;

	const handleColorSubmit = (values: productColorValuesEditType) => {
		const castValues = validation.cast(values);
		onClickByAdmin(castValues, "close", colorValue.id);
	};

	return (
		<div className={verifyModelForm}>
			<Formik initialValues={colorValue} onSubmit={handleColorSubmit} validationSchema={validation}>
				{(props) => (
					<Form>
						<div className={flexInput}>
							{colorFormikFieldsData.map(({ placeholder, name, label }: any) => (
								<Input
									disabled={false}
									placeholder={placeholder}
									name={name}
									onChange={handleChange}
									label={label}
									valueProps={props}
									error={name}
									value={props.values[name]}
									require={true}
									formGroupStyle={formGroupProduct}
									inputStyle={formColorControl}
								/>
							))}
						</div>
						<div className={dialogBtnDiv}>
							<IconButtons
								clickEvent={() => {}}
								styles={submitButton}
								lebel={colorValue.id ? "Save" : "Add"}
								type="submit"
							/>
						</div>
					</Form>
				)}
			</Formik>
		</div>
	);
};
export default memo(AddProductColor);
