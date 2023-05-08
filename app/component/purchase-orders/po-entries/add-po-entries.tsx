import { Form, Formik } from "formik";
import { Input, MultiSelectInput, AutoCompleteSeacrhSelect } from "@component/utils/form-fields";
import { ProductProps } from "@component/utils/type/interfaces";
import {
	verifyForm,
	btnDiv,
	flexInput,
	continueBut,
	variantDetailsRate,
	productCardRate,
	flexBoxVariant,
	productTitle,
	productHedaing
} from "@css/styles";
import useHandleChange from "@component/utils/form/handle-change";
import { useEffect, memo } from "react";
import usePoEntries from "./po-entries-hook";
import useRate from "../../product/rate/rate-hook";
import { rateColumsSelect, PoViewColums } from "@component/utils/form/constant";
import ProductCardComponent from "@common/card-component";
import { getColor, getPurchaseOrders, getRate } from "@api/get-api-queries";
import usePurchaseOrder from "@component/purchase-orders/purchase-order-hook";

const AddPoEntries = (data: ProductProps) => {
	const { handleChange } = useHandleChange("", "");
	const {
		poEntriesValue,
		validation,
		productRatelist,
		handelSubmit,
		productUserlist,
		handleOnClickPurchase,
		handleOnClick,
		poOpen
	} = data;
	const { getAllList } = usePoEntries();
	const { colors } = getColor();
	const { getAllRateList, tableDataSelect, fetchagain } = useRate();
	const { getAllPurchaseList, tableDataSelectPurcahse } = usePurchaseOrder(0);
	const { rates } = getRate();
	const { purchaseOrderds } = getPurchaseOrders();

	const handlePoSubmit = (values: any) => {
		const castValues = validation.cast(values);
		handelSubmit(castValues, "close", poEntriesValue.id);
	};

	useEffect(() => {
		getAllPurchaseList();
		getAllRateList();
	}, [rates.isLoading, fetchagain, rates.isFetching, purchaseOrderds.isLoading]);

	useEffect(() => {
		getAllList();
	}, [rates.isLoading, colors.isLoading]);

	return (
		<div className={verifyForm}>
			<Formik initialValues={poEntriesValue} onSubmit={handlePoSubmit} validationSchema={validation}>
				{(props) => (
					<Form>
						<MultiSelectInput
							onChange={handleChange}
							options={productRatelist}
							label="Product Rate"
							error={"rateId"}
							name="rateId"
							placeholder="Add Product Rate"
							valueProps={props}
							handleOnClick={handleOnClick}
							index={1}
							columdata={tableDataSelect}
							colums={rateColumsSelect}
							disabled={false}
							value={props.values.rateId}
						/>
						{Object.keys(props.values.rateId).length > 0 && (
							<div className={variantDetailsRate}>
								<ProductCardComponent
									className={productCardRate}
									children={
										<>
											<div>
												<div className={flexBoxVariant}>
													<h5 className={productHedaing}>Rate:</h5>
													<span className={productTitle}>
														Rs.{" "}
														{String(props.values.rateId.rate).replace(
															/\B(?=(\d{3})+(?!\d))/g,
															","
														)}
													</span>
												</div>
												<div className={flexBoxVariant}>
													<h5 className={productHedaing}>Coating:</h5>
													<span className={productTitle}>
														{props.values.rateId.coating_type.type} #
														{props.values.rateId.coating_type.code}
													</span>
												</div>
												<div className={flexBoxVariant}>
													<h5 className={productHedaing}>Product Name:</h5>
													<span className={productTitle}>
														{props.values.rateId.product.name}
													</span>
												</div>
												<div className={flexBoxVariant}>
													<h5 className={productHedaing}>Height:</h5>
													<span className={productTitle}>
														{props.values.rateId.product.height}
													</span>
												</div>
												<div className={flexBoxVariant}>
													<h5 className={productHedaing}>ThickNess:</h5>
													<span className={productTitle}>
														{props.values.rateId.product.thickness}
													</span>
												</div>
												<div className={flexBoxVariant}>
													<h5 className={productHedaing}>Weight:</h5>
													<span className={productTitle}>
														{props.values.rateId.product.weight}{" "}
														<b>
															{props.values.rateId.product.weightUom
																? props.values.rateId.product.weightUom.type
																: null}
														</b>
													</span>
												</div>
												<div className={flexBoxVariant}>
													<h5 className={productHedaing}>Width:</h5>
													<span className={productTitle}>
														{props.values.rateId.product.width}
													</span>
												</div>
											</div>
										</>
									}
								/>
							</div>
						)}
						{!poOpen && (
							<>
								<MultiSelectInput
									onChange={handleChange}
									options={productUserlist}
									label="Purchase Order"
									error={"poId"}
									name="poId"
									placeholder="Select Purchase Order"
									valueProps={props}
									handleOnClick={handleOnClickPurchase}
									columdata={tableDataSelectPurcahse}
									colums={PoViewColums}
									disabled={false}
									index={0}
									value={props.values.poId}
								/>
								{Object.keys(props.values.poId).length > 0 && (
									<div className={variantDetailsRate}>
										<ProductCardComponent
											className={productCardRate}
											children={
												<>
													<div>
														<div className={flexBoxVariant}>
															<h5 className={productHedaing}>Order Number:</h5>
															<span className={productTitle}>
																{props.values.poId.order_number}
															</span>
														</div>
														<div className={flexBoxVariant}>
															<h5 className={productHedaing}>Raw Material Included:</h5>
															<span className={productTitle}>
																{props.values.poId.has_raw_material === true
																	? "YEs"
																	: "No"}
															</span>
														</div>
														<div className={flexBoxVariant}>
															<h5 className={productHedaing}>Issue Date:</h5>
															<span className={productTitle}>
																{props.values.poId.issued_date
																	? `${String(
																			new Date(props.values.poId.issued_date)
																	  ).slice(3, 10)},${String(
																			new Date(props.values.poId.issued_date)
																	  ).slice(10, 16)}`
																	: "_"}
															</span>
														</div>
														<div className={flexBoxVariant}>
															<h5 className={productHedaing}>Status:</h5>
															<span className={productTitle}>
																{props.values.poId.status}
															</span>
														</div>
														<div className={flexBoxVariant}>
															<h5 className={productHedaing}>PO Entries Count:</h5>
															{props.values.poId.po_entries ? (
																<span className={productTitle}>
																	{props.values.poId.po_entries.length}
																</span>
															) : (
																""
															)}
														</div>
													</div>
												</>
											}
										/>
									</div>
								)}
							</>
						)}
						<Input
							disabled={false}
							placeholder={"Enter a Product Quantity"}
							name={"length"}
							onChange={handleChange}
							label={"Product Length"}
							valueProps={props}
							value={props.values.length}
							error={"length"}
						/>
						<Input
							disabled={false}
							placeholder={"Enter a Product Quantity"}
							name={"quantity"}
							onChange={handleChange}
							label={"Product Quantity"}
							valueProps={props}
							value={props.values.quantity}
							error={"quantity"}
						/>

						<div className={flexInput}>
							<AutoCompleteSeacrhSelect
								onChange={handleChange}
								options={
									props.values.rateId
										? props.values.rateId.coating_type?.colors.map((item: any) => {
												return { name: `${item.color} #${item.code}`, id: item.id };
										  })
										: []
								}
								error="colorId"
								name="colorId"
								valueProps={props}
								label={"Color"}
								placeholder={"Select Color"}
								value={props.values.colorId}
								require={true}
							/>
							<Input
								disabled={false}
								placeholder={"Enter a Product Weight"}
								name={"weight"}
								onChange={handleChange}
								label={"Product Weight"}
								valueProps={props}
								value={props.values.weight}
								error={"weight"}
							/>
						</div>
						<div className={btnDiv}>
							<button className={continueBut} type="submit">
								{poEntriesValue.id ? "Save Changes" : "Add"}
							</button>
						</div>
					</Form>
				)}
			</Formik>
		</div>
	);
};

export default memo(AddPoEntries);
