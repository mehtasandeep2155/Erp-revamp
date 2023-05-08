import { css } from "@emotion/css";
import { Mobile, Tablets, LaptopSmallSize, DesktopLargeSize } from "@css/responsive";
import { flexWrap } from "@css/styles";
import { darkBlue, darkCharcoal, darkGrey, forgotPasswordLink, grey, primary } from "@css/color-palette";

export const body = css`
	width: 100%;
	height: 100vh;
	${flexWrap};
	${Mobile} {
		padding: 20px 60px 492px 51px;
	}
	${Tablets} {
		padding: 50px 60px 340px 71px;
	}
	${LaptopSmallSize} {
	}
	${DesktopLargeSize} {
	}
`;

export const loginbLoader = css`
	position: relative;
	left: 200px;
`;
export const btnDiv = css`
	display: flex;
	justify-content: center;
	width: 98%;
`;
export const forgett = css`
	text-align: right;
	color: ${forgotPasswordLink};
	position: relative;
	bottom: 0px;
	cursor: pointer;
`;

export const flex = css`
	display: flex;
`;

export const container = css`
	background-color: white;
	color: rgba(0, 0, 0, 0.87);
	-webkit-transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
	-webkit-transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
	transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
	border-radius: 0.5rem;
	box-shadow: 4px 4px 50px rgba(217, 217, 217, 0.26);
	width: 42%;
	z-index: 10;
	${Mobile} {
		margin-left: 0px;
		width: 100%;
		padding: 10px;
		margin-top: 60px;
	}
	${Tablets} {
		margin-left: 0px;
		width: 100%;
		padding: 10px;
	}
	${LaptopSmallSize} {
	}
	${DesktopLargeSize} {
	}
`;

export const signUpContainer = css`
	${container};
	margin-top: -20px;
`;

export const authBgImg = css`
	position: absolute;
	z-index: 1;
	margin: 0 4% 0 auto;
`;

export const loginRightDiv = css`
	display: flex;
	flex-direction: column;
	width: 80%;
	${Mobile} {
		width: 100%;
		padding: 50px;
	}
	${Tablets} {
		width: 100%;
		padding: 40px;
	}
`;

export const textRegister = css`
	color: ${primary};
	margin-left: 5px;
	cursor: pointer;
`;

export const checkDiv = css`
	display: flex;
	justify-content: end;
	margin-bottom: -25px;
`;

export const check = css`
	color: green !important;
	padding-bottom: -30px;
	position: relative;
	bottom: 27px;
	right: 10px;
	font-size: 20px;
`;

export const showPass = css`
	margin-left: 20px;
`;

export const showPassErr = css`
	fill: ${darkGrey} !important;
	cursor: pointer;
	position: absolute;
	float: right;
	top: 10px;
	right: 15px !important;
	font-size: 22px !important;
`;

export const bottomDiv = css`
	${flexWrap}
	font-size:16px;
	padding-bottom: 20px;
	margin-bottom: 30px;
`;

export const authLogo = css`
	text-align: center;
	margin: 36px 0 83px 0;
	font-weight: 500;
	font-size: 16px;
	line-height: 19.36px;
	letter-spacing: 4px;
`;

export const signUpLogo = css`
	${authLogo};
	margin-bottom: 40px !important;
`;

export const authTitle = css`
	text-align: center;
	margin: 0 0 22px 0;
	font-weight: 700;
	font-size: 24px;
	line-height: 29.05px;
`;

export const authSubtitle = css`
	text-align: center;
	color: ${darkCharcoal}
	width: 70%; 
	margin: 0 auto 30px auto;
	font-weight: 400;
	font-size: 18px;
	line-height: 21.78px;
`;

export const signUpSubtitle = css`
	${authSubtitle};
	margin-bottom: 15px;
`;

export const authButton = {
	width: "100%",
	backgroundColor: darkBlue,
	marginTop: "10px",
	color: "white",
	borderRadius: "6px",
	fontWeight: 600,
	height: "45px",
	"&:hover": {
		backgroundColor: primary
	}
};

export const authFooter = css`
	position: absolute;
	bottom: 10px;
	margin-left: auto;
	margin-right: auto;
	color: ${grey};
	font-size: 13px;
`;

export const signUpFormik = css`
	display: flex;
	flex-direction: column;
	gap: 8px;
`;
