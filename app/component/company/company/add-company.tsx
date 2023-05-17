import { Form, Formik } from "formik";
import { Input, MultiCompanySelectInput } from "@component/utils/form-fields";
import { CompanyProps } from "@component//utils/type/interfaces";
import {
	verifyForm,
	loginBtn,
	btnDiv,
	addProductForm,
	multipleCompanies,
	addSubCompany,
	formGroupCol,
	inputError,
	formControlAuth,
	formControlProduct
} from "@css/styles";
import useHandleChange from "@component/utils/form/handle-change";
import { useEffect, memo } from "react";
import useSubCompany from "../subcompany/sub-company-hook";
import { getSubCompany } from "@api/get-api-queries";
import { AddHeader } from "@component/commoncomponent/add-header";
import { useValidation } from "@component/utils/form/validation";
import useCompany from "./company-hook";
import { IconButtons } from "@common/buttons";
import { cancleButton, submitButton } from "@css/mui-styles";
import { useRouter } from "next/router";
import { companyList } from "@component/utils/routes";

const AddCompany = (props: any) => {
	const { onClick, companyValue } = useCompany();
	const { CompanySchema } = useValidation(companyValue);
	const handleCompanySubmit = (values: any) => {
		const castValues = CompanySchema.cast(values);
		onClick(castValues, "close", companyValue.id);
	};
	const { push } = useRouter();
	const { handleChange, handleDelete } = useHandleChange(companyValue, "");
	const { subCompanyList, getSubCompanyList } = useSubCompany();
	const { subcompanies } = getSubCompany("", "");

	useEffect(() => {
		getSubCompanyList();
	}, [subcompanies.isLoading]);

	return (
		<div className={verifyForm}>
			<AddHeader title={"Add Company"} />
			<Formik initialValues={companyValue} onSubmit={handleCompanySubmit} validationSchema={CompanySchema}>
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
								inputStyle={formControlProduct}
							/>
							<MultiCompanySelectInput
								onChange={handleChange}
								options={subCompanyList}
								error="subCompanyId"
								style={multipleCompanies}
								name="subCompanyId"
								valueProps={props}
								value={props.values.subCompanyId}
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

export default memo(AddCompany);
