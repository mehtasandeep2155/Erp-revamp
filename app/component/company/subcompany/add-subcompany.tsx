import { Form, Formik } from "formik";
import { Input } from "@component/utils/form-fields";
import { SubCompanyProps, SubCompanyValuesType } from "@component//utils/type/interfaces";
import { verifyForm, loginBtn, btnDiv } from "@css/styles";
import useHandleChange from "@component/utils/form/handle-change";
import { memo } from "react";

const AddSubCompany = (data: SubCompanyProps) => {
	const { handleChange } = useHandleChange("", "");
	const { subCompanyValue, onClickByAdmin, validation } = data;
	const handleSubCompanySubmit = (values: SubCompanyValuesType) => {
		const castValues = validation.cast(values);
		onClickByAdmin(castValues, "close", subCompanyValue.id);
	};

	return (
		<div className={verifyForm}>
			<Formik initialValues={subCompanyValue} onSubmit={handleSubCompanySubmit} validationSchema={validation}>
				{(props) => (
					<Form>
						<Input
							disabled={false}
							placeholder={"Enter a Sub Company Name"}
							name={"name"}
							onChange={handleChange}
							label={"Sub Company Name"}
							valueProps={props}
							error={"name"}
							value={props.values.name}
							require={true}
						/>
						<div className={btnDiv}>
							<button className={loginBtn} type="submit">
								{subCompanyValue.id ? "Save Changes" : "Add Sub Company"}
							</button>
						</div>
					</Form>
				)}
			</Formik>
		</div>
	);
};

export default memo(AddSubCompany);
