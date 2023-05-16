import { Form, Formik } from "formik";
import { AutoCompleteSeacrhSelect, Input, MultiSelectInput } from "@component/utils/form-fields";
import { JobProps } from "@component//utils/type/interfaces";
import {
	verifyForm,
	loginBtn,
	btnDiv,
	flexInput,
	variantDetailsRate,
	productCardRate,
	flexBoxVariant,
	varianthead,
	productTitle,
	gpGood,
	gpBad
} from "@css/styles";
import useHandleChange from "@component/utils/form/handle-change";
import { memo, useEffect } from "react";
import { useValidation } from "@component/utils/form/validation";
import { userViewColumns } from "@component/utils/form/constant";
import ProductCardComponent from "@common/card-component";
import { GppBadOutlined, GppGoodOutlined } from "@mui/icons-material";
import useVerification from "@component/users/module-access-ui/verify-user-hook";
import { getUsers } from "@api/get-api-queries";

const AddJob = (data: JobProps) => {
	const { getAllUser, userList, tableDataSelect, handleOnUserClick } = useVerification();
	const { jobValue, onClickByAdmin } = data;
	const { JobSchema } = useValidation(jobValue);
	const { users } = getUsers("", "");

	const handleCompanySubmit = (values: any) => {
		const castValues = JobSchema.cast(values);
		onClickByAdmin(castValues, "close", jobValue.id);
	};

	useEffect(() => {
		getAllUser();
	}, [users.refetch]);
	const { handleChange } = useHandleChange("", "");

	return (
		<div className={verifyForm}>
			<Formik initialValues={jobValue} onSubmit={handleCompanySubmit} validationSchema={JobSchema}>
				{(props) => (
					<Form>
						<MultiSelectInput
							label="User"
							error={"userId"}
							name="userId"
							placeholder="Select User"
							handleOnClick={handleOnUserClick}
							valueProps={props}
							onChange={handleChange}
							options={userList}
							columdata={tableDataSelect}
							colums={userViewColumns}
							disabled={false}
						/>
						{props.values.userId && Object.keys(props.values.userId).length > 0 && (
							<div className={variantDetailsRate}>
								<ProductCardComponent
									className={productCardRate}
									children={
										<>
											<div className={flexBoxVariant}>
												<div className={varianthead}>
													<h5>User Email:</h5>
													<h5>User Role:</h5>
													<h5>Company:</h5>
													<h5>Verified: </h5>
												</div>
												<div>
													<p className={productTitle}>{props.values.userId.email}</p>
													<p className={productTitle}>{props.values.userId.role}</p>
													<p className={productTitle}>
														{props.values.userId.company &&
															props.values.userId.company.name}
													</p>
													<p className={productTitle}>
														<span>
															{props.values.userId.verified ? (
																<div className={gpGood}>
																	<GppGoodOutlined />
																</div>
															) : (
																<div className={gpBad}>
																	<GppBadOutlined />
																</div>
															)}
														</span>
													</p>
												</div>
											</div>
										</>
									}
								/>
							</div>
						)}
						<div className={flexInput}>
							<AutoCompleteSeacrhSelect
								onChange={handleChange}
								options={[{ name: "fixed" }, { name: "variable" }]}
								error="payType"
								name="payType"
								require={true}
								value={props.values.payType.name}
								valueProps={props}
								label={"Payment Type"}
								placeholder={"Payment Type"}
							/>
							<Input
								disabled={false}
								placeholder="Month, Year"
								name={"month"}
								onChange={handleChange}
								label={"Payment Month"}
								valueProps={props}
								error={"month"}
								require={true}
								type={"month"}
								value={props.values.month}
							/>
						</div>
						{props.values.payType.name === "fixed" ? (
							<Input
								disabled={false}
								placeholder={"Enter Total Payment"}
								name={"totalPay"}
								onChange={handleChange}
								label={"Total Payment"}
								valueProps={props}
								error={"totalPay"}
								value={props.values.totalPay}
							/>
						) : props.values.payType.name === "variable" ? (
							<div className={flexInput}>
								<Input
									disabled={false}
									placeholder={"Feet Per Month"}
									name={"feet_per_month"}
									onChange={handleChange}
									label={"Feet Per Month"}
									valueProps={props}
									error={"feet_per_month"}
									value={props.values.feet_per_month}
								/>
								<Input
									disabled={false}
									placeholder={"Enter Rate Per Month"}
									name={"rate_per_foot"}
									onChange={handleChange}
									label={"Rate Per Month"}
									valueProps={props}
									error={"rate_per_foot"}
									value={props.values.rate_per_foot}
								/>
							</div>
						) : (
							""
						)}
						<div className={btnDiv}>
							<button className={loginBtn} type="submit">
								{jobValue.id ? "Save Changes" : "Add Job Details"}
							</button>
						</div>
					</Form>
				)}
			</Formik>
		</div>
	);
};

export default memo(AddJob);
