import { css } from "@emotion/css";
import { Mobile, Tablets, LaptopSmallSize, DesktopLargeSize } from "./responsive";
import { lightMode } from "./css-var";
import {
	chipColor,
	darkBlue,
	deliveryPointColor,
	fadeGrey,
	gpBadColor,
	gpGoodColor,
	layoutBackground,
	mediumGrey,
	originPointColor,
	pdfBorder,
	primary,
	productCardBorder,
	requireColor,
	secondary,
	white
} from "./color-palette";

export const flex = css`
	display: flex;
`;

export const flexCol = css`
	${flex};
	flex-direction: column;
`;

export const block = css`
	display: block;
`;

export const margin10 = css`
	margin-top: 10px;
`;

export const newDiv = css`
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	padding: 7px;
	gap: 10px;
	font-size: 12px;
	width: 33px;
	height: 23px;
	position: relative;
	left: 7px;
	bottom: 4px;
	background: ${chipColor};
	border-radius: 21px;
`;

export const originDiv = css`
	${newDiv}
	width: 44px;
	height: 15px;
	background: ${originPointColor};
`;
export const deliveryDiv = css`
	${originDiv}
	background: ${deliveryPointColor};
`;

export const flexUser = css`
	align-items: center;
	${flex}
`;

export const productHedaing = css`
	line-height: 0px;
	width: 150px;
`;

export const flexWrap = css`
	${flexUser}
	justify-content: center;
`;
export const navSummary = css`
	${flexWrap}
	color:white;s
`;
export const flexToolbar = css`
	display: flex;
	align-items: center;
	justify-content: space-between;
	float: right;
	min-width: 651px;
`;
export const checkDiv = css`
	display: flex;
	justify-content: end;
	margin-bottom: -25px;
`;
export const flexEnd = css`
	display: flex;
	justify-content: end;
	width: 100%;
`;
export const checkSearchDiv = css`
	position: absolute;
	svg {
		color: ${fadeGrey} !important;
	}
	right: 2px;
	top: 6px;
`;
export const flexTitleToolbar = css`
	${flexToolbar}
	min-width: 780px;
`;

export const layoutBackgroundColor = css`
	background: ${layoutBackground};
`;

export const authWrapper = css`
	padding: 10px 60px 30px 30px;
	${Mobile} {
		padding: 20px 25px 0 25px;
	}
	${Tablets} {
		padding: 20px 50px 0 50px;
	}
`;

export const themeIcon = css`
	position: relative;
	top: 10px;
	left: 15px;
	cursor: pointer;
	svg {
		position: relative;
		font-size: 25px;
		top: 7px;
	}
	${Mobile} {
		span {
			display: none;
		}
	}
`;

export const appLayout = css`
	${flex};
	flex-direction: column;
	margin-left: auto;
	width: 100%;
	justify-content: space-between;
	height: 100vh;
	${Mobile} {
		width: 100% !important;
	}
	${Tablets} {
		width: 100% !important;
	}
`;

export const productCardDiv = css`
	padding: 10px;
	margin-left: 10px;
	font-size: 13px;
	background: ${lightMode.tableColor};
	height: 198px;
	max-width: 218px;
	min-width: 175px;
	border-radius: 11px;
	${margin10}
	margin-bottom: 10px;
`;

export const productCardRate = css`
	cursor: pointer;
	height: auto;
	min-width: 178px;
	overflow: scroll;
`;

export const varianthead = css`
	margin-left: 10px;
`;

export const productText = css`
	font-size: 14px;
`;

export const loadingDiv = css`
	height: 300px;
	width: 100%;
`;

export const loginLeftDiv = css`
	${Mobile} {
		display: none;
	}
	${block}
	border-right: 1px solid;
	width: 45%;
	${Tablets} {
		display: none;
	}
`;

export const leftDivImg = css`
	height: 430px;
	width: 430px;
	${LaptopSmallSize} {
		height: 344px;
		width: 344px;
	}
	,
	${DesktopLargeSize} {
		height: 300px;
		width: 300px;
	}
`;

export const left = css`
	${DesktopLargeSize} {
		padding: 20px;
	}
	${LaptopSmallSize} {
		padding: 20px;
	}
`;

export const formControl = css`
	${block};
	width: 241px;
	padding: 0.375rem 0.75rem;
	font-size: 13px;
	font-weight: 400;
	line-height: 1.5;
	background-clip: padding-box;
	border-radius: 4px;
	box-shadow: none;
	transition: none;
	height: 32px;
	border: 1px solid ${fadeGrey};
	outline: none;
	:focus {
		box-shadow: none !important;
		outline-width: 0;
		border: 1px solid ${lightMode.navBorder};
	}
	::placeholder {
		opacity: 1;
		font-weight: 300;
	}
	${Mobile} {
		::placeholder {
			font-size: 12px !important;
		}
	}
`;

