import { activeLink, itemSpanMobile, itemSpan, linkStyle, navItem } from "@css/styles";
import Link from "next/link";
import { useRouter } from "next/router";

export const ProductTabs = ({
	sideMenu,
	path,
	text,
	children,
	handleClose
}: {
	sideMenu: boolean;
	path: string;
	text: string;
	handleClose: any;
	children: any;
}) => {
	const { pathname } = useRouter();
	return (
		<li>
			<Link href={path} className={linkStyle}>
				<div className={pathname === path ? activeLink : navItem}>
					<>
						{children}
						<span className={!sideMenu ? itemSpan : itemSpanMobile}>{text}</span>
					</>
				</div>
			</Link>
		</li>
	);
};
