import { useEffect, memo, useState } from "react";
import PurchaseOrderWeb from "./purchase-order-ui";
import CustomizedDialogs from "@common/dailog/dailog-model";
import AddPurchaseOrder from "./add-purchase-order";
import { ProductMultiSelectInput } from "@component/utils/form-fields";
import { addDiv, btnViewOrder, continueBut, flexInputPurchase } from "@css/styles";
import useHandleChange from "@component/utils/form/handle-change";
import usePurchaseOrder from "./purchase-order-hook";
import AddPoEntries from "./po-entries/add-po-entries";
import { useValidation } from "@component/utils/form/validation";
import VerifyPurchaseOrder from "./verify-purchase-order";
import CustomerCard from "./customer-view";
import ProductView from "./po-entries/po-entries-view";
import { getProduct, getPurchaseOrders, getRate } from "@api/get-api-queries";

function PurchaseOrderList() {
	const [step, setStep] = useState<number>(0);
	const {
		perChasevalue,
		getAllPurchaseList,
		onClick,
		tableData,
		columns,
		fetchagain,
		IsOpen,
		loader,
		poEntriesValue,
		productslist,
		handleProductApprove,
		setPurchaseValue,
		getAllProduct,
		handleView,
		IsDetails,
		isOpenCustomer,
		handleCustomerView,
		customerObj,
		isOpenProduct,
		handleProductView,
		productObjList,
		productDetailsList,
		handleTableData,
		handleDelete,
		ProductClick,
		handleOnClick,
		handleOnClickPurchase,
		productmenu,
		InvoiceValue,
		tableDataProductSelect,
		getAllList,
		productRatelist,
		productPurchaseOrderlist,
		verifyValue
	} = usePurchaseOrder(setStep);

	const { ProductSchema, PurchaseOrderSchema } = useValidation(InvoiceValue);
	const { rates } = getRate();
	const { products } = getProduct();
	const { purchaseOrderds } = getPurchaseOrders();
	const { varifyPoSchema } = useValidation(verifyValue);

	useEffect(() => {
		getAllPurchaseList();
		getAllList();
	}, [purchaseOrderds.isLoading, fetchagain, rates.isLoading, purchaseOrderds.isRefetching]);

	const [error, setError] = useState("");

	const { handleChange } = useHandleChange("", "");
	const handleNext = (values: any) => {
		const castValues = PurchaseOrderSchema.cast(values);
		if (values.products) {
			handleTableData(castValues, "set");
			setStep(step + 1);
		} else {
			setPurchaseValue(castValues);
			setStep(step + 1);
		}
	};

	const handleBack = () => {
		setStep(step - 1);
	};

	const handleSubmit = () => {
		if (productDetailsList.length > 0) {
			setError("");
			let Values: any = { ...perChasevalue, ["products"]: productDetailsList };
			if (!perChasevalue.id) {
				onClick(Values, "close", "");
				setStep(0);
			} else {
				setStep(0);
				onClick(Values, "close", perChasevalue.id);
			}
		} else {
			setError("Product Is Required!");
		}
	};

	const handelProductSubmit = (values: any) => {
		ProductClick(values, "close", poEntriesValue.id);
	};

	useEffect(() => {
		getAllProduct();
	}, [products.isLoading, fetchagain]);

	return (
		<>
			<PurchaseOrderWeb columns={columns} tableData={tableData} onClickByAdmin={onClick} loading={loader} />
			<CustomizedDialogs
				title="Purchase Order Details"
				isOpen={IsDetails}
				handleClose={handleView}
				width="sm"
				content={
					<VerifyPurchaseOrder
						validation={varifyPoSchema}
						verifyValue={verifyValue}
						disabled={true}
						perChasevalue={perChasevalue}
						handleProductApprove={handleProductApprove}
						status="coating_initiated"
						productObjList={productObjList}
					/>
				}
			/>
			<CustomizedDialogs
				title="Customer Info"
				isOpen={isOpenCustomer}
				handleClose={handleCustomerView}
				width="sm"
				content={<CustomerCard customerObj={customerObj} />}
			/>
			<CustomizedDialogs
				title="Product Info"
				isOpen={isOpenProduct}
				handleClose={handleProductView}
				width="md"
				content={<ProductView products={productObjList} />}
			/>
			<CustomizedDialogs
				title={step === 0 ? "Purchase Order" : "PO Entries"}
				isOpen={IsOpen}
				handleClose={onClick}
				content={
					step === 0 ? (
						<>
							<AddPurchaseOrder
								handleBack={handleBack}
								handleNext={handleNext}
								perChasevalue={perChasevalue}
							/>
						</>
					) : (
						<>
							<div>
								<ProductMultiSelectInput
									onChange={handleChange}
									options={productslist}
									label="PO Entries"
									error={error}
									name="products"
									tableDataSelect={tableDataProductSelect}
									placeholder={poEntriesValue}
									productDetailsList={productDetailsList}
									handleOnClick={handleOnClick}
									handleDelete={handleDelete}
									productClick={ProductClick}
									button={
										<button
											type="button"
											className={btnViewOrder}
											onClick={() => ProductClick(poEntriesValue, "open", "")}
										>
											<div className={addDiv}>
												<span>+ Add New</span>
											</div>
										</button>
									}
								/>
							</div>
							<div className={flexInputPurchase}>
								<button className={continueBut} type="button" onClick={handleBack}>
									Back
								</button>
								<button className={continueBut} type="button" onClick={handleSubmit}>
									Submit
								</button>
							</div>
							<CustomizedDialogs
								title="PO Entries"
								isOpen={productmenu}
								width="sm"
								handleClose={ProductClick}
								content={
									<AddPoEntries
										productRatelist={productRatelist}
										handleOnClick={handleOnClick}
										handleOnClickPurchase={handleOnClickPurchase}
										poEntriesValue={poEntriesValue}
										productUserlist={productPurchaseOrderlist}
										validation={ProductSchema}
										handelSubmit={handelProductSubmit}
										poOpen={true}
									/>
								}
							/>
						</>
					)
				}
			/>
		</>
	);
}
export default memo(PurchaseOrderList);
