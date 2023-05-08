import {
	flexUser,
	innerNestedMenuSelected,
	linkStyle,
	logOut,
	margin10,
	navIcon,
	nestedMenu,
	nestedMenuItem,
	nestedMenuSelected,
	sideNavItemIcon,
	sidemenuItem,
	sidemenuItemContainer
} from "@css/styles";
import { Circle } from "@mui/icons-material";
import { useState } from "react";
import { MenuItem } from "@mui/material";
import { useRouter } from "next/router";
import NestedMenuItem from "./nested-menu-item";
import Link from "next/link";
import { isMenuItemSelected } from "@component/utils/helper";
import { circleStyle } from "@css/mui-styles";

const CircleIcon = () => {
	return <Circle style={circleStyle} />;
};

const SideNavMenu = ({ data, sideMenu, handleClose, className }: any) => {
	const { icon: Icon, children } = data;
	const { push, pathname } = useRouter();

	const [menuPosition, setMenuPosition] = useState<any>(null);

	const handleRightClick = (event: React.MouseEvent) => {
		if (menuPosition) {
			return;
		}
		event.preventDefault();
		setMenuPosition({
			top: event.pageY,
			left: event.pageX
		});
	};

	const handleItemClick = (event: React.MouseEvent) => {
		setMenuPosition(null);
	};

	return (
		<div className={margin10}>
			<NestedMenuItem
				parentMenuOpen={!!menuPosition}
				onMouseEnter={handleRightClick}
				className={isMenuItemSelected(pathname, data.title) ? nestedMenuSelected : nestedMenu}
				rightIcon={
					<div className={sideNavItemIcon}>
						<li className={logOut}>
							<div className={flexUser}>
								<Icon className={navIcon} />
							</div>
						</li>
					</div>
				}
			>
				<div>
					{children &&
						children?.map((item: any) => (
							<div className={sidemenuItemContainer}>
								<Link href={item.route} className={linkStyle}>
									<MenuItem
										onClick={handleItemClick}
										className={pathname === item.route ? nestedMenuItem : sidemenuItem}
									>
										<CircleIcon />
										{item.title}
									</MenuItem>
								</Link>
							</div>
						))}
				</div>
			</NestedMenuItem>
		</div>
	);
};

export default SideNavMenu;
