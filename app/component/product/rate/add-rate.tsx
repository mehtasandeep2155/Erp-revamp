import { Form, Formik } from "formik";
import { memo, useEffect, useState } from "react";
import { Input, AutoCompleteSeacrhSelect } from "@component/utils/form-fields";
import {
	verifyForm,
	btnDiv,
	formRateDiv,
	flex,
	formControlProduct,
	flexCol2Autoinput,
	flexEnd,
	formGroupProduct
} from "@css/styles";
import useHandleChange from "@component/utils/form/handle-change";
import { getType } from "@api/get-api-queries";
import VariantCard from "./variant-details";
import { useValidation } from "@component/utils/form/validation";
import { AddHeader } from "@component/commoncomponent/add-header";
import { IconButtons } from "@common/buttons";
import { addButton, cancleButton, deleteType, disabledBtnStyles, style, submitButton } from "@css/mui-styles";
import { Add, Clear } from "@mui/icons-material";
import useProduct from "../products/product-hook";

const AddProductRate = () => {
	const { handleChange } = useHandleChange("", "");
	const { rateValue, onClickRate, getAllList, productTypelist } = useProduct();
	const { types } = getType("", "");
	const { ProductRateSchema } = useValidation(rateValue);
	const [rateData, setRateDate] = useState([]);
	const handleRateSubmit = (values: any, { resetForm }: any) => {
		const castValues: any = ProductRateSchema.cast(values);
		setRateDate([
			...rateData,
			{
				rate: Number(parseFloat(castValues.rate.replaceAll(",", ""))),
				productId: castValues.productId.id,
				typeId: castValues.typeId.id
			}
		]);
		resetForm();
	};

	const handleSubmit = () => {
		onClickRate(rateData, "close", rateValue.id);
	};

	const handleClear = (item: any) => {
		setRateDate(rateData.filter((filter: any) => filter.typeId !== item));
	};

	const handleEditChange = (event: any, setFieldValue: any, index: any) => {
		rateData.map((item1: any, index1: number) => {
			if (index1 === index) {
				if (event.target.value.match(/[a-z]/) || event.target.value.match(/[A-Z]/)) {
					setFieldValue(event.target.name, "");
				} else {
					rateData[index1]["rate"] = Number(event.target.value);
				}
			}
		});
		setRateDate(rateData);
		if (event.target.name === "rate") {
			if (event.target.value.match(/[a-z]/) || event.target.value.match(/[A-Z]/)) {
				setFieldValue(event.target.name, "");
			} else {
				setFieldValue(event.target.name, Number(event.target.value));
			}
		} else {
			setFieldValue(event.target.name, event.target.value.id);
		}
	};

	useEffect(() => {
		rateValue.coatings.map((item: any) => {
			setRateDate([...rateData, { rate: item.rate, productId: rateValue.productId, typeId: item.coatingId }]);
		});
		getAllList();
	}, [types.isLoading]);

	return (
		<div className={verifyForm}>
			<AddHeader title={rateValue.id ? "Edit Product Rate" : "Product Rate"} />
			<div className={flex}>
				<div className={formRateDiv}>
					{rateData.map((item: any, index: any) => (
						<Formik initialValues={item} onSubmit={handleRateSubmit} validationSchema={ProductRateSchema}>
							{(propsItem) => (
								<Form>
									<div className={flexCol2Autoinput}>
										<AutoCompleteSeacrhSelect
											disabled={true}
											options={productTypelist}
											error=""
											name="typeId"
											label={"Coating Type"}
											placeholder={"Select Coating Type"}
											onChange={(e: any) => handleEditChange(e, propsItem.setFieldValue, index)}
											value={
												productTypelist.filter(
													(item1: any) => item1.id === propsItem.values.typeId
												)[0].name
											}
											require={true}
											formGroup={index > 0 && formGroupProduct}
											style={style}
										/>
										<Input
											placeholder={"Enter Product Rate"}
											name={"rate"}
											label={"Rate"}
											onChange={(e: any) => handleEditChange(e, propsItem.setFieldValue, index)}
											error=""
											value={propsItem.values.rate}
											formGroupStyle={index > 0 && formGroupProduct}
											require={true}
											inputStyle={formControlProduct}
										/>
										<IconButtons
											clickEvent={() => handleClear(item.typeId)}
											styles={deleteType}
											icon={<Clear />}
											type="button"
										/>
									</div>
								</Form>
							)}
						</Formik>
					))}
					<Formik initialValues={rateValue} onSubmit={handleRateSubmit} validationSchema={ProductRateSchema}>
						{(props) => (
							<Form>
								<div className={flexCol2Autoinput}>
									<AutoCompleteSeacrhSelect
										onChange={handleChange}
										options={productTypelist.filter(
											(item: any) =>
												!rateData.map((filter: any) => filter.typeId).includes(item.id)
										)}
										error="typeId"
										name="typeId"
										valueProps={props}
										label={"Coating Type"}
										placeholder={"Select Coating Type"}
										value={props.values.typeId}
										require={true}
										formGroup={formGroupProduct}
										style={style}
									/>
									<Input
										disabled={false}
										placeholder={"Enter Product Rate"}
										name={"rate"}
										onChange={handleChange}
										label={"Rate"}
										valueProps={props}
										error={"rate"}
										value={props.values.rate}
										formGroupStyle={formGroupProduct}
										require={true}
										inputStyle={formControlProduct}
									/>
									<IconButtons styles={addButton} icon={<Add />} type="submit" />
								</div>
							</Form>
						)}
					</Formik>
				</div>
				<div style={{ width: "35%" }}>
					<VariantCard variantObj={rateValue.productId} />
				</div>
			</div>
			<div className={flexEnd}>
				<div className={btnDiv}>
					<IconButtons
						clickEvent={() => onClickRate("", "model", "")}
						styles={cancleButton}
						lebel={"Cancel"}
						type="button"
					/>
					<IconButtons
						clickEvent={handleSubmit}
						styles={rateData.length < 1 ? disabledBtnStyles : submitButton}
						disabled={rateData.length < 1}
						lebel={rateValue.id ? "Save" : "Finish"}
						type="button"
					/>
				</div>
			</div>
		</div>
	);
};

export default memo(AddProductRate);
