import { Form, Formik } from "formik";
import { Input, MultiCompanySelectInput } from "@component/utils/form-fields";
import { verifyForm, btnDiv, formControlProduct, formDiv, flexCol2input } from "@css/styles";
import useHandleChange from "@component/utils/form/handle-change";
import { useEffect, memo } from "react";
import useSubCompany from "../subcompany/sub-company-hook";
import { getSubCompany } from "@api/get-api-queries";
import { AddHeader } from "@component/commoncomponent/add-header";
import { useValidation } from "@component/utils/form/validation";
import useCompany from "./company-hook";
import { IconButtons } from "@common/buttons";
import { cancleButton, style, submitButton } from "@css/mui-styles";
import { useRouter } from "next/router";
import { companyList } from "@component/utils/routes";

const AddCompany = () => {
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
						<div className={formDiv}>
							<div className={flexCol2input}>
								<Input
									disabled={false}
									name={"name"}
									onChange={handleChange}
									label={"Company Name"}
									placeholder={"Enter Company Name"}
									valueProps={props}
									error={"name"}
									value={props?.values?.name}
									require={true}
									inputStyle={formControlProduct}
								/>
								<MultiCompanySelectInput
									onChange={handleChange}
									options={subCompanyList}
									placeholder="Search Sub Company..."
									error="subCompanyId"
									name="subCompanyId"
									valueProps={props}
									value={props?.values?.subCompanyId}
									label={"Sub Company Name"}
									handleDelete={handleDelete}
									require={true}
									style={style}
								/>
							</div>
						</div>
						<div className={btnDiv}>
							<IconButtons
								clickEvent={() => push(companyList)}
								styles={cancleButton}
								lebel={"Cancel"}
								type="button"
							/>
							<IconButtons
								clickEvent={() => {}}
								styles={submitButton}
								lebel={companyValue.id ? "Save" : "Next"}
								type="submit"
							/>
						</div>
					</Form>
				)}
			</Formik>
		</div>
	);
};

export default memo(AddCompany);
