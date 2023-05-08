import { flexWrap } from "@css/styles";
import {
	authBgImg,
	authFooter,
	authLogo,
	authSubtitle,
	authTitle,
	body,
	container,
	loginRightDiv,
	signUpContainer,
	signUpLogo,
	signUpSubtitle
} from "../login/styles";
import { authBg } from "@component/utils/images";

export function Layout({ children, title, subTitle }: any) {
	const ifSignup = title === "Sign Up Your Account";
	return (
		<div className={body}>
			<img className={authBgImg} src={authBg} />
			<div className={ifSignup ? signUpContainer : container}>
				<div className={flexWrap}>
					<div className={loginRightDiv}>
						<h3 className={ifSignup ? signUpLogo : authLogo}>ALLUMSMITH</h3>
						<h2 className={authTitle}>{title}</h2>
						<span className={ifSignup ? signUpSubtitle : authSubtitle}>{subTitle}</span>
						{children}
					</div>
				</div>
			</div>
			<span className={authFooter}>Copyright © All rights reserved Allumsmith</span>
		</div>
	);
}
export default Layout;
