import { makeStyles } from "@mui/styles";
import {
	primary,
	secondary,
	fadeGrey,
	drawerArrowBackground,
	white,
	darkBlue,
	black,
	disabled,
	deleteTypeBg
} from "./color-palette";

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
	fontSize: "17px !important",
	paddingLeft: "10px",
	paddingRight: "10px",
	color: `${primary} !important`,
	justifyContent: "space-between !important",
	width: "115px"
};
export const style = {
	width: "267px",
	padding: "0px"
};
export const styleAddPurchaseOrder = {
	width: "425px",
	height: "45px"
};

export const styleAddSelectProductInfo = {
	width: "215px",
	height: "45px"
};

export const columnStyle = {
	border: `1px solid ${fadeGrey}`,
	borderRadius: "4px",
	height: "42px",
	fontSize: "17px !important",
	paddingLeft: "10px",
	paddingRight: "10px",
	color: `${primary} !important`,
	justifyContent: "space-between !important",
	width: "125px"
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
	fontSize: "17px !important"
};

export const filterStyle = {
	border: "none",
	paddingLeft: "10px",
	paddingRight: "10px",
	justifyContent: "space-between !important",
	width: "75px",
	borderRadius: "4px",
	color: "white",
	backgroundColor: secondary,
	height: "42px",
	fontSize: "17px !important",
	"&:hover": {
		background: "#2196f3a6"
	}
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
	fontSize: "17px !important",
	"&:hover": {
		background: "#2196f3a6"
	}
};

export const disabledBtnStyles = {
	border: "none",
	padding: "10px",
	justifyContent: "center !important",
	width: "91px",
	borderRadius: "4px",
	color: "white !important",
	backgroundColor: disabled,
	fontSize: "14px !important"
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
	fontSize: "17px !important",
	"&:hover": {
		background: "#00000082",
		color: "black"
	}
};

export const headerButtonStyle = {
	borderRadius: "4px",
	color: white,
	fontSize: "14px !important",
	padding: "13.5px 10px",
	leading: "14.5px",
	background: primary,
	"&:hover": {
		background: darkBlue
	}
};

export const submitButton = {
	border: "none",
	padding: "10px",
	justifyContent: "center !important",
	width: "91px",
	borderRadius: "4px",
	color: "white !important",
	backgroundColor: secondary,
	"&:hover": {
		background: "#2196f3a6"
	},
	fontSize: "14px !important"
};

export const cancleButton = {
	border: "none",
	padding: "10px",
	justifyContent: "center !important",
	width: "91px",
	borderRadius: "4px",
	color: "black ",
	backgroundColor: "white",
	"&:hover": {
		background: "black",
		color: "white  !important"
	},
	fontSize: "14px !important"
};

export const addType = {
	borderRadius: "full",
	background: secondary,
	width: "43px",
	marginTop: "auto",
	color: white,
	height: "43px",
	"&:hover": {
		background: secondary
	}
};

export const deleteType = {
	...addType,
	background: deleteTypeBg,
	color: black,
	"&:hover": {
		background: deleteTypeBg
	}
};

export const addCustomerButton = {
	borderRadius: "4px",
	height: "39px",
	width: "91px",
	marginTop: "27px",
	color: secondary,
	fontSize: "14px !important",
	border: `1px solid ${fadeGrey}`
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

export const cursorPointer = {
	cursor: "pointer"
};

export const tableActionVisibiltyIcon = {
	fontSize: "21px",
	cursor: "pointer"
};

export const moveButton = {
	padding: "14px 0",
	marginTop: "20px",
	width: "100%",
	fontSize: "14px",
	leading: "17px",
	background: primary,
	color: white,
	borderRadius: "4px",
	"&:hover": {
		background: darkBlue
	}
};
