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
	deleteTypeBg,
	innerTableBg,
	mediumGrey
} from "./color-palette";
import { textAlign } from "html2canvas/dist/types/css/property-descriptors/text-align";

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
	padding: "0px",
	background: "white"
};
export const styleAddPurchaseOrder = {
	width: "425px",
	height: "45px",
	background: "white",
	"& .MuiOutlinedInput-root .MuiAutocomplete-endAdornment": {
		right: "2px !important",
		top: "-1px"
	}
};

export const styleAddSelectProductInfo = {
	width: "215px",
	height: "45px",
	background: "white"
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
	color: "white ",
	backgroundColor: disabled,
	fontSize: "14px !important",
	"& svg": {
		color: "#2196F3 !important"
	}
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

export const expanIconDiv = {
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
	textAlign: "center",
	float: "right",
	background: mediumGrey,
	fontSize: "13px",
	borderRadius: "0px 2px 2px 0px",
	width: "42px",
	height: "40px"
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
	background: white,
	borderRadius: "4px !important",
	width: "60px",
	padding: "0px",
	height: "41px",
	marginTop: "25px",
	border: " 1px solid #C0C0C0",
	"& svg": {
		color: "#2196F3",
		"& :hover": {
			background: "white"
		}
	}
};

export const deleteType = {
	...addType,
	borderRadius: "full !important",
	width: "38px",
	border: "none",
	height: "38px",
	background: deleteTypeBg,
	color: black,
	"& svg": {
		color: "black",
		"& :hover": {
			background: "white"
		}
	}
};
export const addButton = {
	...deleteType,
	background: secondary,
	marginTop: "45px",
	color: "white",
	"& svg": {
		color: "white",
		"& :hover": {
			background: "white"
		}
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

export const innerTableHeadingStyle = {
	fontWeight: "bold",
	padding: "10px 0 10px 10px",
	background: innerTableBg,
	marginBottom: "0 !important"
};

export const innerDataContainer = {
	border: `1px solid ${fadeGrey}`,
	borderRadius: "4px",

	".MuiTableCell-head ": {
		fontWeight: "600",
		borderBottom: "none"
	},

	".MuiTableHead-root .MuiTableRow-root": {
		borderBottom: "none !important",
		background: `${innerTableBg} !important`
	},

	".MuiTableCell-root , .MuiTableCell-body , .MuiTableCell-sizeMedium": {
		paddingTop: "0px !important",
		background: `${innerTableBg} !important`
	},

	".MuiTableRow-head .MuiTableCell-root": {
		background: "none !important",
		height: "28px"
	}
};

export const outerTableRow = {
	height: "48px",

	".MuiTableCell-root , .MuiTableCell-head , .MuiTableCell-sizeMedium ": {
		fontWeight: "bold"
	}
};