export const formControlAuth = css`
	${formControl};
	width: 100%;
`;

export const formControlInvoice = css`
	${formControl};
	width: 281px;
`;

export const formControlMove = css`
	${formControl};
	width: 100%;
`;

export const formControlProductInfo = css`
	${formControl};
	width: 195px;
	margin-top: 1px;
	height: 39px;
	padding: 0 0.75rem;
`;

export const inputError = css`
	${formControlAuth};
	${formControl};
	width: 281px;
	border: 1px solid red;
`;
export const formColorControl = css`
	${formControl}
	width: 378px;
`;
export const inputErrorColor = css`
	${formColorControl};
	border: 1px solid red;
`;
export const inputErrorProduct = css`
	${formControl};
	border: 1px solid red;
`;

export const formSearch = css`
	${formControl}
	width: 178px;
	margin-left: 10px;
`;

export const formControlSearch = css`
	${formControl};
	${Mobile} {
		width: 40% !important;
	}
	${Tablets} {
		width: 30% !important;
	}
	width: 80% !important;
	padding-left: 30px;
	margin-right: 40px;
	${Mobile} {
		width: 30% !important;
	}
	${Tablets} {
		width: 70% !important;
	}
`;

export const formControlSearchContainer = css`
	position: relative;
	margin: auto 0;
	width: 40%;
`;

export const formControlProduct = css`
	${block}
	width: 241px;
	padding: 0.375rem 0.75rem;
	font-size: 13px;
	font-weight: 400;
	line-height: 1.5;
	background-clip: padding-box;
	border-radius: 6px;
	box-shadow: none;
	transition: none;
	border: 1px solid ${lightMode.navBorder};
	height: 25px;
	:focus {
		box-shadow: none !important;
		outline-width: 0;
		border: 1px solid ${lightMode.navBorder};
	}
	::placeholder {
		opacity: 1;
		font-weight: 300;
	}
	${Mobile} {
		::placeholder {
			font-size: 12px !important;
		}
	}
`;
export const requireStyle = css`
	font-size: 20px;
	color: ${requireColor} !important;
	position: relative;
	top: 7px;
	left: 3px;
`;

export const searchIcon = css`
	position: absolute;
	left: 10px;
	top: 14px;
`;

export const itemSpanMobile = css`
	position: relative;
	bottom: 5px;
	display: none;
	${Mobile} {
		display: initial;
		left: 5px;
	}
	${Tablets} {
		display: initial;
		left: 5px;
	}
	${LaptopSmallSize} {
		font-size: 12px;
	}
`;

export const menuItemsMoblie = css`
	${flex}
`;

export const itemSpan = css`
	position: relative;
	display: initial;
	${Mobile} {
		left: 5px;
	}
	${Tablets} {
		left: 5px;
	}
	${LaptopSmallSize} {
		font-size: 12px;
	}
`;

export const labelStyles = css`
	font-size: 13px;
	margin-bottom: 5px;
	${Mobile} {
		font-size: 12px;
	}
`;
export const labelStylesMarginTop = css`
	${labelStyles};
	margin-top: 7px;
`;

export const formGroup = css`
	${margin10}
	display:flex;
	position: relative;
`;

export const formGroupCol = css`
	${flexCol};
	position: relative;
`;

export const formGroupWithLabel = css`
	width: 93%;
`;

export const formGroupProduct = css`
	position: relative;
	margin-top: 20px;
`;
export const formGroupMultiSelect = css`
	${formGroupProduct}
	width:50%;
`;
export const loginBtn = css`
	cursor: pointer;
	border-radius: 5px;
	padding: 8px;
	color: ${lightMode.tableColor};
	${margin10}
	border: none;
	min-width: 100px;
	background: ${lightMode.themeColor};
`;

export const submitBtn = css`
	${loginBtn}
	font-size:12px;
	float: right;
`;

export const textRegister = css`
	color: red;
	margin-left: 10px;
	cursor: pointer;
`;

export const logo = css`
	text-align: center;
	position: relative;
	top: 40px;
	color: ${lightMode.themeColor} !important;
`;

export const icon = css`
	font-size: 19px;
`;

export const errText = css`
	color: ${requireColor};
	font-size: 12px;
	display: flex;
	padding-top: 2px;
`;

export const continueBut = css`
	cursor: pointer;
	border-radius: 5px;
	padding: 10px;
	color: ${lightMode.tableColor};
	${margin10}
	min-width: 100px;
	margin-left: 10px;
	border: none;
	background: ${lightMode.themeColor};
`;

export const bold = css`
	font-size: 10px;
	position: relative;
	left: 15px;
`;

