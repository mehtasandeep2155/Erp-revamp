import * as Yup from "yup";
import {
	passwordregex,
	emailregex,
	phoneRegExp,
	nameRegExp,
	priceRegExp,
	nameNumberRegExp
} from "@component/utils/regex-helper";

export const useValidation = (values: any) => {
	const LoginSchema = Yup.object({
		email: Yup.string().required("Email is Required!"),
		password: Yup.string().required("Password is Required!")
	});
	const SignUpSchema = () =>
		Yup.object({
			companyName: Yup.string()
				.trim()
				.matches(nameRegExp, "Invalid Company Name")
				.required("Company Name is Required!"),
			name: Yup.string().trim().matches(nameRegExp, "Invalid Name").required("Name is Required!"),
			email: Yup.string().required("Email is Required!").email().matches(emailregex, "Invalid Email!"),
			password: Yup.string().required("Password is Required!").matches(passwordregex, "Password Must be Storng!"),
			confirmPassword: Yup.string()
				.required("Confirm Password is Required!")
				.oneOf([Yup.ref("password"), null], "Both Password should be Same!")
		});

	const ForgettPasswordSchema = Yup.object({
		email: Yup.string().required("Email is Required!").email("Invalid Email!").matches(emailregex, "Invalid Email!")
	});

	const VerifySchema = Yup.object({
		email: Yup.string()
			.required("Email is Required!")
			.email("Invalid Email!")
			.matches(emailregex, "Invalid Email!"),
		role: Yup.string().required("User Role is Required!"),
		name: Yup.string().required("Name is Required!"),
		password: Yup.string().required("Password is Required!").matches(passwordregex, "Password Must be Storng!")
	});

	const ProductColorSchema = Yup.object({
		color: Yup.string().lowercase().trim().matches(nameRegExp, "Invalid Color Name").required("Color is Required!")
	});

	const SubCompanySchema = Yup.object({
		name: Yup.string().matches(nameRegExp, "Invalid Sub Company Name").required("Sub Company is Required!")
	});

	const CompanySchema = Yup.object({
		name: Yup.string()
			.lowercase()
			.trim()
			.matches(nameRegExp, "Invalid Company Name")
			.required("Company Name is Required!"),
		subCompanyId: Yup.array().min(1, "Sub Company Is Required!").required("Sub Company is Required!")
	});

	const ProductTypeSchema = Yup.object({
		type: Yup.string().trim().matches(nameRegExp, "Invalid Coating!").required("Coating is Required!"),
		colors: Yup.array().min(1, "Colors Must be An Array").required("Colors is Required!")
	});
	const JobSchema: any = Yup.object({
		userId: Yup.object().required("User Details is Required!"),
		payType: Yup.object().required("Payment Type  is Required!"),
		month: Yup.string().required("Payment Month is Required!"),
		totalPay: Yup.number().typeError("Total Payment must be in Number").required("Total Payment is Required!"),
		feet_per_month: Yup.number()
			.typeError("Feet Per Month must be in Number")
			.required("Feet Per Month is Required!"),
		rate_per_foot: Yup.number()
			.typeError("Rate Per Month must be in Number")
			.required("Rate Per Month is Required!")
	});

	const branchSchema = Yup.object({
		name: Yup.string().trim().required("Name is Required!"),
		address: Yup.string().trim().required("Address is Required!"),
		type: Yup.object().required("Type is Required!"),
		phone: Yup.string()
			.trim()
			.required("Phone Number Is Required")
			.matches(phoneRegExp, "Phone number is not valid")
			.min(10, "Phone number is not too short")
			.max(10, "Phone number is not too long"),
		contact_name: Yup.string().trim().matches(nameRegExp, "Invalid Contact Name!").nullable(),
		contact_phone: Yup.string()
			.trim()
			.matches(phoneRegExp, "Phone number is not valid")
			.min(10, "Phone number is not too short")
			.nullable()
	});

	const CustomerSchema = Yup.object({
		name: Yup.string().trim().matches(nameRegExp, "Invalid Customer Name").required("Customer Name is Required!"),
		email: Yup.string()
			.trim()
			.required("Email is Required!")
			.email("Invalid Email!")
			.matches(emailregex, "Invalid Email!"),
		phone: Yup.string()
			.trim()
			.required("Phone Number Is Required")
			.matches(phoneRegExp, "Phone number is not valid")
			.min(10, "Phone number is not too short")
			.max(10, "Phone number is not too long")
	});

	const LedgerSchema = Yup.object({
		customerId: Yup.object().typeError("Customer Name is Required!").required("Customer Name is Required!"),
		transaction_type: Yup.object()
			.typeError("Transaction Type is Required!")
			.required("Transaction Type is Required!"),
		amount: Yup.string().trim().required("Amount is Required!").matches(priceRegExp, "Amount must be Number"),
		transaction_status: Yup.object()
			.typeError("Transaction Status is Required!")
			.required("Transaction Status is Required!")
	});

	const InvoiceSchema = Yup.object({
		associated_poId: Yup.string().typeError("Purchase-order ID is Required!"),
		cost_per_kg: values
			? Yup.number().typeError("Cost Per Kg Must be Number").required("Cost Per Kg is Required!")
			: Yup.string().notRequired(),
		coating_discount: Yup.number()
			.typeError("Cost Per Kg Must be Number")
			.nullable()
			.transform((v, o) => (o === "" ? null : v)),
		tax: Yup.number()
			.typeError("Tax Must be Number")
			.nullable()
			.transform((v, o) => (o === "" ? null : v))
	});

	const ProductRateSchema = Yup.object({
		rate: Yup.string().required("Rate is Required!").matches(priceRegExp, "Rate must be Number"),
		productId: Yup.object().required("Variant is Required!"),
		typeId: Yup.object().required("Uom is Required!")
	});

	const ProductVariantSchema: any = Yup.object({
		name: Yup.string()
			.trim()
			.notOneOf(
				values?.array
					? values.array.map((item: any) => {
							if (values.values.name !== item.name.name) {
								return item.name.name.toLowerCase();
							}
					  })
					: [],
				"It is already Exitst "
			)
			.required("Product Name is Required!"),
		width: Yup.number()
			.typeError("Width must be a number")
			.nullable()
			.transform((v, o) => (o === "" ? null : v)),
		height: Yup.number()
			.typeError("Height must be a number")
			.nullable()
			.transform((v, o) => (o === "" ? null : v)),
		weight: Yup.number()
			.typeError("Weight must be a number")
			.nullable()
			.transform((v, o) => (o === "" ? null : v)),
		thickness: Yup.number()
			.typeError("Thickness must be a number")
			.nullable()
			.transform((v, o) => (o === "" ? null : v))
			.required("Thckness Is Required!"),
		length: Yup.number()
			.typeError("Length must be a number")
			.nullable()
			.transform((v, o) => (o === "" ? null : v))
			.required("Length is Required!")
	});

	const InventoryMasterSchema = Yup.object({
		type: Yup.object().required("Type is Required!"),
		actionType: Yup.object().required("Type is Required!"),
		productId: Yup.object().required("Product Id is Required!"),
		quantity: Yup.number().typeError("Product Count must be a number").required("Product Count is Required!"),
		length: Yup.number().typeError("Length  must be a number").required("Length is Required!")
	});

	const GarbageSchema = Yup.object({
		productId: Yup.object().required("Product Id is Required!"),
		quantity: Yup.number().typeError("Product Count must be a number").required("Product Count is Required!"),
		length: Yup.number().typeError("Length  must be a number").required("Length is Required!")
	});

	const ProductSchema = Yup.object({
		quantity: Yup.number().typeError("Product Count must be a number").required("Product Count is Required!"),
		length: Yup.number().typeError("Length  must be a number").required("Length is Required!"),
		rateId: Yup.string().notRequired(),
		colorId: Yup.object()
			.required("Color is Required!")
			.typeError(null)
			.nullable()
			.transform((v, o) => (o === "" ? null : v)),
		typeId: Yup.object()
			.typeError(null)
			.required("Coating is Required!")
			.nullable()
			.transform((v, o) => (o === "" ? null : v))
	});

	const varifyPoSchema = Yup.object({
		status: Yup.object().required("Status is Required!"),
		gross_weight: Yup.number()
			.typeError("Gross Weight must be a number")
			.nullable()
			.transform((v, o) => (o === "" ? null : v)),
		net_weight: Yup.number()
			.typeError("Net Weight must be a number")
			.nullable()
			.transform((v, o) => (o === "" ? null : v))
	});

	const varifyPoStatusSchema = Yup.object({
		status: Yup.object().required("Status is Required!"),
		gross_weight: Yup.number()
			.typeError("Gross Weight must be a number!")
			.nullable()
			.transform((v, o) => (o === "" ? null : v))
			.required("Gross Weight is Required!"),
		net_weight: Yup.number()
			.typeError("Net Weight must be a number!")
			.nullable()
			.transform((v, o) => (o === "" ? null : v))
			.required("Net Weight is Required!")
	});

	const PurchaseOrderSchema = Yup.object({
		customer_id: Yup.object().typeError("Customer is Required").required("Customer is Required!"),
		has_raw_material: Yup.string().required("Raw Material is Required!")
	});

	const InventorySchema = Yup.object({
		productId: Yup.object().required("Product Id is Required!"),
		quantity: Yup.number().typeError("Product Count must be a number").required("Product Count is Required!")
	});
	return {
		CustomerSchema,
		InvoiceSchema,
		LoginSchema,
		VerifySchema,
		ForgettPasswordSchema,
		ProductSchema,
		ProductVariantSchema,
		ProductColorSchema,
		ProductRateSchema,
		ProductTypeSchema,
		PurchaseOrderSchema,
		SubCompanySchema,
		CompanySchema,
		InventoryMasterSchema,
		GarbageSchema,
		branchSchema,
		InventorySchema,
		varifyPoSchema,
		varifyPoStatusSchema,
		LedgerSchema,
		JobSchema,
		SignUpSchema
	};
};
