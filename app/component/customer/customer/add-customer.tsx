import { Form, Formik } from "formik";
import { Input } from "@component/utils/form-fields";
import { CutomerProps } from "@component//utils/type/interfaces";
import { verifyForm, loginBtn, btnDiv } from "@css/styles";
import useHandleChange from "@component/utils/form/handle-change";
import { memo } from "react";
import { useValidation } from "@component/utils/form/validation";

const AddCustomer = (data: CutomerProps) => {
	const { customerValue, onClickByAdmin, purchase, props, setIsOpen } = data;
	const { CustomerSchema } = useValidation(customerValue);
	const handleCompanySubmit = (values: any) => {
		const castValues = CustomerSchema.cast(values);
		if (!purchase) {
			onClickByAdmin(castValues, "close", customerValue.id);
		} else {
			props.setFieldValue(["customer_id"], values);
			setIsOpen(false);
		}
	};

	const { handleChange } = useHandleChange("", "");

	return (
		<div className={verifyForm}>
			<Formik initialValues={customerValue} onSubmit={handleCompanySubmit} validationSchema={CustomerSchema}>
				{(props) => (
					<Form>
						<Input
							disabled={false}
							placeholder={"Enter a Customer Name"}
							name={"name"}
							onChange={handleChange}
							label={"Customer Name"}
							valueProps={props}
							error={"name"}
							value={props.values.name}
							require={true}
						/>
						<Input
							disabled={false}
							placeholder={"Enter a Customer Email"}
							name={"email"}
							onChange={handleChange}
							label={"Customer Email"}
							valueProps={props}
							error={"email"}
							value={props.values.email}
							require={true}
						/>
						<Input
							disabled={false}
							placeholder={"Enter a Customer Phone Number"}
							name={"phone"}
							onChange={handleChange}
							label={"Customer Phone Number"}
							valueProps={props}
							error={"phone"}
							require={true}
							value={props.values.phone}
						/>
						<div className={btnDiv}>
							<button className={loginBtn} type="submit">
								{customerValue.id ? "Save Changes" : "Add Customer"}
							</button>
						</div>
					</Form>
				)}
			</Formik>
		</div>
	);
};

export default memo(AddCustomer);