export const editBut = css`
	font-size: 13px;
	// cursor: pointer;
	background: rgba(0, 0, 0, 0.075);
	padding: 4px;
	border-radius: 5px;
	border: 1px solid ${lightMode.navBorder};
	${flexUser}
	width: 60px;
	margin-left: 5px;
	justify-content: space-between;
`;
export const backButton = css`
	text-align: left;
	cursor: pointer;
`;
export const deleteBut = css`
	color: black !important;
	font-size: 18px;
	cursor: pointer;
	margin-left: 10px;
`;
export const editInvoiceBut = css`
	${editBut}
	cursor:pointer;
	width: 20px;
	margin-left: 1px;
	content: "Add";
`;
export const editFinishBut = css`
	${editBut}
	cursor:auto;
`;
export const detailsViewBut = css`
	${editBut}
	z-index:99999;
	width: 68px;
	background: #edc5c5;
	font-size: 11px;
	color: black !important;
	padding: 4px;
	span {
		color: #9d0000;
		margin-left: 5px;
	}
	${flexWrap}
	border-radius: 20px;
	border-color: #edc5c5 !important;
`;

export const customerViewBut = css`
	background: #2196f326 !important;
	padding: 7px 20px;
	border-radius: 20px;
`;

export const detailsPointViewBut = css`
	${detailsViewBut}
	background:  rgba(33, 150, 243, 0.15);
	border-color: rgba(33, 150, 243, 0.15) !important;
`;
export const detailsStatusBut = css`
	${detailsViewBut}
	width: auto;
	min-width: 90px !important;
	cursor: auto;
	border-radius: 4px;
	background: rgba(33, 150, 243, 0.15);
	border-color: rgba(33, 150, 243, 0.15) !important;
`;

export const editIcon = css`
	font-size: 18px;
	margin-left: 4px;
	cursor: pointer;
	color: black !important;
`;

export const wrapper = css`
	width: 100%;
	height: 100%;
	background: lightblue;
	padding: 20px;
	${flexWrap}
`;

export const detailsBut = css`
	font-size: 10px;
	cursor: pointer;
	color: ${lightMode.tableColor};
	background: ${lightMode.themeColor} !important;
	padding: 4px;
	border-radius: 5px;
`;

export const header = css`
	${flex}
	justify-content: space-between;
	width: 100%;
	margin: 20px 0 10px 0;
`;

export const verifyForm = css`
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	padding: 10px;
	background: white;
	gap: 30px;
	margin-top: 20px;
`;

export const moveForm = css`
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	padding: 10px;
	gap: 30px;
	margin: 60px 40px 0 40px;
`;

export const detailsPageView = css`
	${verifyForm}
	padding:10px;
	height: 100vh;
	width: 100%;
	overflow: scroll;
	margin-bottom: 30px;
	margin-top: 40px;
`;

export const pageView = css`
	${verifyForm}
	padding:10px;
	height: 100vh;
	overflow: scroll;
	margin-bottom: 30px;
	margin-top: 40px;
`;

export const invoicePageView = css`
	${detailsPageView};
	height: max-content;
	padding-bottom: 20px;
	margin-bottom: -20px;
	gap: 10px;
`;

export const tablePoActionMoveForm = css`
	display: flex;
	flex-direction: column;
	gap: 10px;
`;
export const verifyModelForm = css``;

export const headerAdd = css`
	border-bottom: 0.5px solid ${fadeGrey};
	h4 {
		margin-left: 10px;
		font-size: 16px;
	}
`;
export const tableView = css`
	margin-bottom: -20px;
`;
export const logOutBtn = css`
	margin-left: 4px;
	margin-right: 4px;
	width: 164px;
	margin-top: 5px;
	text-align: start;
	padding: 8px;
	margin-bottom: 4px;
	:hover {
		background: rgba(0, 0, 0, 0.075);
		border-radius: 4px;
	}
`;

export const profileBtn = css`
	${logOutBtn}
	margin-bottom: 0px;
	border: none !important;
	justify-content: space-between;
	${flex}
	gap: 10;
	padding: 5px;
	width: 149px;
	:hover {
		background: none;
		border-radius: 4px;
	}
`;

export const flexBox = css`
	display: -webkit-box;
`;

export const close = css`
	font-size: 20px;
	right: 2px;
	position: relative;
	bottom: 1px;
	cursor: pointer;
`;

export const stockDiv = css`
	${flex}
	width: 530px;
	justify-content: space-between;
`;

export const profileDiv = css`
	${flex}
`;

export const closeProduct = css`
	font-size: 20px;
	right: 27px;
	position: relative;
	top: 5px;
	cursor: pointer;
	color: ${lightMode.textColor};
`;

export const btnDiv = css`
	${flex}
	float: right;
	width: 192px;
	margin-right: 30px;
	justify-content: space-between;
`;

export const dialogBtnDiv = css`
	${btnDiv}
	width: 70px;
	margin-top: 10px;
`;
export const formDiv = css`
	padding: 0px 10px 10px 10px;
	height: 345px;
	width: 55%;
`;
export const formDivProduct = css`
	${formDiv}
	width:77%;
`;
export const btnDivApprove = css`
	${flex}
	justify-content: center;
	margin-top: 30px;
`;

