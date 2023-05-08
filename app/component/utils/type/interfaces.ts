import { MenuItemProps, MenuProps } from "@mui/material";
import { ObjectSchema } from "yup";

export interface LoginProps {
	values: any;
	submit: (values: any) => void;
	loader: boolean;
}

export interface SignUpProps {
	values: any;
	submit: any;
	handleChange: (event: React.ChangeEvent<HTMLInputElement>, setFieldValue: any, id: any, uid: any) => void;
	loader: any;
}

export interface ForgetPaasWordPassword {
	values: { email: string };
}

export interface ResetPassword {
	values: { password: string; confirmPassword: string };
	submit: (values: { password: string; confirmPassword: string }) => void;
	handleChange: (event: React.ChangeEvent<HTMLInputElement>, setFieldValue: any, id: any, uid: any) => void;
	loader: any;
}

export interface handleSubmitLoginProps {
	email: string;
	password: string;
}

export interface handleSubmitSignUpProps {
	companyName: string;
	email: string;
	password: string;
	confirmPassword: string;
	name: string;
}

export interface handleSubmitForgettpasswordProps {
	email: string;
}

export interface handleSubmitResetPasswordProps {
	password: string;
	confirmPassword: string;
}

export interface storeTypeProps {
	userList: Array<object>;
}

export interface tableProps {
	columns: Array<string>;
	tableData: Array<{}>;
	title: string;
	onDelete: any;
	loading: boolean;
}
export interface moduletype {
	name: string;
	controls: Array<string>;
}
export interface userdetailstype {
	company: string;
	companyName: string;
	email: string;
	moduleAccess: Array<any>;
	role: string;
	sub_companies: Array<string>;
}

export interface VerifyUserProps {
	userdetails: userdetailstype;
	onChange: any;
	submit: (values: any) => void;
	handleDelete: (id: any, type: string) => void;
	companyList: Array<string>;
	modulearray: any;
	onClose: (item: any, type: string) => void;
	companyNames: Array<string>;
	Members: Array<string>;
	modules: any;
}

export interface VerifyUserWebProps {
	userdetails: userdetailstype;
	onClick: any;
}

export interface productValuesType {
	weightUom: any;
	weightUomId: any;
	value: any;
	id: string;
	name: string;
	width: number;
	height: number;
	thickness: number;
	weight: number;
	length: number;
}

export interface inventoryViewValuesType {
	productId: string;
	id: string;
	quantity: string;
	type: string;
	actionType: string;
}

export interface GarbageValuesType {
	value(arg0: string, value: any): unknown;
	productId: any;
	quantity: string;
	length: string;
	id: string;
}

export interface productColorValuesType {
	color: string;
}

export interface productColorValuesEditType {
	id: string;
	name: productColorValuesType;
}

export interface SubCompanyValuesType {
	id(values: SubCompanyValuesType, arg1: string, id: any): unknown;
	name: string;
}

export interface CompanyValuesType {
	name: string;
	subCompanyId: Array<string>;
}

export interface BranchValueTypes {
	address: string;
	type: string;
	phone: string;
	contact_name: string;
	contact_phone: string;
}
export interface DialogTitleProps {
	id: any;
	children?: React.ReactNode;
	onClose: () => void;
}
export interface productTypeValuesType {
	type: string;
	colors: any;
	id: any;
	name: any;
	product: any;
}

export interface ProductTypeProps {
	typeValue: any;
	onClickByAdmin: (values: any, type: string, id: string) => void;
}

export interface ProductProps {
	poEntriesValue: any;
	validation: any;
	poOpen: boolean;
	handelSubmit: any;
	productUserlist: any;
	handleOnClickPurchase: any;
	handleOnClick: any;
	productRatelist: any;
}

export interface ProductColorProps {
	colorValue: any;
	validation: ObjectSchema<productColorValuesType>;
	onClickByAdmin: (values: any, type: string, id: string) => void;
}

export interface SubCompanyProps {
	subCompanyValue: any;
	validation: any;
	onClickByAdmin: (values: any, type: string, id: string) => void;
}
export interface CompanyProps {
	comapnyValue: any;
	validation: ObjectSchema<CompanyValuesType>;
	onClickByAdmin: (values: any, type: string, id: string) => void;
}

