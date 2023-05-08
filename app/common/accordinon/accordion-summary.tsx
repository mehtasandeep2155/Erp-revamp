import { accordionDetails, flex, flexWrap, logSpan, logSpanMobile, navSection, sideNavItem } from "@css/styles";
import { ArrowForwardIos } from "@mui/icons-material";
import { AccordionDetails, Typography, styled } from "@mui/material";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import Accordion from "./accordion";
import { accordionArrowIcon } from "@css/mui-styles";

const AccordionSummary = styled((props: any) => (
	<MuiAccordionSummary {...props} expandIcon={!props.sideMenu ? <ArrowForwardIos sx={accordionArrowIcon} /> : null} />
))(({ theme }) => ({
	"& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
		transform: "rotate(90deg)"
	}
}));

export default function AccordionComponent(props: any) {
	const { handleChange, expanded, panel, sideMenu, details, title, titleicon, className } = props;
	return (
		<Accordion className={navSection} expanded={expanded === panel} onChange={handleChange(panel)}>
			<div className={className}>
				<AccordionSummary aria-controls="panel1a-content" id="panel1a-header" sideMenu={sideMenu}>
					<div className={flex}>
						<Typography className={flexWrap}>
							{titleicon}
							<span className={!sideMenu ? logSpan : logSpanMobile}>{title}</span>
						</Typography>
					</div>
				</AccordionSummary>
			</div>
			<AccordionDetails className={accordionDetails}>{details}</AccordionDetails>
		</Accordion>
	);
}
