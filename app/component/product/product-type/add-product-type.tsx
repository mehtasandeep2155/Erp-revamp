import { Form, Formik } from "formik";
import { Input, MultiSelectSearchInput } from "@component/utils/form-fields";
import { productTypeValuesType } from "@component/utils/type/interfaces";
import { verifyForm, btnDiv, formDiv, formControlProduct, flexCol2input } from "@css/styles";
import useHandleChange from "@component/utils/form/handle-change";
import { memo, useEffect } from "react";
import { getColor } from "@api/get-api-queries";
import { useValidation } from "@component/utils/form/validation";
import useColor from "../color/color-hook";
import { AddHeader } from "@component/commoncomponent/add-header";
import { IconButtons } from "@common/buttons";
import { cancleButton, submitButton, style } from "@css/mui-styles";
import { typeFormikFieldsData } from "@component/utils/helper";
import useProductType from "./product-type-hook";

const AddProductType = () => {
	const { onClick, typeValue } = useProductType();
	const { handleChange, handleDelete } = useHandleChange(typeValue, "");
	const { ProductTypeSchema } = useValidation(typeValue);

	const handleTypeSubmit = (values: productTypeValuesType) => {
		const castValues: any = ProductTypeSchema.cast(values);
		onClick(castValues, "close", typeValue.id);
	};

	const { colorList, getAllColorList } = useColor();
	const { colors } = getColor("", "");

	useEffect(() => {
		getAllColorList();
	}, [colors.isLoading]);

	return (
		<div className={verifyForm}>
			<AddHeader title={typeValue.id ? "Edit Coating" : "Add Coating"} />
			<Formik initialValues={typeValue} onSubmit={handleTypeSubmit} validationSchema={ProductTypeSchema}>
				{(props: any) => (
					<Form>
						<div className={formDiv}>
							<div className={flexCol2input}>
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
												handleDelete={handleDelete}
												inputStyle={formControlProduct}
											/>
										) : (
											<>
												<MultiSelectSearchInput
													onChange={handleChange}
													options={colorList}
													error={name}
													name={name}
													valueProps={props}
													value={props.values[name]}
													label={label}
													placeholder={placeholder}
													handleDelete={handleDelete}
													require={true}
													style={style}
												/>
											</>
										)}
									</>
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
