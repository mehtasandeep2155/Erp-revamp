import { Form, Formik } from "formik";
import { AutoCompleteSeacrhSelect, Input } from "@component/utils/form-fields";
import { LedgerProps } from "@component//utils/type/interfaces";
import { verifyForm, loginBtn, btnDiv } from "@css/styles";
import useHandleChange from "@component/utils/form/handle-change";
import { memo, useEffect } from "react";
import { useValidation } from "@component/utils/form/validation";
import useCustomer from "@component/customer/customer/customer-hook";
import { getCustomer } from "@api/get-api-queries";

const AddLedger = (data: LedgerProps) => {
	const { ledgerValue, onClickByAdmin, disabled } = data;
	const { customerList, getAllCompanyList, fetchagain } = useCustomer();
	const { customerlists } = getCustomer();
	const { LedgerSchema } = useValidation(ledgerValue);
	
	const handleLedgerSubmit = (values: any) => {
		const castValues = LedgerSchema.cast(values);
		onClickByAdmin(castValues, "close", ledgerValue.id);
	};

	useEffect(() => {
		getAllCompanyList();
	}, [customerlists.isLoading, fetchagain, customerlists.isFetching]);

	const { handleChange } = useHandleChange("", "");

	return (
		<div className={verifyForm}>
			<Formik initialValues={ledgerValue} onSubmit={handleLedgerSubmit} validationSchema={LedgerSchema}>
				{(props) => (
					<Form>
						<AutoCompleteSeacrhSelect
							onChange={handleChange}
							options={customerList}
							error="customerId"
							name="customerId"
							value={props.values.customerId}
							valueProps={props}
							label={"Select Customer"}
							placeholder={"Select Cutomer"}
							require={true}
							disabled={disabled}
						/>
						<AutoCompleteSeacrhSelect
							onChange={handleChange}
							options={[
								{ name: "Credit", id: "credit" },
								{ name: "Debit", id: "debit" }
							]}
							error="transaction_type"
							name="transaction_type"
							value={props.values.transaction_type}
							valueProps={props}
							label={"Select Transaction Type"}
							placeholder={"Select Transaction Type"}
							require={true}
							disabled={disabled}
						/>
						<Input
							placeholder={"Enter Amount"}
							name={"amount"}
							onChange={handleChange}
							label={"Amount"}
							valueProps={props}
							error={"amount"}
							require={true}
							value={props.values.amount}
							disabled={disabled}
						/>
						<AutoCompleteSeacrhSelect
							onChange={handleChange}
							options={[
								{ name: "Pending", id: "pending" },
								{ name: "In Progress", id: "processing" },
								{ name: "Paid", id: "paid" }
							]}
							error="transaction_status"
							name="transaction_status"
							value={props.values.transaction_status}
							valueProps={props}
							label={"Select Transaction Status"}
							placeholder={"Select Transaction Status"}
							require={true}
						/>
						<div className={btnDiv}>
							<button className={loginBtn} type="submit">
								{ledgerValue.id ? "Save Changes" : "Add Ledger"}
							</button>
						</div>
					</Form>
				)}
			</Formik>
		</div>
	);
};

export default memo(AddLedger);
