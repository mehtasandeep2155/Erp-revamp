import { IconButtons } from "@common/buttons";
import TableDetailsComponent from "@common/tables/details-table";
import { signUpFormik } from "@component/auth/login/styles";
import { AddHeader } from "@component/commoncomponent/add-header";
import { Input } from "@component/utils/form-fields";
import {
	backButton,
	buttonMarginPoAddForm,
	detailsPage,
	flexCol,
	flexWrapPgae,
	formControlAuth,
	formControlInvoice,
	inputError,
	invoiceCheckbox,
	invoiceForm,
	invoiceInnerInputContainer,
	invoicePageView,
	invoiceSubmit,
	tableView,
	withoutCost
} from "@css/styles";
import { ArrowBack } from "@mui/icons-material";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Form, Formik } from "formik";
import { cancleButton, submitButton } from "@css/mui-styles";
import { InvoiceValues } from "@component/utils/form/initial-values";
import { useValidation } from "@component/utils/form/validation";
import useHandleChange from "@component/utils/form/handle-change";
import useInVoice from "./invoice/invoice-hook";
import usePurchaseOrder from "./purchase-order-hook";

const OpenGenerateInvoice = ({ handleView, invoiceDetails }: any) => {
	const { onClick } = useInVoice();
	const { handleChange } = useHandleChange("", "");
	const ifCostPerKg = invoiceDetails.data[0][4] === "No";
	const { InvoiceSchema } = useValidation(ifCostPerKg);
	const { InvoiceValue } = usePurchaseOrder();

	const handleLedgerSubmit = (values: any) => {
		try {
			values.associated_poId = invoiceDetails?.id;
			let castValues = InvoiceSchema.cast(values);
			onClick(castValues, "close", "");
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<>
			<div className={detailsPage}>
				<ArrowBack className={backButton} onClick={() => handleView("close")} />
				<div className={flexCol}>
					<div className={invoicePageView}>
						<AddHeader title={"Generate Invoice"} />
						<div className={tableView}>
							<TableDetailsComponent
								columns={invoiceDetails.columns}
								tableData={invoiceDetails.data}
								pagination={false}
							/>
						</div>
					</div>
					<div className={invoicePageView}>
						<Formik
							initialValues={InvoiceValues}
							onSubmit={handleLedgerSubmit}
							validationSchema={InvoiceSchema}
						>
							{(props) => (
								<Form className={invoiceForm}>
									<div className={ifCostPerKg ? invoiceInnerInputContainer : withoutCost}>
										{ifCostPerKg && (
											<Input
												name={"cost_per_kg"}
												label={"Cost Per Kg"}
												valueProps={props}
												error={"cost_per_kg"}
												require={true}
												value={props.values.cost_per_kg}
												onChange={handleChange}
												inputStyle={
													props.touched["cost_per_kg"] && props.errors["cost_per_kg"]
														? inputError
														: formControlInvoice
												}
											/>
										)}
										<Input
											label={"Coating Discount"}
											name={"coating_discount"}
											onChange={handleChange}
											valueProps={props}
											value={props?.values?.coating_discount}
											error={"coating_discount"}
											inputStyle={
												props.touched["coating_discount"] && props.errors["coating_discount"]
													? inputError
													: formControlInvoice
											}
											require={false}
										/>
										<Input
											require={false}
											label={"Tax"}
											name={"tax"}
											error={"tax"}
											onChange={handleChange}
											valueProps={props}
											value={props?.values?.tax}
											inputStyle={
												props.touched["tax"] && props.errors["tax"]
													? inputError
													: formControlInvoice
											}
										/>
									</div>
									<div className={invoiceCheckbox}>
										<FormControlLabel
											control={<Checkbox />}
											defaultChecked={props.values.mailToCustomer}
											checked={props.values.mailToCustomer}
											onChange={(e) => handleChange(e, props, "", "")}
											name={"mailToCustomer"}
											label="Send Mail to Customer"
										/>
									</div>
									<div className={invoiceSubmit}>
										<IconButtons
											clickEvent={() => handleView("close")}
											styles={cancleButton}
											lebel={"Cancel"}
											type="button"
										/>
										<IconButtons styles={submitButton} lebel={"Generate"} type="submit" />
									</div>
								</Form>
							)}
						</Formik>
					</div>
				</div>
			</div>
		</>
	);
};

export default OpenGenerateInvoice;
