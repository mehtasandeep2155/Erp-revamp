import { Button } from "@mui/material";

export const ButtonIcon = (props: any) => {
	const { button, className, startIcon } = props;
	return (
		<button className={className}>
			{startIcon && startIcon}
			{button && button}
		</button>
	);
};
