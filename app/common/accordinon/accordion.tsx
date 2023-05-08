import MuiAccordion from "@mui/material/Accordion";
import { styled } from "@mui/material";
import { memo } from "react";

const Accordion = styled((props: any) => <MuiAccordion disableGutters elevation={0} square {...props} />)(
	({ theme }) => ({
		border: `1px solid ${theme.palette.divider}`,
		"&:not(:last-child)": {
			borderBottom: 0
		},
		"&:before": {
			display: "none"
		}
	})
);

export default memo(Accordion);
