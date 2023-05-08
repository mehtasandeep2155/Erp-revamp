import { css } from "@emotion/css";
import { Mobile, Tablets, LaptopSmallSize, DesktopLargeSize } from "@css/responsive";

export const body = css`
	margin: 0;
	width: 100%;
	padding-top: 50px;
	padding-bottom: 110px;
	over-flow: hidden;
	display: flex;
	justify-content: center;
	${Mobile} {
		padding: 20px 60px 492px 51px;
	}
	${Tablets} {
		padding: 50px 60px 340px 71px;
	}

	${LaptopSmallSize} {
		padding: 50px 60px 150px 58px;
	}

	${DesktopLargeSize} {
		padding: 60px 60px 40px 180px;
	}
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
	box-shadow: 0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%);
	margin-top: 11px;
	width: 70%;
	padding: 5px;
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
		width: 100%;
	}
	${DesktopLargeSize} {
		margin-left: 0px;
		width: 100%;
		padding: 10px;
	}
`;

export const signIcon = css`
	display: flex;
	width: 300px;
`;

export const loginRightDiv = css`
	padding: 60px;
	margin-bottom: 30px;
	height: 371px;
	width: 35%;
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
	color: red;
	margin-left: 10px;
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
	bottom: 32px;
	right: 10px;
	font-size: 20px;
`;

export const bottomDiv = css`
	display: flex;
	,width: 400px;
`;
