import { BootstrapDialog } from "@common/dailog/dialog-style";
import { BootstrapDialogTitle } from "./dailog-title";
import { DialogContent } from "@mui/material";

export default function CustomizedDialogs(props: any) {
	const { title, content, isOpen, handleClose, contentHead, width } = props;

	return (
		<div>
			<BootstrapDialog
				maxWidth={width}
				onClose={() => handleClose("", "model")}
				aria-labelledby="customized-dialog-title"
				open={isOpen}
				fullWidth
				scroll="paper"
			>
				<BootstrapDialogTitle id="customized-dialog-title" onClose={() => handleClose("", "model")}>
					{title}
				</BootstrapDialogTitle>
				{contentHead}
				<DialogContent dividers>{content}</DialogContent>
			</BootstrapDialog>
		</div>
	);
}