export const navIcon = css`
	position: relative;
	top: 2px;
	right: 5px;
	${Mobile} {
		right: -1px;
	}
	${Tablets} {
		right: -1px;
	}
	${LaptopSmallSize} {
		right: 1px;
	}
`;

export const navIconMenu = css`
	padding: 7px;
	position: relative;
	top: 2px;
	right: 5px;
	margin-top: 10px;
`;

export const btnView = css`
	border: none;
	font-size: 13px;
	border-radius: 8px;
	cursor: pointer;
	border: 1px solid ${lightMode.navBorder};
	margin-top: 20px;
`;

export const btnViewOrder = css`
	border: none;
	font-size: 14px;
	cursor: pointer;
	color: ${lightMode.themeColor};
	border-radius: 11px;
	width: 100px;
	float: right;
	position: relative;
	margin-bottom: -21px;
	${margin10}
`;

export const btnViewMore = css`
	border: none;
	font-size: 14px;
	cursor: pointer;
	color: ${lightMode.themeColor};
	border-radius: 11px;
	width: 100px;
	float: right;
	position: relative;
	margin-bottom: 0px;
	${margin10}
`;

export const signIcon = css`
	${flex}
	width: 300px;
`;

export const textTitle = css`
	position: relative;
	bottom: 5px;
`;

export const addDiv = css`
	padding: 3px;
`;

export const footerStyles = css`
	background: white;
	display: flex;
	justify-content: center;
	align-items: center;
	min-height: 60px;
	font-size: 14px;
	color: gray;
`;

export const footerContainer = css`
	width: 100%;
	height: 50px;
	background: ${lightMode.themeColor} !important;
`;

export const footerSmallDiv = css`
	${flex}
	justify-content: space-between;
	margin-left: 30px;
	margin-right: 30px;
	color: ${lightMode.tableColor};
	width: 90%;
`;

export const pdfDiv = css`
	width: 100%;
	border-top: 1px solid ${pdfBorder};
	border-bottom: 1px solid ${pdfBorder};
`;

export const headDetails = css`
	${flex}
	line-height: 20px;
	width: 98%;
	color: ${lightMode.textColor};
	${margin10}
	background: ${lightMode.tableColor};
	justify-content: space-between;
	padding: 5px;
`;

export const about = css`
	font-size: 11px;

	color: ${lightMode.themeColor};
	padding: 5px;
`;

export const text = css`
	font-size: 12px;
`;

export const textActive = css`
	color: lightblue;
`;

export const pdfTable = css`
	width: 100%;
	${margin10}
	margin-right: 10px;
	color: ${lightMode.themeColor} !important;
`;

export const pdfHead = css`
	font-size: 12px;
	color: ${lightMode.themeColor};
`;
export const note = css`
	font-size: 10px;
	color: ${lightMode.themeColor};
`;

export const pdfRow = css`
	height: 20px;
	border: 1px solid ${lightMode.themeColor};
	text-align: center;
`;

export const pdfRowT = css`
	height: 20px;
	border: 1px solid ${lightMode.themeColor};
`;

export const textSpan = css`
	color: ${lightMode.themeColor};
	font-weight: unset;
	border-bottom: 1px solid dotted;
	border-bottom: dotted;
	margin-left: 5px;
`;

export const heading = css`
	font-size: 13px;
	color: ${lightMode.themeColor};
`;

export const headingTo = css`
	font-size: 13px;
	color: ${lightMode.themeColor};
	padding: 5px;
	margin-top: 5px;
`;

export const bottomDetails = css`
	padding: 5px;
	background: ${lightMode.tableColor};
`;

export const pdfSmDiv = css`
	background: ${lightMode.tableColor} !important;
	border: 1px solid ${lightMode.themeColor};
	width: 100%;
	padding: 4px;
`;

export const downLoad = css`
	color: ${lightMode.themeColor};
	width: 100%;
	${flex}
	margin-bottom: 10px;
	justify-content: end;
`;

export const flexInput = css`
	${flex}
	justify-content:space-between;
	${Mobile} {
		gap: 19px;
	}
	width: 91%;
`;
export const flexCol2input = css`
	${flexInput}
	width:85%;
`;
export const footerPage = css`
	padding-bottom: 40px;
`;
export const flexCol2Autoinput = css`
	${flexInput}
	width:96%;
`;
export const uomDiv = css`
	width: 28px;
	height: 38px;
	right: 1px;
	display: flex;
	justify-content: center;
	align-items: center;
	text-align: center;
	float: right;
	bottom: 38px;
	position: relative;
	background: ${mediumGrey};
	border-radius: 0px 2px 2px 0px;
`;