export interface CutomerProps {
	customerValue: any;
	purchase: any;
	validation: any;
	props: any;
	setIsOpen: any;
	onClickByAdmin: (values: any, type: any, id: any) => void;
}
export interface JobProps {
	jobValue: any;
	purchase: any;
	validation: any;
	props: any;
	setIsOpen: any;
	onClickByAdmin: (values: any, type: any, id: any) => void;
}
export interface BranchProps {
	branchValue: any;
	purchase: any;
	props: any;
	setIsOpen: any;
	onClickByAdmin: (values: any, type: any, id: any) => void;
}
export interface LedgerProps {
	ledgerValue: any;
	purchase: any;
	validation: any;
	props: any;
	setIsOpen: any;
	disabled: any;
	onClickByAdmin: (values: any, type: any, id: any) => void;
}

export interface InvoiceProps {
	InvoiceValue: any;
	purchase: any;
	disabled: any;
	handleOnInvoceClick: any;
	tableDataSelect: any;
	setIsOpen: any;
	productPoList: any;
	onClickByAdmin: (values: any, type: any, id: any) => void;
}
export interface productUomValuesType {
	type: string;
	id: string;
}
export interface ProductUomProps {
	uomValue: productUomValuesType;
	validation: any;
	onClickByAdmin: (values: productUomValuesType, type: any, id: any) => void;
}

export interface productRateValuesType {
	id: string;
	rate: number;
	colorId: string;
	variantId: string;
	typeId: string;
	dimensionId: string;
}

export interface ProductRateProps {
	rateValue: any;
	handleOnClick: any;
	onClickByAdmin: (values: any, type: string, id: string) => void;
	tableDataSelect: any;
}
export interface NestedMenuItemProps extends Omit<MenuItemProps, "button"> {
	/**
	 * Open state of parent `<Menu />`, used to close decendent menus when the
	 * root menu is closed.
	 */
	parentMenuOpen: boolean;
	/**
	 * Component for the container element.
	 * @default 'div'
	 */
	component?: React.ElementType;
	/**
	 * Effectively becomes the `children` prop passed to the `<MenuItem/>`
	 * element.
	 */
	label?: React.ReactNode;
	/**
	 * @default <ArrowRight />
	 */
	rightIcon?: React.ReactNode;
	/**
	 * Props passed to container element.
	 */
	ContainerProps?: React.HTMLAttributes<HTMLElement> & React.RefAttributes<HTMLElement | null>;
	/**
	 * Props passed to sub `<Menu/>` element
	 */
	MenuProps?: Omit<MenuProps, "children">;
	/**
	 * @see https://material-ui.com/api/list-item/
	 */
	button?: true | undefined;
}
export interface InventoryViewProps {
	invevtoryViewvalue: any;
	tableDataSelect: any;
	id: string;
	validation: any;
	onClickByAdmin: (values: any, type: string, id: string) => void;
}

export interface InventoryProps {
	inventoryvalue: any;
	tableDataSelect: any;
	validation: any;
	onClickByAdmin: (values: inventoryViewValuesType, type: string, id: string) => void;
}

export interface GarbageTypeProps {
	garbageValues: any;
	tableDataSelect: any;
	onClickByAdmin: (values: GarbageValuesType, type: string, id: string) => void;
}

export interface PurchaseOrderType {
	customer_id: any;
	id: string;
	products: Array<object>;
	has_raw_material: string;
}

export interface PurchaseOrderProps {
	perChasevalue: any;
	validation: any;
	onClickByAdmin: any;
	handleNext: any;
	handleBack: any;
}

export interface ProductVariantProps {
	variantvalues: any;
	onClickByAdmin: any;
	tableDataSelect: any;
}

export interface VerifyPoProps {
	verifyValue: any;
	perChasevalue: any;
	validation: any;
	disabled: boolean;
	status: any;
	handleProductApprove: any;
	productObjList: any;
}

interface navListObjectChildren {
	title: string;
	route: string;
}

export interface navListObjectInterface {
	moduleAccess: string;
	title: string;
	icon: React.FC;
	route: string | null;
	children?: Array<navListObjectChildren>;
}
