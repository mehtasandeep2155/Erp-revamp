import { Form, Formik } from "formik";
import { Input } from "@component/utils/form-fields";
import { CutomerProps } from "@component//utils/type/interfaces";
import {
	moveForm,
	justifyBetween,
	drawerTitle,
	formGroupWithLabel,
	inputError,
	formControlMove,
	tablePoActionMoveForm,
	inputErrorCustomer
} from "@css/styles";
import useHandleChange from "@component/utils/form/handle-change";
import { memo } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { useValidation } from "@component/utils/form/validation";
import { cursorPointer, moveButton } from "@css/mui-styles";
import { IconButtons } from "@common/buttons";

const AddCustomer = (data: CutomerProps) => {
	const { customerValue, onClickByAdmin, purchase, props, setIsOpen, tableData } = data;
	const { CustomerSchema } = useValidation(customerValue);
	const handleCompanySubmit = (values: any) => {
		try {
			const castValues = CustomerSchema.cast(values);
			if (!purchase) {
				onClickByAdmin(castValues, "close", customerValue.id);
			} else {
				props.setFieldValue(["customer_id"], values);
				setIsOpen(false);
			}
		} catch (err) {
			console.log(err);
		}
	};

	const { handleChange } = useHandleChange("", "");

	return (
		<div className={moveForm}>
			<div className={justifyBetween}>
				<span className={drawerTitle}>Add Customer</span>
				<CloseIcon sx={cursorPointer} onClick={() => onClickByAdmin("", "model", "")} />
			</div>
			<Formik initialValues={customerValue} onSubmit={handleCompanySubmit} validationSchema={CustomerSchema}>
				{(props) => (
					<Form className={tablePoActionMoveForm}>
						<Input
							disabled={false}
							name={"name"}
							onChange={handleChange}
							label={"Customer Name"}
							valueProps={props}
							error={"name"}
							value={props.values.name}
							require={true}
							formGroupStyle={formGroupWithLabel}
							inputStyle={
								props.touched["name"] && props.errors["name"] ? inputErrorCustomer : formControlMove
							}
						/>
						<Input
							disabled={false}
							name={"email"}
							onChange={handleChange}
							label={"Customer Email"}
							valueProps={props}
							error={"email"}
							value={props.values.email}
							require={true}
							formGroupStyle={formGroupWithLabel}
							inputStyle={
								props.touched["email"] && props.errors["email"] ? inputErrorCustomer : formControlMove
							}
						/>
						<Input
							disabled={false}
							name={"phone"}
							onChange={handleChange}
							label={"Customer Phone Number"}
							valueProps={props}
							error={"phone"}
							require={true}
							value={props.values.phone}
							formGroupStyle={formGroupWithLabel}
							inputStyle={
								props.touched["phone"] && props.errors["phone"] ? inputErrorCustomer : formControlMove
							}
						/>
						<IconButtons
							styles={moveButton}
							type="submit"
							lebel={customerValue.id ? "Save Changes" : "Add"}
						/>
					</Form>
				)}
			</Formik>
		</div>
	);
};

export default memo(AddCustomer);
