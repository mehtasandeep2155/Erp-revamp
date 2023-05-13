import {
	verifyForm,
	formGroup,
	inputError,
	formControl,
	formGroupWithLabel,
	flexWrap,
	flexUser,
	justifyBetween,
	drawerTitle,
	tablePoActionMoveForm,
	moveForm,
	formControlMove
} from "@css/styles";
import { memo } from "react";
import { Form, Formik } from "formik";
import useHandleChange from "@component/utils/form/handle-change";
import { Input } from "@component/utils/form-fields";
import { statusList } from "@component/utils/form/constant";
import { VerifyPoProps } from "@component/utils/type/interfaces";
import { IconButtons } from "@common/buttons";
import { cursorPointer, moveButton } from "@css/mui-styles";
import CloseIcon from "@mui/icons-material/Close";
import { returnNextStatus } from "@component/utils/helper";

const VerifyPurchaseOrder = ({
	handleProductApprove,
	status,
	verifyValue,
	disabled,
	validation,
	handleClose
}: VerifyPoProps) => {
	const { handleChange } = useHandleChange(verifyValue, "");
	const handleSubmit = (values: any) => {
		const castValues = validation.cast(values);
		handleProductApprove(castValues);
	};

	return (
		<div className={moveForm}>
			<div className={justifyBetween}>
				<span className={drawerTitle}>Move Order</span>
				<CloseIcon sx={cursorPointer} onClick={() => handleClose()} />
			</div>
			<Formik initialValues={verifyValue} onSubmit={handleSubmit} validationSchema={validation}>
				{(props) => (
					<Form className={tablePoActionMoveForm}>
						<Input
							label={"Gross Weight"}
							name={"gross_weight"}
							onChange={handleChange}
							valueProps={props}
							error={"gross_weight"}
							value={props.values.gross_weight}
							formGroupStyle={formGroupWithLabel}
							inputStyle={
								props.touched["gross_weight"] && props.errors["gross_weight"]
									? inputError
									: formControlMove
							}
							disabled={
								props.values.status.id === "in_transit" ||
								props.values.status.id === "ready_for_dispatch" ||
								props.values.status.id === "dispatched"
									? true
									: false
							}
							require={true}
						/>

						{props.values.status.id !== "coating_initiated" && props.values.status.id !== "initiated" && (
							<Input
								disabled={
									props.values.status.id === "in_transit" ||
									props.values.status.id === "ready_for_dispatch" ||
									props.values.status.id === "dispatched"
										? true
										: false
								}
								name={"net_weight"}
								onChange={handleChange}
								formGroupStyle={formGroupWithLabel}
								inputStyle={
									props.touched["gross_weight"] && props.errors["gross_weight"]
										? inputError
										: formControlMove
								}
								label={"Net Weight"}
								valueProps={props}
								error={"net_weight"}
								value={props.values.net_weight}
								require={true}
							/>
						)}

						<Input
							disabled={true}
							name={"status"}
							onChange={handleChange}
							formGroupStyle={formGroupWithLabel}
							inputStyle={
								props.touched["gross_weight"] && props.errors["gross_weight"]
									? inputError
									: formControlMove
							}
							label={"Status"}
							valueProps={props}
							value={props.values.status.name}
						/>

						{/* <AutoCompleteSeacrhSelect
							onChange={handleChange}
							options={statusList.filter((item: any) => {
								if (status === "coating_finished") {
									return (
										item.id === "in_transit" ||
										item.id === "ready_for_dispatch" ||
										item.id === "dispatched"
									);
								} else if (status === "in_transit") {
									return item.id === "ready_for_dispatch" || item.id === "dispatched";
								} else if (status === "ready_for_dispatch") {
									return item.id === "dispatched";
								}
							})}
							error="status"
							name="status"
							require={true}
							value={props.values.status}
							valueProps={props}
							label={"Status"}
							disabled={disabled}
							placeholder={"Select Status"}
						/>  */}
						{props.values.status.name !== "Ready For_dispatch" && (
							<IconButtons
								styles={moveButton}
								type="submit"
								lebel={`Move to ${returnNextStatus(props.values.status.name)}`}
							/>
						)}
					</Form>
				)}
			</Formik>
		</div>
	);
};
export default memo(VerifyPurchaseOrder);
