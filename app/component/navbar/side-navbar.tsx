import { useEffect, useState } from "react";
import { filterSideMenu } from "./navlist";
import SideNavItem from "./side-nav-item";
import SideNavNestedItem from "./side-nav-nested-item";
import { navbar, navbarUl, navbarExpand, userName, userNameHidden } from "@css/styles";
import { userRole } from "./user-role";

export default function SideNavBarRevamp(props: any) {
	const { sideMenu, handleClose } = props;
	const { moduleAccess } = userRole();

	return (
		<>
			<div className={sideMenu ? `${navbar} ${navbarExpand} ` : `${navbar} `}>
				{<h3 className={!sideMenu ? userName : userNameHidden}>ALLUMSMITH</h3>}
				<>
					{
						<div className={navbarUl}>
							{filterSideMenu(moduleAccess).map((item: any) =>
								!item?.children ? (
									<SideNavItem data={item} sideMenu={sideMenu} />
								) : (
									<SideNavNestedItem data={item} sideMenu={sideMenu} handleClose={handleClose} />
								)
							)}
						</div>
					}
				</>
			</div>
		</>
	);
}
