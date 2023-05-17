import { Form, Formik } from "formik";
import { Input, MultiSelectInput } from "@component/utils/form-fields";
import { InvoiceProps } from "@component//utils/type/interfaces";
import {
	verifyForm,
	loginBtn,
	btnDiv,
	variantDetailsRate,
	productCardRate,
	flexBoxVariant,
	productTitle,
	productHedaing
} from "@css/styles";
import useHandleChange from "@component/utils/form/handle-change";
import { memo, useEffect } from "react";
import { useValidation } from "@component/utils/form/validation";
import useCustomer from "@component/customer/customer/customer-hook";
import ProductCardComponent from "@common/card-component";
import { PoViewColums } from "@component/utils/form/constant";
import { getCustomer, getPurchaseOrders } from "@api/get-api-queries";
import { Checkbox, FormControlLabel } from "@mui/material";
import { pelorous } from "@css/color-palette";

const AddInVoice = (data: InvoiceProps) => {
	const { InvoiceValue, onClickByAdmin, disabled, productPoList, tableDataSelect, handleOnInvoceClick } = data;
	const { getAllCompanyList, fetchagain } = useCustomer();
	const { customerlists } = getCustomer("", "");
	const { purchaseOrderds } = getPurchaseOrders("", "", "");
	const { InvoiceSchema } = useValidation(InvoiceValue);

	const handleLedgerSubmit = (values: any) => {
		const castValues = InvoiceSchema.cast(values);
		onClickByAdmin(castValues, "close", InvoiceValue.id);
	};

	useEffect(() => {
		getAllCompanyList();
	}, [customerlists.isLoading, fetchagain, customerlists.isFetching, purchaseOrderds.isLoading]);

	const { handleChange } = useHandleChange("", "");
	return (
		<div className={verifyForm}>
			<Formik initialValues={InvoiceValue} onSubmit={handleLedgerSubmit} validationSchema={InvoiceSchema}>
				{(props) => (
					<Form>
						<MultiSelectInput
							label="Purchase Order"
							error={"associated_poId"}
							name="associated_poId"
							placeholder="Select Purchase Oreder"
							handleOnClick={handleOnInvoceClick}
							valueProps={props}
							onChange={handleChange}
							options={productPoList}
							columdata={tableDataSelect}
							colums={PoViewColums}
							disabled={disabled}
						/>
						{Object.keys(props.values.associated_poId?.name).length > 0 && (
							<div className={variantDetailsRate}>
								<ProductCardComponent
									className={productCardRate}
									children={
										<>
											<div>
												<div className={flexBoxVariant}>
													<h5 className={productHedaing}>Order Number:</h5>
													<span className={productTitle}>
														{props.values.associated_poId.name.order_number}
													</span>
												</div>
												<div className={flexBoxVariant}>
													<h5 className={productHedaing}>Raw Material Included:</h5>
													<span className={productTitle}>
														{props.values.associated_poId.name.has_raw_material === true
															? "YEs"
															: "No"}
													</span>
												</div>
												<div className={flexBoxVariant}>
													<h5 className={productHedaing}>Issue Date:</h5>
													<span className={productTitle}>
														{props.values.associated_poId.name.issued_date
															? `${String(
																	new Date(
																		props.values.associated_poId.name.issued_date
																	)
															  ).slice(3, 10)},${String(
																	new Date(
																		props.values.associated_poId.name.issued_date
																	)
															  ).slice(10, 16)}`
															: "_"}
													</span>
												</div>
												<div className={flexBoxVariant}>
													<h5 className={productHedaing}>Status:</h5>
													<span className={productTitle}>
														{props.values.associated_poId.name.status}
													</span>
												</div>
												<div className={flexBoxVariant}>
													<h5 className={productHedaing}>PO Entries Count:</h5>
													{props.values.associated_poId.name.po_entries ? (
														<span className={productTitle}>
															{props.values.associated_poId.name.po_entries.length}
														</span>
													) : (
														"_"
													)}
												</div>
											</div>
										</>
									}
								/>
							</div>
						)}
						<Input
							disabled={false}
							placeholder={"Enter Cost Per Kg"}
							name={"cost_per_kg"}
							onChange={handleChange}
							label={"Cost Per Kg"}
							valueProps={props}
							error={"cost_per_kg"}
							require={true}
							value={props.values.cost_per_kg}
						/>
						<Input
							disabled={false}
							placeholder={"Enter Coating Discount"}
							name={"coating_discount"}
							onChange={handleChange}
							label={"Coating Discount"}
							valueProps={props}
							error={"coating_discount"}
							require={false}
							value={props.values.coating_discount}
						/>
						<Input
							disabled={false}
							placeholder={"Enter Tax(%)"}
							name={"tax"}
							onChange={handleChange}
							label={"Tax(%)"}
							valueProps={props}
							error={"tax"}
							require={false}
							value={props.values.tax}
						/>
						<FormControlLabel
							control={
								<Checkbox
									sx={{
										color: pelorous,
										"&.Mui-checked": {
											color: pelorous
										}
									}}
								/>
							}
							sx={{ fontSize: "5px" }}
							label="Send Mail To Customer"
							defaultChecked={props.values.mailToCustomer}
							checked={props.values.mailToCustomer}
							onChange={(e) => handleChange(e, props, "", "")}
							name={"mailToCustomer"}
						/>
						<div className={btnDiv}>
							<button className={loginBtn} type="submit">
								{InvoiceValue.id ? "Save Changes" : "Add Invoice"}
							</button>
						</div>
					</Form>
				)}
			</Formik>
		</div>
	);
};

export default memo(AddInVoice);
