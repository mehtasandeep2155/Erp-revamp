import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { ContainerFooter } from "../component/commoncomponent/common-components";
import SideNavBarDrawer from "../component/navbar/side-navbar-drawer";
import TopNavbar from "../component/navbar/top-navbar";
import {
	DesktopMenu,
	appLayout,
	authWrapper,
	flex,
	layoutBackgroundColor,
	tableDiv,
	tableDivMenu
} from "../css/styles";
import { lightMode, darkMode } from "../css/css-var";

const AppLayout = ({ children }: any) => {
	const [toggleMode, setToggleMode] = useState<any>("light");
	const [colorTheme, setColorTheme] = useState<any>(lightMode);
	const [isOpen, setIsOpen] = useState(false);
	const [isOpen2, setIsOpen2] = useState(false);
	const [drawerOpen, setDrawerOpen] = useState(true);
	const [sideMenu, setSideMenu] = useState(true);

	useEffect(() => {
		const theme: any = JSON.parse(localStorage.getItem("theme"));
		if (theme) {
			setColorTheme(theme);
		}
	}, []);

	const handleToggle = (type: any) => {
		if (type !== "logout") {
			if (toggleMode === "light") {
				setToggleMode("dark");
				setColorTheme(darkMode);
				localStorage.setItem("theme", JSON.stringify(darkMode));
			} else {
				setToggleMode("light");
				setColorTheme(lightMode);
				localStorage.setItem("theme", JSON.stringify(lightMode));
			}
		} else {
			setToggleMode("light");
			setColorTheme(lightMode);
		}
	};

	const handleOpen = () => {
		setIsOpen2(false);
		setIsOpen(!isOpen);
	};

	const handleNotifications = () => {
		setIsOpen(false);
		setIsOpen2(!isOpen2);
	};

	const { pathname } = useRouter();
	const showNavbar =
		pathname === "/user-login/login" ||
		pathname === "/" ||
		pathname === "/user-login/signup" ||
		pathname === "/user-login/forgot-password" ||
		pathname === "/user-login/reset-password"
			? false
			: true;
	return (
		<div
			className={layoutBackgroundColor}
			onClick={() => {
				if (isOpen || isOpen2) {
					setIsOpen(false);
					setIsOpen2(false);
				}
			}}
		>
			<div className={showNavbar && flex}>
				{showNavbar && (
					<div className={DesktopMenu}>
						<SideNavBarDrawer />
					</div>
				)}
				<div className={appLayout}>
					<div className={showNavbar ? (sideMenu ? tableDivMenu : tableDiv) : undefined}>
						{showNavbar && (
							<TopNavbar
								handleToggle={handleToggle}
								toggleMode={toggleMode}
								handleOpen={handleOpen}
								handleNotifications={handleNotifications}
								isOpen2={isOpen2}
								isOpen={isOpen}
								sideMenu={drawerOpen}
							/>
						)}
						<div className={showNavbar ? authWrapper : undefined}>{children}</div>
					</div>
					{showNavbar && <ContainerFooter />}
				</div>
			</div>
		</div>
	);
};

export default AppLayout;
