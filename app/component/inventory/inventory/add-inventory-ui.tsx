import { Form, Formik } from "formik";
import { Input, MultiSelectInput } from "@component/utils/form-fields";
import { InventoryProps, inventoryViewValuesType } from "@component/utils/type/interfaces";
import { verifyForm, loginBtn, btnDiv } from "@css/styles";
import useHandleChange from "@component/utils/form/handle-change";
import { useValidation } from "@component/utils/form/validation";
import { memo, useEffect } from "react";
import { getProduct } from "@api/get-api-queries";
import useRate from "@component/product/rate/rate-hook";
import VariantCard from "@component/product/rate/variant-details";
import { variantViewColums } from "@component/utils/form/constant";

const AddInventoryView = (data: InventoryProps) => {
	const { handleChange } = useHandleChange("", "");
	const { inventoryvalue, onClickByAdmin, tableDataSelect } = data;
	const { InventorySchema } = useValidation(inventoryvalue);

	const handleProductVariantSubmit = (values: inventoryViewValuesType) => {
		const castValues: any = InventorySchema.cast(values);
		onClickByAdmin(castValues, "close", inventoryvalue.id);
	};

	const { products } = getProduct("", "");
	const { getAllList, productVariantlist, handleOnClick } = useRate();

	useEffect(() => {
		getAllList();
	}, [products.isLoading]);

	return (
		<div className={verifyForm}>
			<Formik
				initialValues={inventoryvalue}
				onSubmit={handleProductVariantSubmit}
				validationSchema={InventorySchema}
			>
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
						<div className={btnDiv}>
							<button className={loginBtn} type="submit">
								{inventoryvalue.id ? "Save Changes" : "Add Inventory"}
							</button>
						</div>
					</Form>
				)}
			</Formik>
		</div>
	);
};
export default memo(AddInventoryView);
