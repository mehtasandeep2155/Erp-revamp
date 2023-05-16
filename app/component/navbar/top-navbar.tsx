import { useEffect, useState } from "react";
import TopProfileBox from "@component/commoncomponent/top-profile-box";
import CustomizeNotifications from "@component/commoncomponent/notifications";
import SideNavBar from "./sidenav-bar";
import SwipeableTemporaryDrawer from "@common/drawer/drawer-model";
import { Badge } from "@mui/material";
import { Brightness4, Brightness7, Menu, NotificationsActive, Search } from "@mui/icons-material";
import {
	topNavItems,
	cursorHover,
	profileImg,
	topNavItemsDiv,
	notify,
	formControlSearch,
	searchIcon,
	MobileMenu,
	flexWrap,
	formControlSearchContainer,
	topNavbar
} from "@css/styles";
import { alertStyle, modeStyle } from "@css/mui-styles";
import { IconButtons } from "@common/buttons";

export default function TopNavbar({ handleToggle, toggleMode, handleOpen, isOpen2, handleNotifications, isOpen }: any) {
	const [details, setDetails] = useState<any>({});
	const [isOpen3, setIsOpen3] = useState(false);

	useEffect(() => {
		let localData = JSON.parse(localStorage.getItem("userdata"));
		if (localData) {
			setDetails(localData.user);
		}
	}, []);

	const handleDrawer = (item: any, values: any) => {
		setIsOpen3(item);
	};

	return (
		<>
			<div className={topNavbar} id="nav">
				<div className={topNavItemsDiv}>
					<div className={topNavItems}>
						<Menu className={`${MobileMenu}`} onClick={() => handleDrawer(!isOpen3, "open")} />
						{/* <div className={formControlSearchContainer}>
							<Search className={searchIcon} sx={{ fontSize: "13px" }} />
							<input className={formControlSearch} placeholder="Search" />
						</div> */}
						<div className={flexWrap}>
							<IconButtons
								icon={
									<>
										<Badge
											badgeContent={2}
											className={notify}
											onClick={handleNotifications}
										></Badge>
										<NotificationsActive />
									</>
								}
								styles={alertStyle}
								clickEvent={() => {}}
							/>
							<IconButtons
								clickEvent={handleToggle}
								styles={modeStyle}
								icon={toggleMode === "dark" ? <Brightness7 /> : <Brightness4 />}
							/>
							<div className={flexWrap}>
								<span>{details?.role}</span>
								<div className={profileImg} onClick={handleOpen}>
									{details?.role?.slice(0, 1).toUpperCase()}
								</div>
							</div>
							{isOpen && (
								<div className={cursorHover}>
									<TopProfileBox
										details={details}
										isOpen={isOpen}
										handleDrawer={handleOpen}
										handleToggle={handleToggle}
									/>
									<CustomizeNotifications isOpen={isOpen2} />
								</div>
							)}
						</div>
					</div>
				</div>
				<SwipeableTemporaryDrawer
					isOpen={isOpen3}
					anchor="left"
					handleClose={handleDrawer}
					content={<SideNavBar handleClose={handleDrawer} />}
				/>
			</div>
		</>
	);
}
