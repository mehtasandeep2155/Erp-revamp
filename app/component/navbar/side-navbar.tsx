import { useEffect, useState } from "react";
import { filterSideMenu } from "./navlist";
import SideNavItem from "./side-nav-item";
import SideNavNestedItem from "./side-nav-nested-item";
import { navbar, navbarUl, navbarExpand, userName, userNameHidden } from "@css/styles";
import { adminModules, superAdminModules } from "@component/utils/form/constant";
export default function SideNavBarRevamp(props: any) {
	const { sideMenu, handleClose } = props;
	const [moduleAccess, setModulesAccess] = useState([]);
	const [userRole, setUserRole] = useState("");

	useEffect(() => {
		let localData = JSON.parse(localStorage.getItem("userdata"));
		let moduleArr: any = [];
		if (localData) {
			setUserRole(localData.user.role);
			if (localData.user.role === "Admin") {
				moduleArr = moduleArr.concat(adminModules);
			} else if (localData.user.role === "SuperAdmin") {
				moduleArr = moduleArr.concat(superAdminModules);
			} else {
				localData.user.modules.map((item: any) => {
					moduleArr.push(item.name);
				});
			}
			setModulesAccess(moduleArr);
		}
	}, []);

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
