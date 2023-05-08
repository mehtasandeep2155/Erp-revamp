import { styled } from "@mui/material/styles";
import Menu, { MenuProps } from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

const StyledMenu = styled((props: MenuProps) => (
	<Menu
		elevation={0}
		anchorOrigin={{
			vertical: "bottom",
			horizontal: "right"
		}}
		transformOrigin={{
			vertical: "top",
			horizontal: "right"
		}}
		{...props}
	/>
))(({ theme }) => ({
	"& .MuiPaper-root": {
		"& .MuiMenu-paper": {
			top: "40px"
		},
		borderRadius: 6,
		marginTop: theme.spacing(1),
		minWidth: 180,
		"& .MuiMenuItem-root": {
			"& .MuiSvgIcon-root": {
				fontSize: 18,
				color: theme.palette.text.secondary,
				marginRight: theme.spacing(1.5)
			}
		}
	}
}));

export default function CustomizedMenus({ children, isOpen, handleClose }: any) {
	return (
		<div>
			<StyledMenu
				id="demo-customized-menu"
				MenuListProps={{
					"aria-labelledby": "demo-customized-button"
				}}
				open={isOpen}
				onClose={() => handleClose("", "close")}
			>
				<MenuItem onClick={handleClose} disableRipple>
					{children}
				</MenuItem>
			</StyledMenu>
		</div>
	);
}
