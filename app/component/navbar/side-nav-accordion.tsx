import AccordionComponent from "@common/accordinon/accordion-summary";
import { activeSideNavItem, navIcon, sideNavItem, sideNavItemSub } from "@css/styles";
import { Circle } from "@mui/icons-material";
import { ProductTabs } from "./product-tabs";
import { useState } from "react";
import { useRouter } from "next/router";
import { isMenuItemSelected } from "@component/utils/helper";

const SideNavAccordion = ({ data, sideMenu, handleClose, className }: any) => {
	const { pathname } = useRouter();
	const { title, icon: Icon, children } = data;
	const [expanded, setExpanded] = useState<any>(false);

	const handleChange = (panel: string) => (event: any, isExpanded: any) => {
		setExpanded(() => (isExpanded ? panel : false));
	};

	return (
		<div>
			<AccordionComponent
				className={isMenuItemSelected(pathname, title) ? activeSideNavItem : sideNavItem}
				handleChange={handleChange}
				expanded={expanded}
				panel={"panel2"}
				sideMenu={sideMenu}
				details={
					children &&
					children?.map((item: any) => (
						<ProductTabs sideMenu={sideMenu} path={item.route} text={item.title} handleClose={handleClose}>
							<Circle sx={{ fontSize: "5px" }} />
						</ProductTabs>
					))
				}
				title={title}
				titleicon={Icon ? <Icon className={navIcon} /> : <Circle sx={{ fontSize: "5px" }} />}
			/>
		</div>
	);
};

export default SideNavAccordion;
