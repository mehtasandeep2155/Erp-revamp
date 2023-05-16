import { Form, Formik } from "formik";
import { Input, AutoCompleteSelect, MultiCompanySelectInput } from "@component/utils/form-fields";
import {
	verifyForm,
	btnDiv,
	formControlAuth,
	inputError,
	addProductForm,
	formGroupCol,
	multipleCompanies,
	addSubCompany
} from "@css/styles";
import useHandleChange from "@component/utils/form/handle-change";
import { memo, useEffect } from "react";
import { getProduct, getSubCompany } from "@api/get-api-queries";
import { IconButtons } from "@common/buttons";
import { cancleButton, style, submitButton } from "@css/mui-styles";
import { AddHeader } from "@component/commoncomponent/add-header";
import { useRouter } from "next/router";
import { companyList } from "../../utils/routes";
import useSubCompany from "../subcompany/sub-company-hook";
import { CompanyProps } from "@component/utils/type/interfaces";

const AddProductVariant = (props: any) => {
	const { onClickByAdmin, validation } = props;
	let comapnyValue: any = {
		name: "",
		subCompanyId: ""
	};
	const handleCompanySubmit = (values: any) => {
		try {
			const castValues = validation.cast(values);
			onClickByAdmin(castValues, "close", comapnyValue?.id);
		} catch (err) {
			console.log(err);
		}
	};
	const { handleChange, handleDelete } = useHandleChange(comapnyValue, "");
	const { subCompanyList, getSubCompanyList } = useSubCompany();
	const { subcompanies } = getSubCompany("", "");

	useEffect(() => {
		getSubCompanyList();
	}, [subcompanies.isLoading]);

	const { push } = useRouter();

	return (
		<div className={verifyForm}>
			<AddHeader title={"Add Company"} />
			<Formik initialValues={comapnyValue} validationSchema={validation} onSubmit={handleCompanySubmit}>
				{(props) => (
					<Form>
						<div className={addProductForm}>
							<Input
								disabled={false}
								name={"name"}
								onChange={handleChange}
								label={"Company Name"}
								valueProps={props}
								error={"name"}
								value={props?.values?.name}
								require={true}
								formGroupStyle={formGroupCol}
								inputStyle={
									props.touched["name"] && props.errors["name"] ? inputError : formControlAuth
								}
							/>
							<MultiCompanySelectInput
								onChange={handleChange}
								options={subCompanyList}
								error="subCompanyId"
								style={multipleCompanies}
								name="subCompanyId"
								valueProps={props}
								formGroupStyle={addSubCompany}
								label={"Sub Company Name"}
								handleDelete={handleDelete}
								require={true}
							/>
						</div>
						<div className={btnDiv}>
							<IconButtons
								clickEvent={() => push(companyList)}
								styles={cancleButton}
								lebel={"Cancel"}
								type="button"
							/>
							<IconButtons clickEvent={() => {}} styles={submitButton} lebel={"Finish"} type="submit" />
						</div>
					</Form>
				)}
			</Formik>
		</div>
	);
};
export default memo(AddProductVariant);
