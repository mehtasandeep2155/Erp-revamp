import { IconButton } from "@mui/material";

export const IconButtons = ({ icon, styles, lebel, clickEvent, type }: any) => {
	return (
		<IconButton size="small" sx={styles} onClick={clickEvent} type={type}>
			{icon && icon}
			{lebel && lebel}
		</IconButton>
	);
};
