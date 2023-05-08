import {
	activeSideNameItem,
	flexUser,
	linkStyle,
	logOut,
	logSpan,
	logSpanMobile,
	navIcon,
	sideNavItem
} from "@css/styles";
import { useRouter } from "next/router";

const SideNavItem = ({ data, sideMenu }: any) => {
	const { title, route, icon: Icon } = data;
	const { push, pathname } = useRouter();
	return (
		<div className={pathname !== route ? sideNavItem : activeSideNameItem}>
			<li className={logOut}>
				<a onClick={() => push(route, undefined, { shallow: true })} className={linkStyle}>
					<div className={flexUser}>
						<Icon className={navIcon} />
						<span className={!sideMenu ? logSpan : logSpanMobile}>{title}</span>
					</div>
				</a>
			</li>
		</div>
	);
};

export default SideNavItem;
