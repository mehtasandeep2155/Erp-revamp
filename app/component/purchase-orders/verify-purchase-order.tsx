import { loginBtn, btnDivApprove, verifyForm } from "@css/styles";
import { memo } from "react";
import { Form, Formik } from "formik";
import useHandleChange from "@component/utils/form/handle-change";
import { AutoCompleteSeacrhSelect, Input } from "@component/utils/form-fields";
import useConstant from "@component/utils/form/constant";
import { VerifyPoProps } from "@component/utils/type/interfaces";

const VerifyPurchaseOrder = (data: VerifyPoProps) => {
	const { handleProductApprove, status, verifyValue, disabled, validation } = data;
	const { handleChange } = useHandleChange(verifyValue, "");
	const { statusList } = useConstant();
	const handleSubmit = (values: any) => {
		const castValues = validation.cast(values);
		handleProductApprove(castValues);
	};

	return (
		<>
			<div className={verifyForm}>
				<Formik initialValues={verifyValue} onSubmit={handleSubmit} validationSchema={validation}>
					{(props) => (
						<Form>
							<Input
								placeholder={"Enter Gross Weight"}
								name={"gross_weight"}
								onChange={handleChange}
								label={"Gross Weight"}
								valueProps={props}
								error={"gross_weight"}
								value={props.values.gross_weight}
								disabled={
									props.values.status.id === "in_transit" ||
									props.values.status.id === "ready_for_dispatch" ||
									props.values.status.id === "dispatched"
										? true
										: false
								}
								require={true}
							/>
							{props.values.status.id !== "coating_initiated" &&
								props.values.status.id !== "initiated" && (
									<Input
										disabled={
											props.values.status.id === "in_transit" ||
											props.values.status.id === "ready_for_dispatch" ||
											props.values.status.id === "dispatched"
												? true
												: false
										}
										placeholder={"Enter Net Weight"}
										name={"net_weight"}
										onChange={handleChange}
										label={" Net Weight"}
										valueProps={props}
										error={"net_weight"}
										value={props.values.net_weight}
										require={true}
									/>
								)}
							<AutoCompleteSeacrhSelect
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
							/>
							<div className={btnDivApprove}>
								<button className={loginBtn} type="submit">
									{status === "initiated"
										? "Move to Ready For Coating"
										: status === "coating_initiated"
										? "Move to Ready For Coating"
										: status === "coating_processing"
										? "Move to Coating In Progress"
										: "Move To Next Status"}
								</button>
							</div>
						</Form>
					)}
				</Formik>
			</div>
		</>
	);
};
export default memo(VerifyPurchaseOrder);
