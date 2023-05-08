import { Form, Formik } from "formik";
import { AutoCompleteSeacrhSelect, Input } from "@component/utils/form-fields";
import { BranchProps, BranchValueTypes } from "@component//utils/type/interfaces";
import { verifyForm, loginBtn, btnDiv } from "@css/styles";
import useHandleChange from "@component/utils/form/handle-change";
import { memo } from "react";
import { useValidation } from "@component/utils/form/validation";

const AddBranch = (data: BranchProps) => {
	const { branchValue, onClickByAdmin } = data;
	const { branchSchema } = useValidation(branchValue);

	const handleSubmit = (values: BranchValueTypes) => {
		const castValues = branchSchema.cast(values);
		onClickByAdmin(castValues, "close", branchValue.id);
	};

	const { handleChange } = useHandleChange("", "");

	return (
		<div className={verifyForm}>
			<Formik initialValues={branchValue} onSubmit={handleSubmit} validationSchema={branchSchema}>
				{(props) => (
					<Form>
						<Input
							disabled={false}
							placeholder={"Enter Address"}
							name={"address"}
							onChange={handleChange}
							label={"Address"}
							valueProps={props}
							error={"address"}
							value={props.values.address}
						/>
						<Input
							disabled={false}
							placeholder={"Enter Phone"}
							name={"phone"}
							onChange={handleChange}
							label={"Phone"}
							valueProps={props}
							error={"phone"}
							value={props.values.phone}
						/>
						<Input
							disabled={false}
							placeholder={"Enter Contact Name"}
							name={"contact_name"}
							onChange={handleChange}
							label={"Contact Name"}
							valueProps={props}
							error={"contact_name"}
							value={props.values.contact_name}
						/>
						<Input
							disabled={false}
							placeholder={"Enter Contact Phone"}
							name={"contact_phone"}
							onChange={handleChange}
							label={"Contact Phone"}
							valueProps={props}
							error={"contact_phone"}
							value={props.values.contact_phone}
						/>
						<AutoCompleteSeacrhSelect
							options={[{ name: "shop" }, { name: "godown" }]}
							onChange={handleChange}
							error={"type"}
							name={"type"}
							valueProps={props}
							value={props.values.type}
							label={"Branch Type"}
							placeholder={"Select Branch Type"}
						/>
						<div className={btnDiv}>
							<button className={loginBtn} type="submit">
								{branchValue.id ? "Save Changes" : "Add Branch"}
							</button>
						</div>
					</Form>
				)}
			</Formik>
		</div>
	);
};

export default memo(AddBranch);