export const flexInputPurchase = css`
	justify-content: end;
	${flex}
	margin-top: 35px;
	${Mobile} {
		gap: 6px;
	}
`;

export const gpGood = css`
	text-align: center;
	font-size: 12px;
	b {
		color: #0da64a;
	}
	border-radius: 4px;
	width: 84px;
	box-sizing: border-box;
	background: ${gpGoodColor};
`;

export const gpBad = css`
	text-align: center;
	box-sizing: border-box;
	background: ${gpBadColor};
	border-radius: 4px;
	width: 84px;
	font-size: 12px;
	b {
		color: #791d1b;
	}
`;

export const flexIcon = css`
	${flex}
	gap: 10px;
`;
export const flexInovioceIcon = css`
	${flex}
	gap:2px;
`;

export const navbar = css`
	background: ${primary};
	z-index: 99;
	height: 100%;
	overflow: scroll;
	color: rgba(0, 0, 0, 0);
	transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
	padding-top: 10px;
	::-webkit-scrollbar-thumb {
		display: none;
	}
	::-webkit-scrollbar {
		width: 0 !important;
		height: 0 !important;
	}
	${Mobile} {
		width: 70%;
		margin-top: 0px;
		overflow: hidden;
		background: ${primary};
	}
	${Tablets} {
		width: 50%;
		margin-top: 0px;
		overflow: hidden;
		background: ${primary};
	}
`;

export const menuItmeStyle = css`
	text-transform: capitalize;
`;
export const buttonStyle = css`
	box-sizing: border-box;
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	padding: 10px;
	gap: 10px;
	position: absolute;
	width: 32px;
	height: 32px;
	left: 1167px;
	top: 23px;
	background: ${white};
	border: 1px solid ${fadeGrey};
	border-radius: 4px;
`;

export const styleIcon = css`
	width: 16.6px;
	height: 16.67px;
	flex: none;
	order: 0;
	flex-grow: 0;
`;
export const companyChip = css`
	${margin10}
`;

export const navbarExpand = css`
	${LaptopSmallSize} {
		width: 10%;
	}
	${Mobile} {
		width: 55%;
	}
	${Tablets} {
		width: 55%;
	}
`;

export const subCompanyDiv = css`
	height: 20px !important;
	overflow: hidden;
	width: 134px !important;
`;
export const ExpandStyles = css`
	position: absolute;
	right: 397px;
`;
export const subCompanyOpenDiv = css`
	height: 100px !important;
	// overflow: hidden;
`;

export const subCompanyProfileDiv = css`
	margin-top: -7px;
`;

export const subCompanyTitle = css`
	width: 182px;
	margin-top: 2px;
`;

export const navbarUl = css`
	list-style: none;
	padding-left: 0px;
	padding-top: 20px;
	width: 100%;
	${Mobile} {
		list-style: none;
		height: 90%;
	}
	${Tablets} {
		list-style: none;
		height: 90%;
	}
`;

export const navItem = css`
	${flexUser}
	gap: 10px;
	margin-top: 0px;
	cursor: pointer;
	padding: 7px;
	margin-right: 10px;
	margin-left: 30px;
	:hover {
		background: ${darkBlue};
		span {
			color: white !important;
			font-weight: 700;
		}
		svg {
			color: white !important;
		}
	}
`;

export const sideNavItem = css`
	cursor: pointer;
	margin-top: 10px;
	padding: 7px;
	:hover {
		span {
			color: white !important;
		}
		svg {
			color: white !important;
		}
		background: ${darkBlue};
	}
`;

export const sideNavItemIcon = css`
	${sideNavItem};
	margin-top: 0 !important;
`;

export const activeSideNavItem = css`
	${sideNavItem};
	background: ${darkBlue} !important;
	span {
		color: white !important;
		font-weight: 700;
	}
`;

export const sideNavItemSub = css`
	${sideNavItem}
	gap: 10px;
	padding-left: 0;
	margin-top: 0;
	padding-top: 0;
	margin-left: 20px;
	:hover {
		span {
			font-weight: 700;
		}
	}
	${Mobile} {
		margin-left: 0px;
	}
	${Tablets} {
		margin-left: 0px;
	}
`;

export const activeSideNameItem = css`
	cursor: pointer;
	padding: 7px;
	margin-top: 10px;
	background: ${darkBlue};
	span {
		color: white !important;
		font-weight: 700;
	}
	svg {
		color: white !important;
	}
`;

export const logOut = css`
	position: relative;
	left: 16px;
	cursor: pointer;
	${Mobile} {
		left: 6px;
	}
	${Tablets} {
		left: 6px;
	}
	${LaptopSmallSize} {
		left: -5px;
	}
`;

export const profileImg = css`
	font-size: 15px;
	margin-left: 9px;
	border-radius: 50%;
	background: ${layoutBackground} !important;
	height: 35px;
	width: 35px;
	text-align: center;
	${flexWrap}
	cursor: pointer;
`;

