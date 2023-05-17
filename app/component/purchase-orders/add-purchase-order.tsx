import { AddHeader } from "@component/commoncomponent/add-header";
import {
	backButton,
	buttonMarginPoAddForm,
	detailsPage,
	errTextAddPo,
	flexCol,
	flexWrapPage,
	formControlProductInfo,
	formGroupCol,
	innerContainerPoAddForm,
	innerContainerPoAddFormCol,
	justifyBetween,
	labelStylesMarginTop,
	pageView,
	productInfo,
	productTitle,
	productTitleRadio,
	purchaseOrderSubmit,
	radioContainer
} from "@css/styles";
import { Add, ArrowBack } from "@mui/icons-material";
import { addPurchaseOrderForm } from "@css/styles";
import { Form, Formik } from "formik";
import ClearIcon from "@mui/icons-material/Clear";
import { useValidation } from "@component/utils/form/validation";
import { IconButtons } from "@common/buttons";
import { InputLabel } from "@mui/material";
import {
	addType,
	cancleButton,
	deleteType,
	styleAddPurchaseOrder,
	styleAddSelectProductInfo,
	submitButton
} from "@css/mui-styles";
import { AutoCompleteSeacrhSelect, Input } from "@component/utils/form-fields";
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { useEffect, useState } from "react";
import useCustomer from "@component/customer/customer/customer-hook";
import useBranch from "@component/branch/branch-hook";
import useRate from "@component/product/rate/rate-hook";
import useHandleChange from "@component/utils/form/handle-change";
import {
	getCoatingColorList,
	getProductCoatingList,
	getProductLength,
	getProductListFromRating
} from "./add-purchase-order-util";
import usePurchaseOrder from "./purchase-order-hook";
import { poEntriesValues } from "@component/utils/form/initial-values";
import usePoEntries from "./po-entries/po-entries-hook";
import CollapsibleTable from "../../common/tables/collapsible-table";
import { yourPurchaseOrderHead, yourPurchaseOrderInnerHead } from "@component/utils/form/constant";
import { getCustomer, getProductWithRate, getRate } from "@api/get-api-queries";

