import { titleDiv } from "@css/styles";
import { ExpandMore } from "@mui/icons-material";
import { Accordion, AccordionDetails, AccordionSummary, Typography } from "@mui/material";

export default function AccordionRowComponent({ title, summary, index, maxIndex }: any) {
	return (
		<Accordion sx={{ boxShadow: "none" }} aria-expanded={index >= maxIndex}>
			<AccordionSummary
				sx={{ boxShadow: "none" }}
				aria-expanded={index >= maxIndex && true}
				expandIcon={index >= maxIndex && <ExpandMore />}
				aria-controls="panel1a-content"
				id="panel1a-header"
			>
				<span className={titleDiv}>{title}</span>
			</AccordionSummary>
			<AccordionDetails sx={{ padding: " 0px 19px 0px", fontSize: "14px" }}>{summary}</AccordionDetails>
		</Accordion>
	);
}