export const profileImgDrop = css`
	${profileImg}
	margin-top: -5px !important;
	margin-left: -5px !important;
`;

export const profileImgDetails = css`
	${profileImgDrop}
	height:70px;
	width: 70px;
	font-size: 25px;
`;

export const roleDetails = css`
	font-size: 19px;
	position: relative;
	font-weight: 500;
`;

export const subMenu = css`
	margin-left: 10px;
	margin-top: 5px;
`;

export const erpHeader = css`
	${flex}
	height: 30px;
	padding: 5px;
	text-shadow: 1px 1px 1px black;
	margin-top: 7px;
	width: 152px;
	${Mobile} {
		width: 0px;
	}
	${LaptopSmallSize} {
		width: 161px;
	}
`;

export const settingIcon = css`
	font-size: 35px;
	color: ${lightMode.themeColor} !important;
	text-shadow: 0px !important;
	${Mobile} {
		display: none;
	}
	${Tablets} {
		display: none;
	}
`;

export const menuIcon = css`
	font-size: 14px;
	cursor: pointer;
	${Mobile} {
		margin-top: -22px;
	}
	${Tablets} {
		margin-top: -22px;
	}
`;

export const menuModules = css`
	margin-top: 13px;
	margin-left: 5px;
	font-size: 17px;
	${Mobile} {
		margin-top: -14px;
	}
	${Tablets} {
		margin-top: -22px;
	}
`;

export const userName = css`
	color: white;
	font-size: 16px;
	line-height: 20px;
	letter-spacing: 4px;
	text-align: center;
	margin-top: 25px;
	@font-face {
		font-family: "Faustina";
		font-style: normal;
		font-weight: 700;
		src: local(""), url("/Inter/static/Inter-Black.ttf") format("ttf"),
			url("/Inter/static/Inter-Black.ttf") format("truetype");
	}
	${Mobile} {
		display: none;
	}
	${Tablets} {
		display: none;
	}
`;

export const userNameHidden = css`
	${userName};
	visibility: hidden;
`;

export const tableDiv = css`
	.MuiPaper-rounded {
		box-shadow: 2px 3px 10px 0 hsla(0, 0%, 46.7%, 0.1) !important;
	}
	${Mobile} {
		width: 100%;
		padding: 0;
	}
	${Tablets} {
		width: 100%;
		padding: 0;
	}
	${LaptopSmallSize} {
		width: 100%;
	}
`;

export const tableDivMenu = css`
	width: 100%;
	${Mobile} {
		width: 100%;
		margin-right: 7px;
		margin-left: 7px;
	}
	${Tablets} {
		width: 100%;
		margin-right: 7px;
		margin-left: 7px;
	}
`;

export const topNavbar = css`
	width: 100%;
	height: 76px;
	z-index: 999;
	right: 0;
	box-shadow: 2px 3px 10px 0 hsla(0, 0%, 46.7%, 0.1) !important;
	${flex}
	${Mobile} {
		width: 100%;
	}
	${Tablets} {
		width: 100%;
	}
`;

export const topNavItems = css`
	${flex}
	width: 100%;
	justify-content: space-between;
	margin-right: 60px;
	margin-left: 30px;
	${Mobile} {
		margin: 0 6%;
	}
	${Tablets} {
		margin: 0 6%;
	}
`;

export const topNavItemsDiv = css`
	${flex}
	justify-content: end;
	width: 100%;
`;

export const rightProfileDiv = css`
	margin-left: 10px;
`;

export const MobileMenu = css`
	display: none;
	margin-top: auto;
	margin-bottom: auto;
	${Mobile} {
		${flex}
		font-size: 29px;
		color: ${lightMode.textColor};
	}
	${Tablets} {
		${flex}
		font-size: 29px;
		color: ${lightMode.textColor};
	}
`;

export const alertItems = css`
	min-width: 230px;
`;

export const alertItemsli = css`
	padding: 10px;
	margin-top: 5px;
	border-radius: 5px;
	color: ${lightMode.textColor};
	background: rgba(0, 0, 0, 0.075);
`;

export const notifyDiv = css`
	position: relative;
	right: 53px;
	top: -31px;
`;

export const DesktopMenu = css`
	${Mobile} {
		display: none;
	}
	${Tablets} {
		display: none;
	}
`;

export const flexMenu = css`
	${flex}
	justify-content: space-between;
	margin-top: 25px;
	margin-right: 5px;
`;

export const cursorHover = css`
	cursor: pointer;
`;

export const dropNav = css`
	display: none;
`;

export const dropNavShow = css`
	position: absolute;
	background-color: ${lightMode.tableColor};
	z-index: 1;
	border: 1px solid ${lightMode.navBorder};
	text-align: start;
	border-radius: 5px;
	right: 70px;
	top: 60px;
`;

