import { ExpandMore } from "@mui/icons-material";
import { Accordion, AccordionDetails, AccordionSummary, Typography } from "@mui/material";

export default function AccordionRowComponent({ title, summary, index, maxIndex }: any) {
	return (
		<Accordion sx={{ boxShadow: "none" }}>
			<AccordionSummary
				sx={{ boxShadow: "none" }}
				expandIcon={index >= maxIndex && <ExpandMore />}
				aria-controls="panel1a-content"
				id="panel1a-header"
			>
				<span>{title}</span>
			</AccordionSummary>
			<AccordionDetails sx={{ padding: " 0px 19px 0px" }}>{summary}</AccordionDetails>
		</Accordion>
	);
}
