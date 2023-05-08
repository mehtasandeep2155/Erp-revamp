import { Form, Formik } from "formik";
import { AutoCompleteSeacrhSelect, Input, MultiSelectInput } from "@component/utils/form-fields";
import { verifyForm, loginBtn, btnDiv, btnViewMore, addDiv, close } from "@css/styles";
import useHandleChange from "@component/utils/form/handle-change";
import { useValidation } from "@component/utils/form/validation";
import { memo, useEffect } from "react";
import VariantCard from "@component/product/rate/variant-details";
import { variantViewColums } from "@component/utils/form/constant";
import useRate from "@component/product/rate/rate-hook";
import { getProduct } from "@api/get-api-queries";
import useInventoryView from "./inventroy-view-hook";
import { Box, Chip } from "@mui/material";
import { Cancel } from "@mui/icons-material";

const AddInventoryView = (data: any) => {
	const { invevtoryViewvalue, tableDataSelect } = data;
	const { handleChange } = useHandleChange("", "");
	const { InventoryMasterSchema } = useValidation(invevtoryViewvalue);
	const { dataList, handleSubmit, handleDelete, handleMore, handleReset } = useInventoryView();
	const { products } = getProduct();
	const { getAllList, productVariantlist, handleOnClick } = useRate();

	useEffect(() => {
		getAllList();
	}, [products.isLoading, products.isFetched]);

	return (
		<div className={verifyForm}>
			<Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
				{dataList?.map((value: any) => (
					<Chip
						key={value}
						label={value.type}
						deleteIcon={<Cancel className={close} onMouseDown={(event: any) => event.stopPropagation()} />}
						onDelete={() => handleDelete(value)}
					/>
				))}
			</Box>
			<Formik initialValues={invevtoryViewvalue} onSubmit={handleMore} validationSchema={InventoryMasterSchema}>
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
						<AutoCompleteSeacrhSelect
							options={[{ name: "raw" }, { name: "garbage" }]}
							onChange={handleChange}
							error={"type"}
							name={"type"}
							valueProps={props}
							value={props.values.type}
							label={"Inventory Type"}
							placeholder={"Select Inventory Type"}
						/>
						<Input
							disabled={props.values.type.name === "raw" ? true : false}
							placeholder={"Enter Length"}
							name={"length"}
							onChange={handleChange}
							label={"Length"}
							valueProps={props}
							error={"length"}
							value={props.values.length}
						/>
						<AutoCompleteSeacrhSelect
							options={[{ name: "add" }, { name: "subtract" }]}
							onChange={handleChange}
							error={"actionType"}
							name={"actionType"}
							valueProps={props}
							value={props.values.actionType}
							label={"Action Type"}
							placeholder={"Select Action Type"}
						/>
						{!invevtoryViewvalue.id && (
							<button className={btnViewMore} type="submit" onClick={() => handleReset(props)}>
								<div className={addDiv}>
									<span>+ Add More</span>
								</div>
							</button>
						)}
						<div className={btnDiv}>
							<button
								className={loginBtn}
								type={dataList.length > 0 ? "button" : "submit"}
								onClick={() => handleSubmit(props.values)}
							>
								{invevtoryViewvalue.id ? "Save Changes" : "Add Inventory Master"}
							</button>
						</div>
					</Form>
				)}
			</Formik>
		</div>
	);
};
export default memo(AddInventoryView);
