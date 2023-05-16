import { Form, Formik } from "formik";
import { Input, MultiSelectInput } from "@component/utils/form-fields";
import { GarbageTypeProps, GarbageValuesType } from "@component/utils/type/interfaces";
import { verifyForm, loginBtn, btnDiv } from "@css/styles";
import useHandleChange from "@component/utils/form/handle-change";
import { useValidation } from "@component/utils/form/validation";
import { memo, useEffect } from "react";
import { getProduct } from "@api/get-api-queries";
import useRate from "@component/product/rate/rate-hook";
import { variantViewColums } from "@component/utils/form/constant";
import VariantCard from "@component/product/rate/variant-details";

const AddGarbage = (data: GarbageTypeProps) => {
	const { handleChange } = useHandleChange("", "");
	const { garbageValues, onClickByAdmin, tableDataSelect } = data;
	const { GarbageSchema } = useValidation(garbageValues);
	const handleGarbageSubmit = (values: GarbageValuesType) => {
		const castValues: any = GarbageSchema.cast(values);
		onClickByAdmin(castValues, "close", garbageValues.id);
	};
	const { products } = getProduct("", "");
	const { getAllList, productVariantlist, handleOnClick } = useRate();

	useEffect(() => {
		getAllList();
	}, [products.isLoading]);

	return (
		<div className={verifyForm}>
			<Formik initialValues={garbageValues} onSubmit={handleGarbageSubmit} validationSchema={GarbageSchema}>
				{(props) => (
					<Form>
						<MultiSelectInput
							onChange={handleChange}
							productRateDetails={{}}
							options={productVariantlist}
							error="productId"
							name="productId"
							valueProps={props}
							disabled={false}
							label={"Product"}
							placeholder={"Select Product"}
							value={props.values.productId}
							require={true}
							handleOnClick={handleOnClick}
							columdata={tableDataSelect}
							colums={variantViewColums}
						/>
						<VariantCard variantObj={props.values.productId} />
						<Input
							disabled={false}
							placeholder={"Enter Quantity"}
							name={"quantity"}
							onChange={handleChange}
							label={"Quantity"}
							valueProps={props}
							error={"quantity"}
							value={props.values.quantity}
						/>
						<Input
							disabled={false}
							placeholder={"Enter Length"}
							name={"length"}
							onChange={handleChange}
							label={"Length"}
							valueProps={props}
							error={"length"}
							value={props.values.length}
						/>
						<div className={btnDiv}>
							<button className={loginBtn} type="submit">
								{garbageValues.id ? "Save Changes" : "Add Garbage"}
							</button>
						</div>
					</Form>
				)}
			</Formik>
		</div>
	);
};
export default memo(AddGarbage);
