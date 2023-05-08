import { Form, Formik } from "formik";
import { Input } from "@component/utils/form-fields";
import { ProductColorProps, productColorValuesEditType } from "@component//utils/type/interfaces";
import { verifyModelForm, dialogBtnDiv, flexInput } from "@css/styles";
import useHandleChange from "@component/utils/form/handle-change";
import { memo } from "react";
import { IconButtons } from "@common/buttons";
import { submitButton } from "@css/mui-styles";

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
							<Input
								disabled={false}
								placeholder={"Enter Color Name"}
								name={"color"}
								onChange={handleChange}
								label={"Color Name"}
								valueProps={props}
								error={"color"}
								value={props.values.color}
								require={true}
							/>
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
