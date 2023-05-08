import { makeStyles } from "@mui/styles";
import { primary, secondary, fadeGrey, drawerArrowBackground } from "./color-palette";

export const notifyIcon = { border: `1px solid ${fadeGrey}`, borderRadius: "4px" };
export const toggle = {
	border: `1px solid ${fadeGrey}`,
	borderRadius: "4px",
	marginLeft: "8px",
	marginRight: "35px"
};
export const cloudStyle = {
	border: `1px solid ${fadeGrey}`,
	borderRadius: "4px",
	height: "42px",
	fontsize: "17px !important",
	paddingLeft: "10px",
	paddingRight: "10px",
	color: `${primary} !important`,
	justifyContent: "space-between !important",
	width: "105px"
};

export const columnStyle = {
	border: `1px solid ${fadeGrey}`,
	borderRadius: "4px",
	height: "42px",
	fontsize: "17px !important",
	paddingLeft: "10px",
	paddingRight: "10px",
	color: `${primary} !important`,
	justifyContent: "space-between !important",
	width: "115px"
};

export const printStyle = {
	border: `1px solid ${fadeGrey}`,
	borderRadius: "4px",
	paddingLeft: "10px",
	paddingRight: "10px",
	justifyContent: "space-between !important",
	width: "75px",
	color: `${primary} !important`,
	height: "42px",
	fontsize: "17px !important"
};

export const filterStyle = {
	border: "none",
	paddingLeft: "10px",
	paddingRight: "10px",
	justifyContent: "space-between !important",
	width: "75px",
	borderRadius: "4px",
	color: "white !important",
	backgroundColor: secondary,
	height: "42px",
	fontsize: "17px !important"
};

export const doneBtnStyles = {
	border: "none",
	paddingLeft: "10px",
	paddingRight: "10px",
	display: "flex",
	justifyContent: "center !important",
	width: "95%",
	marginLeft: "5px",
	borderRadius: "4px",
	color: "white !important",
	backgroundColor: secondary,
	height: "42px",
	fontsize: "17px !important"
};

export const titleStyle = {
	border: "none",
	paddingLeft: "10px",
	paddingRight: "10px",
	justifyContent: "center !important",
	minWidth: "116px !important",
	borderRadius: "4px",
	color: "white !important",
	display: "flex",
	backgroundColor: "black",
	height: "42px",
	fontsize: "17px !important"
};
export const submitButton = {
	border: "none",
	padding: "10px",
	justifyContent: "center !important",
	width: "91px",
	borderRadius: "4px",
	color: "white !important",
	backgroundColor: secondary,
	fontsize: "14px !important"
};

export const cancleButton = {
	border: "none",
	padding: "10px",
	justifyContent: "center !important",
	width: "91px",
	borderRadius: "4px",
	color: "black !important",
	backgroundColor: "white",
	fontsize: "14px !important"
};

export const drawerArrowIcon = {
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
	width: "39px",
	height: "39px",
	backgroundColor: drawerArrowBackground,
	borderRadius: "100%",
	"&:hover": {
		background: drawerArrowBackground
	}
};

const TRANSPARENT = "rgba(0,0,0,0)";
export const useMenuItemStyles: any = makeStyles((theme: any) => ({
	root: (props: any) => ({
		backgroundColor: props.open ? theme?.palette?.action?.hover : TRANSPARENT
	})
}));

export const circleStyle = {
	fill: fadeGrey,
	fontSize: "5px",
	margin: "0 30px 0 30px"
};

export const alertStyle = {
	fill: primary,
	border: `1px solid ${fadeGrey}`,
	borderRadius: "4px",
	"& svg": {
		fontSize: "18px !important",
		color: "black"
	}
};

export const modeStyle = {
	fill: primary,
	border: `1px solid ${fadeGrey}`,
	borderRadius: "4px",
	margin: "0 25px 0 10px",
	"& svg": {
		fontSize: "18px !important",
		color: "black"
	}
};

export const accordionArrowIcon = {
	fontSize: "0.9rem",
	color: "white"
};