export const dropNavShowAlert = css`
	${dropNavShow}
	padding: 10px !important;
	right: 20px !important;
	top: 77px !important;
`;

export const notify = css`
	position: absolute;
	top: 0;
	right: 30px;
	font-size: 8px;
	cursor: pointer;
`;
export const customeSearch = css`
	box-sizing: border-box;
	display: flex;
	flex-direction: row;
	align-items: center;
	padding: 15px 10px;
	gap: 10px;
	width: 234px;
	height: 42px;
	border: 1px solid ${secondary};
	border-radius: 5px;
`;
export const errorContainer = css`
	${flex}
	justify-content: center;
`;

export const vrSpan = css`
	height: 26px;
	width: 1px;
	background: ${lightMode.navBorder};
	position: relative;
	top: 18px;
	right: 15px;
`;

export const logSpan = css`
	margin-top: 4px;
	display: initial;
	font-size: 14px;
	margin-left: 10px;
	${Mobile} {
		margin-left: 15px;
	}
	${Tablets} {
		margin-left: 15px;
	}
	${LaptopSmallSize} {
		font-size: 12px;
	}
`;

export const logSpanMobile = css`
	margin-top: 4px;
	display: none;
	${Mobile} {
		display: initial;
		position: relative;
		left: 5px;
	}
	${Tablets} {
		display: initial;
		position: relative;
		left: 5px;
	}
	${LaptopSmallSize} {
		font-size: 12px;
		position: relative;
		left: 5px;
	}
`;

export const accordionDetails = css`
	margin-top: -7px;
	font-size: 0.9rem;
	${Mobile} {
		margin-left: 0px;
	}
	${Tablets} {
		margin-left: 0px;
	}
`;

export const navSection = css`
	border-radius: 4px;
	font-size: 0.9rem;
`;

export const linkStyle = css`
	text-decoration: none;
	color: black;
	font-size: 0.9rem;
`;

export const activeLink = css`
	${navItem}
	font-weight: 700;
	opacity: 1;
`;

export const subMenuCompanySpan = css`
	${margin10}
`;

export const subMenuCompany = css`
	margin-left: 10px;
	margin-top: 5px;
	width: 200px;
	overflow-wrap: break-word;
`;

export const subMenuSpan = css`
	padding: 4px;
	margin-top: 50px;
	border-radius: 5px;
`;

export const tableTitle = css`
	margin-bottom: 10px;
`;

export const closeProductICon = css`
	font-size: 20px;
	right: -24px;
	position: relative;
	bottom: -13px;
	float: right;
	cursor: pointer;
`;

export const tableHeadTr = css`
	${flex}
	justify-content: space-between;
	padding-bottom: 10px;
`;

export const tableTr = css`
	${flexUser}
	justify-content: space-between;
	padding: 6px;
	height: 25px;
	border: 1px solid ${lightMode.navBorder};
	border-bottom: none;
`;

export const smTablediv = css`
	${flex}
	width: 37%;
	justify-content: space-around;
	${Tablets} {
		width: 53%;
	}
	${Mobile} {
		width: 62%;
	}
`;

export const table = css`
	margin-top: 20px;
	width: 100%;
	border-bottom: 1px solid ${lightMode.navBorder};
`;

export const drawerDiv = css`
	padding: 30px;
`;

export const addProductCard = css`
	${flexWrap}
	height: 196px;
	width: 529px;
	margin-bottom: 10px;
	background: ${lightMode.tableColor};
	border-radius: 4px;
	margin-bottom: 16xp;
	margin-left: 10px;
	border: 1px solid ${productCardBorder};
`;

export const addProductCardIcon = css`
	font-size: 35px;
	color: ${lightMode.themeColor};
`;

export const prodcutViewCard = css`
	${productCardRate}
	background: ${lightMode.tableColor} !important;
	min-width: 174px !important;
`;

export const prodcutCard = css`
	${productCardRate}
	min-width: 174px !important;
`;

export const addProductCardDiv = css`
	height: 70px;
	width: 70px;
	border-radius: 50%;
	background: ${lightMode.navBorder};
	cursor: pointer;
	${flexWrap}
`;

export const productCardAddRate = css`
	${productCardRate}
	margin-left: 21px;
	margin-top: 19px;
	${flex}
	justify-content: center;
	align-items: center;
`;

export const productCardRateDetails = css`
	${productCardRate}
	min-width: 166px !important;
	width: 200px;
	${margin10}
`;

export const productListDiv = css`
	min-height: 220px;
	${flex}
	justify-content: space-between;
	width: 582px;
	${margin10}
	margin-left: 10px;
`;

export const variantDetails = css`
	border: 1px solid ${fadeGrey};
	width: 451px;
	font-size: 14px !important;
	border-radius: 4px;
	overflow-x: scroll;
	overflow-y: hidden;
	margin-top: 10px;
`;

