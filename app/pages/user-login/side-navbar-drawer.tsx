import * as React from "react";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import { arrowIconWrapper } from "../../css/styles";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import SideNavBarRevamp from "../../component/navbar/side-navbar";
import { drawerArrowIcon } from "../../css/mui-styles";
import { IconButton } from "@mui/material";

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
	width: drawerWidth,
	transition: theme.transitions.create("width", {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.enteringScreen
	}),
	overflowX: "hidden"
});

const closedMixin = (theme: Theme): CSSObject => ({
	transition: theme.transitions.create("width", {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen
	}),
	overflowX: "hidden",
	width: `calc(${theme.spacing(7)} + 1px)`,
	[theme.breakpoints.up("sm")]: {
		width: `calc(${theme.spacing(8)} + 1px)`
	}
});

interface AppBarProps extends MuiAppBarProps {
	open?: boolean;
}

const Drawer = styled(MuiDrawer, {
	shouldForwardProp: (prop) => prop !== "open"
})(({ theme, open }) => ({
	width: drawerWidth,
	flexShrink: 0,
	whiteSpace: "nowrap",
	boxSizing: "border-box",
	...(open && {
		...openedMixin(theme),
		"& .MuiDrawer-paper": openedMixin(theme)
	}),
	...(!open && {
		...closedMixin(theme),
		"& .MuiDrawer-paper": closedMixin(theme)
	})
}));

export default function SideNavBarDrawer() {
	const theme = useTheme();
	const [open, setOpen] = React.useState(false);

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
