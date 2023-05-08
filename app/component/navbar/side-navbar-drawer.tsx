import * as React from "react";
import { arrowIconWrapper } from "../../css/styles";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import SideNavBarRevamp from "./side-navbar";
import { drawerArrowIcon } from "../../css/mui-styles";
import { IconButton } from "@mui/material";
import { Drawer } from "@component/utils/drawer-utils";

export default function SideNavBarDrawer() {
	const [open, setOpen] = React.useState(true);

	const handleDrawerOpen = () => {
		setOpen(true);
	};

	const handleDrawerClose = () => {
		setOpen(false);
	};

	return (
		<div style={{ display: "flex" }}>
			<Drawer variant="permanent" open={open}>
				<SideNavBarRevamp handleClose={null} sideMenu={!open} />
				<div className={arrowIconWrapper}>
					{open ? (
						<IconButton onClick={handleDrawerClose} sx={drawerArrowIcon}>
							<ArrowBackIos sx={{ fontSize: "14px" }} />
						</IconButton>
					) : (
						<IconButton onClick={handleDrawerOpen} sx={drawerArrowIcon}>
							<ArrowForwardIos sx={{ fontSize: "14px" }} />
						</IconButton>
					)}
				</div>
			</Drawer>
		</div>
	);
}