export const verifyDetails = css`
	${variantDetails}
	width:98%;
`;
export const detailsPage = css`
	display: flex;
	margin-top: 10px;
	height: 80%;
	width: 100%;
	border-radius: 12px;
	> svg {
		position: relative;
		left: 30px;
	}
`;
export const formControlVerify = css`
	${formControl}
	width:95%;
`;

export const innerContainerPoAddForm = css`
	${flex};
	gap: 18px;
	margin-left: 20px;
`;

export const innerContainerPoAddFormCol = css`
	${flexCol};
	gap: 18px;
	margin-left: 20px;
`;

export const flexWrapPgae = css`
	display: flex;
	flex-direction: column;
	justify-content: center;
	width: 100%;
`;

export const flexWrapPage = css`
	display: flex;
	flex-direction: column;
	justify-content: center;
	width: 100%;
`;

export const countLine = css`
	height: 16px;
	border-right: 2px solid ${lightMode.tableColor};
	padding-right: 5px;
	margin-right: 5px;
`;

export const variantDetailsRate = css`
	${variantDetails}
	margin-top:10px;
	width: 94%;
`;
export const variantDetailsProduct = css`
	${variantDetails}
	width: 96%;
`;
export const productLisSelecttDiv = css`
	${variantDetails}
	width: 100%;
`;

export const productTitle = css`
	font-size: 13px;
	margin-left: 10px;
`;

export const productTitleRadio = css`
	${productTitle};
	margin-left: 0;
	margin-bottom: 3x;
`;

export const flexBoxVariant = css`
	display: flex;
	padding: 0px 0px 3px 9px;
	line-height: 0px;
	align-items: center;
`;
export const flexBoxProduct = css`
	${flexBoxVariant}
	background: rgba(33, 150, 243, 0.27);
`;
export const flexBoxDiv = css`
	${flexBoxVariant}
	background: rgba(33, 150, 243, 0.13);
`;

export const productSmDiv = css`
	${flex}
	margin-bottom: -29px;
`;

export const productRateSmDiv = css`
	${productSmDiv}
`;

export const optionProduct = css`
	margin-left: 10px;
`;

export const drawerControl = css`
	${flexWrap};
	padding-bottom: 40px;
	margin-top: 0px;
`;

export const arrowIconWrapper = css`
	${flexWrap};
	padding: 10px 0;
	background: ${primary};
	svg {
		color: white !important;
		margin-left: 3px;
	}
`;

export const sidemenuItemContainer = css`
	${flexUser};
	list-style: none;
	text-decoration: none;
	height: 40px;
	width: 100%;
	position: relative;
	:hover {
		svg {
			fill: black !important;
			background: none !important;
		}
	}
`;

export const sidemenuItem = css`
	margin: 10px 0 10px 0;
	color: black;
	width: 100%;
	:hover {
		background: none !important;
		font-weight: 700;
	}
`;

export const nestedMenuSelected = css`
	opacity: 1;
	background: ${darkBlue} !important;
	padding: 0;
`;

export const nestedMenu = css`
	margin-top: 0px !important;
	padding: 0;
	:hover {
		background: ${darkBlue} !important;
	}
`;

export const innerMenu = css`
	:hover {
		background: none !important;
	}
`;

export const innerNestedMenuSelected = css`
	margin: 10px 0 10px 0;
	color: black;
	width: 100%;
	font-weight: 700;
	:hover {
		background: none !important;
	}
`;

export const nestedMenuItem = css`
	font-weight: 700;
	svg {
		color: black;
	}
	:hover {
		background: none;
		font-weight: 700;
	}
`;

export const justifyBetween = css`
	display: flex;
	justify-content: space-between;
`;

export const drawerTitle = css`
	font-size: 20px;
	leading: 24px;
	font-weight: 700;
	color: ${primary};
`;

export const addPurchaseOrderForm = css`
	${flexCol},
	> div {
		margin-bottom: 20px;
	}
`;

export const innerContainerPoForm = css`
	${flexCol};
	margin-left: 20px;
`;

export const productInfo = css`
	${flex};
	margin-top: 40px;
	gap: 30px;
`;

export const buttonMarginPoAddForm = css`
	margin: 40px 20px 0 auto;
	${flex};
	gap: 10px;
	float: right;
`;

export const invoiceSubmit = css`
	margin-left: auto;
	display: flex;
	margin-top: 50px;
	gap: 20px;
`;

export const radioContainer = css`
	${flexCol}
	margin-right: 130px;
`;

export const invoiceForm = css`
	${flexCol};
	padding: 20px 40px;
`;

export const invoiceInnerInputContainer = css`
	${flex};
	justify-content: space-between;
`;

export const withoutCost = css`
	${flex};
	gap: 30px;
`;

export const invoiceCheckbox = css`
	margin-top: 30px;
`;

export const purchaseOrderSubmit = css`
	${flexCol};
	background: ${white};
`;
