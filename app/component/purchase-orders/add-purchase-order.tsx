import { AutoCompleteSeacrhSelect } from "@component/utils/form-fields";
import { verifyForm, submitBtn, btnDiv, btnViewOrder, addDiv, flex } from "@css/styles";
import useHandleChange from "@component/utils/form/handle-change";
import { memo, useEffect, useState } from "react";
import useCustomer from "@component/customer/customer/customer-hook";
import CustomizedDialogs from "@common/dailog/dailog-model";
import AddCustomer from "@component/customer/customer/add-customer";
import { useValidation } from "@component/utils/form/validation";
import { Form, Formik } from "formik";
import { getBranch, getCustomer } from "@api/get-api-queries";
import useBranch from "@component/branch/branch-hook";

const AddPurchaseOrder = (data: any) => {
	const { handleChange } = useHandleChange("", "");
	const { handleNext, perChasevalue } = data;
	const { customerList, customerValue, getAllCompanyList, fetchagain } = useCustomer();
	const { customerlists } = getCustomer();
	const [IsOpen, setIsOpen] = useState(false);
	const { branches } = getBranch();
	const { branchList, getAllBranchList } = useBranch();
	const { CompanySchema, PurchaseOrderSchema } = useValidation(perChasevalue);

	useEffect(() => {
		getAllCompanyList();
		getAllBranchList();
	}, [customerlists.isLoading, fetchagain, customerlists.isFetching, branches.isLoading]);

	return (
		<>
			<div className={verifyForm}>
				<Formik initialValues={perChasevalue} onSubmit={handleNext} validationSchema={PurchaseOrderSchema}>
					{(props) => (
						<Form>
							<div className={flex}>
								<AutoCompleteSeacrhSelect
									onChange={handleChange}
									options={customerList}
									error="customer_id"
									name="customer_id"
									value={props.values.customer_id}
									valueProps={props}
									label={"Select Customer"}
									placeholder={"Select Cutomer"}
									require={true}
									button={
										<button type="button" className={btnViewOrder} onClick={() => setIsOpen(true)}>
											<div className={addDiv}>
												<span>+ Add New</span>
											</div>
										</button>
									}
								/>
							</div>
							<AutoCompleteSeacrhSelect
								onChange={handleChange}
								options={[{ name: "Yes" }, { name: "No" }]}
								error="has_raw_material"
								name="has_raw_material"
								require={true}
								value={
									props.values.has_raw_material.name === true
										? "Yes"
										: props.values.has_raw_material.name === false
										? "No"
										: props.values.has_raw_material.name
								}
								valueProps={props}
								label={"Raw Material Included"}
								placeholder={"Raw Material Included"}
							/>
							<AutoCompleteSeacrhSelect
								onChange={handleChange}
								options={branchList.map((item: any) => {
									return { name: item.contact_name, id: item.id };
								})}
								error="delivery_pointId"
								name="delivery_pointId"
								require={true}
								value={props.values.delivery_pointId}
								valueProps={props}
								label={"Delivery Point"}
								placeholder={"Select Delivery Point"}
							/>
							<AutoCompleteSeacrhSelect
								onChange={handleChange}
								options={branchList.map((item: any) => {
									return { name: item.contact_name, id: item.id };
								})}
								error="origin_pointId"
								name="origin_pointId"
								require={true}
								value={props.values.origin_pointId}
								valueProps={props}
								label={"Origin Point"}
								placeholder={"Select Origin Point"}
							/>
							<div className={btnDiv}>
								<button className={submitBtn} type="submit">
									Next
								</button>
							</div>
							<CustomizedDialogs
								title="Customer"
								isOpen={IsOpen}
								handleClose={() => setIsOpen(false)}
								content={
									<AddCustomer
										customerValue={customerValue}
										validation={CompanySchema}
										setIsOpen={setIsOpen}
										onClickByAdmin={() => setIsOpen(false)}
										props={props}
										purchase={true}
									/>
								}
							/>
						</Form>
					)}
				</Formik>
			</div>
		</>
	);
};
export default memo(AddPurchaseOrder);
