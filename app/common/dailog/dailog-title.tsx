import CloseIcon from "@mui/icons-material/Close";
import { DialogTitleProps } from "@component/utils/type/interfaces";
import { DialogTitle, IconButton } from "@mui/material";

export function BootstrapDialogTitle(props: DialogTitleProps) {
	const { children, onClose, ...other } = props;

	return (
		<DialogTitle sx={{ m: 0, p: 2, fontSize: "1rem" }} {...other}>
			{children}
			{onClose ? (
				<IconButton
					aria-label="close"
					onClick={onClose}
					sx={{
						position: "absolute",
						right: 8,
						top: 8,
						fontSize: "1rem",
						color: (theme) => theme.palette.grey[500]
					}}
				>
					<CloseIcon />
				</IconButton>
			) : null}
		</DialogTitle>
	);
}
