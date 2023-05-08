import SideNavAccordion from "./side-nav-accordion";
import SideNavMenu from "./side-nav-menu";

const SideNavNestedItem = ({ data, sideMenu, handleClose }: any) => {
	return (
		<>
			{!sideMenu ? (
				<SideNavAccordion data={data} sideMenu={sideMenu} handleClose={handleClose} className={null} />
			) : (
				<SideNavMenu data={data} sideMenu={sideMenu} handleClose={handleClose} className={null} />
			)}
		</>
	);
};

export default SideNavNestedItem;
