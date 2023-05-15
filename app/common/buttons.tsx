import { IconButton } from "@mui/material";

export const IconButtons = ({ icon, styles, lebel, clickEvent, type, disabled, ref }: any) => {
	return (
		<IconButton
			size="small"
			sx={styles}
			onClick={(e) => (disabled ? {} : clickEvent && clickEvent(e))}
			ref={ref}
			type={type}
			disabled={disabled}
		>
			{icon && icon}
			{lebel && lebel}
		</IconButton>
	);
};
