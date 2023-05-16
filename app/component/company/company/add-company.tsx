import { Form, Formik } from "formik";
import { Input, MultiCompanySelectInput } from "@component/utils/form-fields";
import { CompanyProps } from "@component//utils/type/interfaces";
import { verifyForm, loginBtn, btnDiv } from "@css/styles";
import useHandleChange from "@component/utils/form/handle-change";
import { useEffect, memo } from "react";
import useSubCompany from "../subcompany/sub-company-hook";
import { getSubCompany } from "@api/get-api-queries";

const AddCompany = (props: CompanyProps) => {
	const { comapnyValue, onClickByAdmin, validation } = props;
	const handleCompanySubmit = (values: any) => {
		const castValues = validation.cast(values);
		onClickByAdmin(castValues, "close", comapnyValue.id);
	};
	const { handleChange, handleDelete } = useHandleChange(comapnyValue, "");
	const { subCompanyList, getSubCompanyList } = useSubCompany();
	const { subcompanies } = getSubCompany("", "");

	useEffect(() => {
		getSubCompanyList();
	}, [subcompanies.isLoading]);

	return (
		<div className={verifyForm}>
			<Formik initialValues={comapnyValue} onSubmit={handleCompanySubmit} validationSchema={validation}>
				{(props) => (
					<Form>
						<Input
							disabled={false}
							placeholder={"Enter a Company Name"}
							name={"name"}
							onChange={handleChange}
							label={"Company Name"}
							valueProps={props}
							error={"name"}
							value={props.values.name}
							require={true}
						/>
						<MultiCompanySelectInput
							onChange={handleChange}
							options={subCompanyList}
							error="subCompanyId"
							name="subCompanyId"
							valueProps={props}
							label={"Sub Company"}
							placeholder={"Enter a Sub Company"}
							handleDelete={handleDelete}
							require={true}
						/>
						<div className={btnDiv}>
							<button className={loginBtn} type="submit">
								{comapnyValue.id ? "Save Changes" : "Add Company"}
							</button>
						</div>
					</Form>
				)}
			</Formik>
		</div>
	);
};

export default memo(AddCompany);
