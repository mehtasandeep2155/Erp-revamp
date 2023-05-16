import { Form, Formik } from "formik";
import { AutoCompleteSeacrhSelect, Input } from "@component/utils/form-fields";
import { BranchProps, BranchValueTypes } from "@component//utils/type/interfaces";
import {
	verifyForm,
	loginBtn,
	btnDiv,
	moveForm,
	justifyBetween,
	drawerTitle,
	formGroupWithLabel,
	inputErrorCustomer,
	formControlMove,
	tablePoActionMoveForm
} from "@css/styles";
import useHandleChange from "@component/utils/form/handle-change";
import { memo } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { useValidation } from "@component/utils/form/validation";
import { cursorPointer, moveButton } from "@css/mui-styles";
import { IconButtons } from "@common/buttons";

const AddBranch = (data: BranchProps) => {
	const { branchValue, onClickByAdmin } = data;
	const { branchSchema } = useValidation(branchValue);
	const handleSubmit = (values: BranchValueTypes) => {
		try {
			const castValues = branchSchema.cast(values);

			onClickByAdmin(castValues, "close", branchValue.id);
		} catch (err) {
			console.log(err);
		}
	};

	const { handleChange } = useHandleChange("", "");

	return (
		<div className={moveForm}>
			<div className={justifyBetween}>
				<span className={drawerTitle}>Add Branch</span>
				<CloseIcon sx={cursorPointer} onClick={() => onClickByAdmin("", "model", "")} />
			</div>
			<Formik initialValues={branchValue} onSubmit={handleSubmit} validationSchema={branchSchema}>
				{(props) => (
					<Form className={tablePoActionMoveForm}>
						<Input
							disabled={false}
							placeholder={"Enter Name"}
							name={"name"}
							onChange={handleChange}
							label={"Name"}
							valueProps={props}
							error={"name"}
							value={props.values.name}
							formGroupStyle={formGroupWithLabel}
							inputStyle={
								props.touched["name"] && props.errors["name"] ? inputErrorCustomer : formControlMove
							}
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
						<Input
							disabled={false}
							placeholder={"Enter Address"}
							name={"address"}
							onChange={handleChange}
							label={"Address"}
							valueProps={props}
							error={"address"}
							value={props.values.address}
							formGroupStyle={formGroupWithLabel}
							inputStyle={
								props.touched["address"] && props.errors["address"]
									? inputErrorCustomer
									: formControlMove
							}
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
							formGroupStyle={formGroupWithLabel}
							inputStyle={
								props.touched["phone"] && props.errors["phone"] ? inputErrorCustomer : formControlMove
							}
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
							formGroupStyle={formGroupWithLabel}
							inputStyle={formControlMove}
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
							formGroupStyle={formGroupWithLabel}
							inputStyle={formControlMove}
						/>

						<IconButtons
							styles={moveButton}
							type="submit"
							lebel={branchValue.id ? "Save Changes" : "Add Branch"}
						/>
					</Form>
				)}
			</Formik>
		</div>
	);
};

export default memo(AddBranch);