const AddPurchaseOrder = ({ handleSubmit, perChasevalue, setSubmit }: any) => {
	const { PurchaseOrderSchema } = useValidation(perChasevalue);
	const { handleChange } = useHandleChange("", "");
	const { customerList, getAllCompanyList } = useCustomer();
	const { customerlists } = getCustomer("", "");
	const {
		productWithRateData,
		getAllProductsWithRate,
		getAllList,
		allRateList,
		onClick: purchaseOrderClick
	} = usePurchaseOrder();
	const { branchList, getAllBranchList } = useBranch();
	const [addProductInfo, setAddProductInfo] = useState([]);
	const [addProductViewInfo, setAddProductViewInfo]: any = useState([]);
	const { getAllRateList } = useRate();
	const { ProductSchema } = useValidation(poEntriesValues);
	const { onClick, savePoEntries, tableData, tableInnerData } = usePoEntries();
	const [disabled, setDisabled] = useState(true);
	const { productsWithRate } = getProductWithRate("", "");

	useEffect(() => {
		getAllCompanyList();
		getAllBranchList();
		getAllProductsWithRate();
		getAllList();
		getAllRateList();
	}, [productsWithRate.isLoading, customerlists.isLoading]);

	const addInProductInfo = (values: any, { resetForm, setFieldValue }: any) => {
		const castValues: any = ProductSchema.cast(values);
		const rateList = allRateList.filter((item: any) => item.productId === values.productId.id);
		rateList.filter((item1: any) => item1.coatingId === castValues.typeId.id);
		const rateId = rateList.filter((item1: any) => item1.coatingId === castValues.typeId?.id)[0].id;
		let formValues: any = {
			rateId: rateId,
			has_raw_material: values.has_raw_material === "Yes" ? true : false,
			length: castValues.length,
			quantity: castValues.quantity,
			typeId: castValues.typeId.name,
			colorId: castValues.colorId.name
		};
		setAddProductViewInfo([...addProductViewInfo, { ...formValues, colorId: castValues.colorId.id }]);
		setAddProductInfo([...addProductInfo, values]);
		setDisabled(false);
		let productID = values.productId;
		resetForm();
		setFieldValue(["productId"], productID);
	};

	const handleFormSubmit = () => {
		if (addProductViewInfo.length > 0) {
			setAddProductInfo([]);
			setAddProductViewInfo([]);
			onClick(addProductViewInfo, "close", "");
		}
	};

	const handlePoSubmit = (values: any) => {
		const entries = savePoEntries.map((item: any) => item.id);
		const formDetails: any = {
			["po_entries"]: entries,
			["has_raw_material"]: values.has_raw_material === "Yes" ? true : false,
			["customer_id"]: values.customer_id.id,
			["delivery_pointId"]: values.delivery_pointId?.id,
			["origin_pointId"]: values.origin_pointId?.id
		};
		setSubmit(true);
		purchaseOrderClick(formDetails, "close", "");
	};

	const removeFromProductInfo = (item: any) => {
		setAddProductInfo(addProductInfo.filter((filter: any, index) => index !== item));
		setAddProductViewInfo(addProductViewInfo.filter((filter: any, index: any) => index !== item));
	};

	return (
		<>
			<div className={detailsPage}>
				<ArrowBack className={backButton} onClick={() => handleSubmit("close")} />
				<div className={flexWrapPage}>
					<div className={pageView}>
						<AddHeader title={"Add Purchase Order"} />
						<Formik
							initialValues={perChasevalue}
							onSubmit={handlePoSubmit}
							validationSchema={PurchaseOrderSchema}
						>
							{(props: any) => (
								<Form className={addPurchaseOrderForm}>
									<div className={justifyBetween}>
										<div className={flexCol}>
											<h4 className={productTitle}>Select Customer</h4>
											<div className={innerContainerPoAddForm}>
												<AutoCompleteSeacrhSelect
													onChange={handleChange}
													options={customerList}
													error="customer_id"
													name="customer_id"
													valueProps={props}
													label={"Select Customer"}
													value={props.values.customer_id}
													require={true}
													style={styleAddPurchaseOrder}
												/>
											</div>
										</div>
										<div className={radioContainer}>
											<h4 className={productTitleRadio}>Raw Material Included</h4>
											<RadioGroup
												aria-labelledby="demo-controlled-radio-buttons-group"
												name="has_raw_material"
												onChange={(e) => handleChange(e, props, "", "")}
												value={props.values.has_raw_material}
											>
												<FormControlLabel
													sx={{ fontSize: "100px" }}
													value={"Yes"}
													control={<Radio />}
													label={
														<InputLabel className={labelStylesMarginTop}>Yes</InputLabel>
													}
												/>
												<FormControlLabel
													value={"No"}
													control={<Radio />}
													label={<InputLabel className={labelStylesMarginTop}>No</InputLabel>}
												/>
											</RadioGroup>
										</div>
									</div>
									<div className={justifyBetween}>
										<div className={flexCol}>
											<h4 className={productTitle}>Select Delivery</h4>
											<div className={innerContainerPoAddForm}>
												<AutoCompleteSeacrhSelect
													onChange={handleChange}
													options={branchList?.map((item: any) => {
														return { name: item.name, id: item.id };
													})}
													error="origin_pointId"
													name="origin_pointId"
													valueProps={props}
													label={"Select Origin Point"}
													value={props.values.origin_pointId}
													require={true}
													style={styleAddPurchaseOrder}
												/>
												<AutoCompleteSeacrhSelect
													onChange={handleChange}
													options={branchList?.map((item: any) => {
														return { name: item.name, id: item.id };
													})}
													error="delivery_pointId"
													name="delivery_pointId"
													valueProps={props}
													label={"Select Delivery Point"}
													value={props.values.delivery_pointId}
													require={true}
													style={styleAddPurchaseOrder}
												/>
											</div>
										</div>
									</div>
									<div>
										<h4 className={productTitle}>Select Product</h4>
										<div className={innerContainerPoAddFormCol}>
											<Formik
												initialValues={poEntriesValues}
												onSubmit={addInProductInfo}
												validationSchema={ProductSchema}
											>
												{(propsItem) => (
													<Form>
														<AutoCompleteSeacrhSelect
															onChange={handleChange}
															error="productId"
															name="productId"
															valueProps={propsItem}
															label={"Select Product"}
															value={propsItem.values.productId}
															options={getProductListFromRating(productWithRateData)}
															require={true}
															style={styleAddPurchaseOrder}
														/>
														{addProductInfo.map((item: any, itemIndex) => {
															return (
																<div className={productInfo}>
																	<Input
																		disabled={false}
																		name={"length"}
																		label={"Product Length"}
																		valueProps={propsItem}
																		defaultValue={10}
																		error=""
																		value={item.length}
																		formGroupStyle={formGroupCol}
																		require={true}
																		inputStyle={formControlProductInfo}
																	/>
																	<Input
																		disabled={false}
																		name={"quantity"}
																		label={"Product Quantity"}
																		valueProps={propsItem}
																		error=""
																		value={item.quantity}
																		formGroupStyle={formGroupCol}
																		require={true}
																		inputStyle={formControlProductInfo}
																	/>
																	<AutoCompleteSeacrhSelect
																		options={getProductCoatingList(
																			productWithRateData,
																			propsItem?.values?.productId?.id
																		)}
																		error=""
																		name="typeId"
																		valueProps={props}
																		label={"Coating"}
																		value={item.typeId}
																		require={true}
																		style={styleAddSelectProductInfo}
																	/>

																	<AutoCompleteSeacrhSelect
																		options={getCoatingColorList(
																			productWithRateData,
																			propsItem?.values?.productId?.id,
																			propsItem?.values?.typeId?.id
																		)}
																		error=""
																		name="colorId"
																		valueProps={propsItem}
																		label={"Color"}
																		value={item.colorId}
																		require={true}
																		style={styleAddSelectProductInfo}
																	/>
																	<IconButtons
																		clickEvent={() =>
																			removeFromProductInfo(itemIndex)
																		}
																		styles={deleteType}
																		icon={<ClearIcon />}
																		type="button"
																	/>
																</div>
															);
														})}
														<div className={productInfo}>
															<Input
																disabled={
																	propsItem.values?.productId?.id ? false : true
																}
																name={"length"}
																onChange={handleChange}
																label={"Product Length"}
																valueProps={propsItem}
																error={"length"}
																defaultValue={getProductLength(
																	productWithRateData,
																	propsItem?.values?.productId?.id
																)}
																value={propsItem.values.length}
																formGroupStyle={formGroupCol}
																require={true}
																inputStyle={formControlProductInfo}
															/>
															<Input
																disabled={
																	propsItem.values?.productId?.id ? false : true
																}
																name={"quantity"}
																label={"Product Quantity"}
																onChange={handleChange}
																valueProps={propsItem}
																error={"quantity"}
																value={propsItem.values.quantity}
																formGroupStyle={formGroupCol}
																require={true}
																inputStyle={formControlProductInfo}
															/>
															<AutoCompleteSeacrhSelect
																onChange={handleChange}
																options={getProductCoatingList(
																	productWithRateData,
																	propsItem?.values?.productId?.id
																)}
																error="typeId"
																name="typeId"
																valueProps={propsItem}
																label={"Coating"}
																value={propsItem.values.typeId}
																require={true}
																disabled={
																	propsItem.values?.productId?.id ? false : true
																}
																style={styleAddSelectProductInfo}
															/>
															<AutoCompleteSeacrhSelect
																onChange={handleChange}
																options={getCoatingColorList(
																	productWithRateData,
																	propsItem?.values?.productId?.id,
																	propsItem?.values?.typeId?.id
																)}
																error="colorId"
																name="colorId"
																valueProps={propsItem}
																label={"Color"}
																value={propsItem.values.colorId}
																require={true}
																disabled={
																	propsItem.values?.productId?.id ? false : true
																}
																style={styleAddSelectProductInfo}
															/>
															<IconButtons
																clickEvent={(e: any) => {
																	e.preventDefault();
																	propsItem.handleSubmit();
																}}
																disabled={
																	propsItem.values?.productId?.id &&
																	addProductViewInfo.length > 0
																		? propsItem?.values?.typeId?.name ===
																				addProductViewInfo[0]?.typeId &&
																		  propsItem?.values?.length ===
																				addProductViewInfo[0]?.length.toString() &&
																		  propsItem?.values?.colorId?.id ===
																				addProductViewInfo[0]?.colorId
																		: !propsItem.values?.productId?.id
																}
																styles={addType}
																icon={<Add />}
																type="submit"
															/>
														</div>
														{addProductViewInfo.length > 0 &&
															propsItem?.values?.typeId?.name ===
																addProductViewInfo[0]?.typeId &&
															propsItem?.values?.length ===
																addProductViewInfo[0]?.length.toString() &&
															propsItem?.values?.colorId?.id ===
																addProductViewInfo[0]?.colorId && (
																<div className={errTextAddPo}>
																	Length, Coating, Color combination must be unique
																</div>
															)}
														<div className={buttonMarginPoAddForm}>
															<IconButtons
																clickEvent={(e: any) => {
																	e.preventDefault();
																	propsItem.resetForm();
																	setAddProductInfo([]);
																	setAddProductViewInfo([]);
																}}
																styles={cancleButton}
																lebel={"Reset"}
																type="reset"
															/>
															<IconButtons
																clickEvent={(e: any) => {
																	e.preventDefault();
																	handleFormSubmit();
																}}
																disabled={disabled}
																styles={submitButton}
																lebel={"Add"}
																type="button"
															/>
														</div>
													</Form>
												)}
											</Formik>
										</div>
									</div>
									{savePoEntries?.length > 0 && (
										<div className={purchaseOrderSubmit}>
											<AddHeader title={"Add Purchase Order"} />
											<CollapsibleTable
												tableHead={yourPurchaseOrderHead}
												tableInnerHead={yourPurchaseOrderInnerHead}
												tableInnerData={tableInnerData}
												tableData={tableData}
												iconAt={1}
												title={"Product"}
											/>
										</div>
									)}
									{savePoEntries?.length > 0 && (
										<div className={buttonMarginPoAddForm}>
											<IconButtons
												styles={submitButton}
												clickEvent={props.handleSubmit}
												lebel={"Submit"}
												type="submit"
											/>
										</div>
									)}
								</Form>
							)}
						</Formik>
					</div>
				</div>
			</div>
		</>
	);
};
export default AddPurchaseOrder;
