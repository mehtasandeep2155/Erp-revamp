import {
	accordionDetails,
	flex,
	flexWrap,
	logSpan,
	logSpanMobile,
	navSection,
	navSummary,
	sideNavItem
} from "@css/styles";
import { ArrowForwardIos } from "@mui/icons-material";
import { AccordionDetails, Typography, styled } from "@mui/material";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import Accordion from "./accordion";
import { accordionArrowIcon } from "@css/mui-styles";
import { darkBlue } from "@css/color-palette";

const AccordionSummary = styled((props: any) => (
	<MuiAccordionSummary {...props} expandIcon={!props.sidemenu ? <ArrowForwardIos sx={accordionArrowIcon} /> : null} />
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
				<AccordionSummary
					aria-controls="panel1a-content"
					id="panel1a-header"
					sidemenu={sideMenu ? sideMenu : undefined}
				>
					<div className={flex}>
						<span className={navSummary}>
							{titleicon}
							<span className={!sideMenu ? logSpan : logSpanMobile}>{title}</span>
						</span>
					</div>
				</AccordionSummary>
			</div>
			<AccordionDetails sx={{ background: darkBlue }} className={accordionDetails}>
				{details}
			</AccordionDetails>
		</Accordion>
	);
}
