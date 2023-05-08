import {
	navbar,
	navbarUl,
	linkStyle,
	navIcon,
	logOut,
	navbarExpand,
	flexUser,
	logSpan,
	menuIcon,
	DesktopMenu,
	logSpanMobile,
	sideNavItem,
	activeSideNameItem,
	sideNavItemSub,
	userName,
	drawerControl,
	arrowIconWrapper,
	userNameHidden
} from "@css/styles";
import { customerList, dashboard, inVoiceList, jobList, branchList } from "@component/utils/routes";
import AccordionComponent from "@common/accordinon/accordion-summary";
import {
	AddShoppingCartOutlined,
	BusinessOutlined,
	Shop2Outlined,
	PeopleOutlineOutlined,
	InventoryOutlined,
	ReceiptOutlined,
	ManageAccounts,
	WorkHistoryOutlined,
	WorkHistory,
	ArrowForwardIos,
	ArrowBackIos,
	Circle
} from "@mui/icons-material";
import { useEffect, useState } from "react";
import {
	coatingTabs,
	companyTabs,
	dispatchTabs,
	dispatchTabsObject,
	inventoryTabs,
	inventoryTabsObject,
	ledgerTabs,
	ledgerTabsObject,
	productTabs,
	productTabsObject,
	purchaseOrderTabs
} from "./product-tabs-object";
import { ProductTabs } from "./product-tabs";
import { Menu as MenuIcon } from "@mui/icons-material";
import { useRouter } from "next/router";
import { IconButton, MenuItem, Menu, Fade } from "@mui/material";
import useConstant from "@component/utils/form/constant";

export default function SideNavBar(props: any) {
	const { sideMenu, handleMenu, handleClose } = props;
	const { push, pathname } = useRouter();
	const [expanded, setExpanded] = useState<any>(false);
	const [expanded1, setExpanded1] = useState<any>(false);
	const [moduleAccess, setModulesAccess] = useState([]);
	const [mouseOver, setMouseOver] = useState(false);
	const [userRole, setUserRole] = useState("");
	const { adminRoles } = useConstant();
	const { adminModules, superAdminModules } = useConstant();

	const handleChange = (panel: string) => (event: any, isExpanded: any) => {
		setExpanded(isExpanded ? panel : false);
	};

	const handleChange1 = (panel: string) => (event: any, isExpanded: any) => {
		setExpanded1(isExpanded ? panel : false);
	};

	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);

	const handleClick = (e: any) => {
		setAnchorEl(e.currentTarget);
	};
	const handleClose2 = () => {
		setAnchorEl(null);
	};

	useEffect(() => {
		let localData = JSON.parse(localStorage.getItem("userdata"));
		let moduleArr: any = [];
		if (localData) {
			setUserRole(localData.user.role);
			if (localData.user.role === "Admin") {
				moduleArr = moduleArr.concat(adminModules);
			} else if (localData.user.role === "SuperAdmin") {
				moduleArr = moduleArr.concat(superAdminModules);
			} else {
				localData.user.modules.map((item: any) => {
					moduleArr.push(item.name);
				});
			}
			setModulesAccess(moduleArr);
		}
	}, []);

	return (
		<>
			<div className={sideMenu ? `${navbar} ${navbarExpand} ` : `${navbar} `}>
				{<h3 className={!sideMenu ? userName : userNameHidden}>ALLUMSMITH</h3>}
				<>
					{
						<ul className={navbarUl}>
							{moduleAccess.includes("User") && (
								<div className={pathname !== dashboard ? sideNavItem : activeSideNameItem}>
									<li className={logOut}>
										<a onClick={() => push(dashboard)} className={linkStyle}>
											<div className={flexUser}>
												<ManageAccounts className={navIcon} />
												<span className={!sideMenu ? logSpan : logSpanMobile}>
													Users Verification
												</span>
											</div>
										</a>
									</li>
								</div>
							)}
							{moduleAccess.includes("PurchaseOrders") && (
								<>
									{!sideMenu ? (
										<AccordionComponent
											className={sideNavItem}
											handleChange={handleChange}
											expanded={expanded}
											panel={"panel2"}
											sideMenu={sideMenu}
											details={
												<>
													{purchaseOrderTabs.map(
														({
															key,
															path,
															text
														}: {
															key: string;
															path: string;
															text: string;
														}) => {
															return (
																<ProductTabs
																	sideMenu={sideMenu}
																	path={path}
																	text={text}
																	handleClose={handleClose}
																>
																	<Circle sx={{ fontSize: "5px" }} />
																</ProductTabs>
															);
														}
													)}
													<AccordionComponent
														className={sideNavItemSub}
														handleChange={handleChange1}
														expanded={expanded1}
														panel={"panel6"}
														sideMenu={sideMenu}
														details={
															<>
																{coatingTabs.map(
																	({
																		key,
																		path,
																		text
																	}: {
																		key: string;
																		path: string;
																		text: string;
																	}) => {
																		return (
																			<ProductTabs
																				sideMenu={sideMenu}
																				path={path}
																				text={text}
																				handleClose={handleClose}
																			>
																				<Circle sx={{ fontSize: "5px" }} />
																			</ProductTabs>
																		);
																	}
																)}
															</>
														}
														title={"Coating"}
														titleicon={<Circle sx={{ fontSize: "5px" }} />}
													/>
													<AccordionComponent
														className={sideNavItemSub}
														handleChange={handleChange1}
														expanded={expanded1}
														panel={"panel7"}
														sideMenu={sideMenu}
														details={
															<>
																{dispatchTabs.map(
																	({
																		key,
																		path,
																		text
																	}: {
																		key: string;
																		path: string;
																		text: string;
																	}) => {
																		return (
																			<ProductTabs
																				sideMenu={sideMenu}
																				path={path}
																				text={text}
																				handleClose={handleClose}
																			>
																				<Circle sx={{ fontSize: "5px" }} />
																			</ProductTabs>
																		);
																	}
																)}
															</>
														}
														title={"Dispatch"}
														titleicon={<Circle sx={{ fontSize: "5px" }} />}
													/>
													{adminRoles?.includes(userRole) && (
														<>
															<ProductTabs
																sideMenu={sideMenu}
																path={inVoiceList}
																text={"Invoice"}
																handleClose={handleClose}
															>
																<Circle sx={{ fontSize: "5px" }} />
															</ProductTabs>
														</>
													)}
												</>
											}
											title={"Purchase Orders"}
											titleicon={<Shop2Outlined className={navIcon} />}
										/>
									) : (
										<>
											<div className={pathname ? sideNavItem : activeSideNameItem}>
												<li className={logOut}>
													<div className={flexUser}>
														<Shop2Outlined
															className={navIcon}
															onClick={(e) => handleClick(e)}
														/>
														<Menu
															id="demo-positioned-menu"
															aria-labelledby="demo-positioned-button"
															anchorEl={anchorEl}
															open={open}
															anchorOrigin={{
																vertical: "top",
																horizontal: "left"
															}}
															transformOrigin={{
																vertical: "top",
																horizontal: "left"
															}}
															sx={{
																marginLeft: "60px",
																borderRadius: "0px",
																boxShadow: "none"
															}}
															onClose={handleClose2}
															TransitionComponent={Fade}
														>
															{[
																...purchaseOrderTabs,
																...coatingTabs,
																...dispatchTabs
															].map(({ text }) => (
																<MenuItem onClick={handleClose2}>
																	<Circle
																		sx={{
																			fontSize: "5px",
																			marginRight: "17px"
																		}}
																	/>
																	{text}
																</MenuItem>
															))}
														</Menu>
													</div>
												</li>
											</div>
										</>
									)}
									<div className={pathname !== branchList ? sideNavItem : activeSideNameItem}>
										<li className={logOut}>
											<a onClick={() => push(branchList)} className={linkStyle}>
												<div className={flexUser}>
													<WorkHistoryOutlined className={navIcon} />
													<span className={!sideMenu ? logSpan : logSpanMobile}>Branch</span>
												</div>
											</a>
										</li>
									</div>
								</>
							)}
							{moduleAccess.includes("Company") && (
								<>
									{!sideMenu ? (
										<AccordionComponent
											handleChange={handleChange}
											expanded={expanded}
											panel={"panel3"}
											className={sideNavItem}
											sideMenu={sideMenu}
											title={"Company"}
											titleicon={
												<BusinessOutlined
													className={navIcon}
													sx={{ maxWidth: 60, maxHeight: 60 }}
												/>
											}
											details={
												<>
													{companyTabs.map(
														({
															key,
															path,
															text
														}: {
															key: string;
															path: string;
															text: string;
														}) => {
															return (
																<ProductTabs
																	sideMenu={sideMenu}
																	path={path}
																	text={text}
																	handleClose={handleClose}
																>
																	<Circle sx={{ fontSize: "5px" }} />
																</ProductTabs>
															);
														}
													)}
												</>
											}
										/>
									) : (
										<div className={pathname !== "" ? sideNavItem : activeSideNameItem}>
											<li className={logOut}>
												<div className={flexUser}>
													<BusinessOutlined
														className={navIcon}
														sx={{ maxWidth: 60, maxHeight: 60 }}
														onClick={(e) => handleClick(e)}
													/>

													<Menu
														id="demo-positioned-menu"
														aria-labelledby="demo-positioned-button"
														anchorEl={anchorEl}
														open={open}
														anchorOrigin={{
															vertical: "top",
															horizontal: "left"
														}}
														transformOrigin={{
															vertical: "top",
															horizontal: "left"
														}}
														sx={{
															marginLeft: "60px",
															borderRadius: "0px",
															boxShadow: "none"
														}}
														onClose={handleClose2}
														TransitionComponent={Fade}
													>
														{[...purchaseOrderTabs, ...coatingTabs, ...dispatchTabs].map(
															({ text }) => (
																<MenuItem onClick={handleClose2}>
																	<Circle
																		sx={{
																			fontSize: "5px",
																			marginRight: "17px"
																		}}
																	/>
																	{text}
																</MenuItem>
															)
														)}
													</Menu>
												</div>
											</li>
										</div>
									)}
								</>
							)}
							{moduleAccess.includes("Products") && (
								<AccordionComponent
									className={sideNavItem}
									handleChange={handleChange}
									expanded={expanded}
									panel={"panel1"}
									sideMenu={sideMenu}
									title={"Products"}
									titleicon={<AddShoppingCartOutlined className={navIcon} />}
									details={
										<>
											{productTabs.map(
												({ key, path, text }: { key: string; path: string; text: string }) => {
													return (
														<ProductTabs
															sideMenu={sideMenu}
															path={path}
															text={text}
															handleClose={handleClose}
														>
															<Circle sx={{ fontSize: "5px" }} />
														</ProductTabs>
													);
												}
											)}
										</>
									}
								/>
							)}

							{moduleAccess.includes("Customers") && (
								<div className={pathname !== customerList ? sideNavItem : activeSideNameItem}>
									<li onClick={() => handleClose(false, "open")} className={logOut}>
										<a onClick={() => push(customerList)} className={linkStyle}>
											<div className={flexUser}>
												<PeopleOutlineOutlined className={navIcon} />
												<span className={!sideMenu ? logSpan : logSpanMobile}>Customers</span>
											</div>
										</a>
									</li>
								</div>
							)}
							{moduleAccess.includes("Job") && (
								<div className={pathname !== jobList ? sideNavItem : activeSideNameItem}>
									<li onClick={() => handleClose(false, "open")} className={logOut}>
										<a onClick={() => push(jobList)} className={linkStyle}>
											<div className={flexUser}>
												<WorkHistory className={navIcon} />
												<span className={!sideMenu ? logSpan : logSpanMobile}>Job Details</span>
											</div>
										</a>
									</li>
								</div>
							)}
							{moduleAccess.includes("Ledger") && (
								<AccordionComponent
									handleChange={handleChange}
									expanded={expanded}
									className={sideNavItem}
									panel={"panel4"}
									sideMenu={sideMenu}
									details={
										<>
											{ledgerTabs.map(
												({ key, path, text }: { key: string; path: string; text: string }) => {
													return (
														<ProductTabs
															sideMenu={sideMenu}
															path={path}
															text={text}
															handleClose={handleClose}
														>
															<Circle sx={{ fontSize: "5px" }} />
														</ProductTabs>
													);
												}
											)}
										</>
									}
									title={"Ledger"}
									titleicon={<ReceiptOutlined className={navIcon} />}
								/>
							)}
							{moduleAccess.includes("Inventory") && (
								<AccordionComponent
									className={sideNavItem}
									handleChange={handleChange}
									expanded={expanded}
									panel={"panel5"}
									sideMenu={sideMenu}
									title={"Inventory"}
									titleicon={<InventoryOutlined className={navIcon} />}
									details={
										<>
											{inventoryTabs.map(
												({ key, path, text }: { key: string; path: string; text: string }) => {
													return (
														<ProductTabs
															sideMenu={sideMenu}
															path={path}
															text={text}
															handleClose={handleClose}
														>
															<Circle sx={{ fontSize: "5px" }} />
														</ProductTabs>
													);
												}
											)}
										</>
									}
								/>
							)}
						</ul>
					}
					<div className={drawerControl}>
						{!sideMenu ? (
							<div className={arrowIconWrapper}>
								<ArrowBackIos
									className={
										sideMenu ? `${menuIcon} ${navbarExpand} ` : `${menuIcon}  ${DesktopMenu}`
									}
									onClick={() => handleClose(false)}
								/>
							</div>
						) : (
							<div className={arrowIconWrapper}>
								<ArrowForwardIos
									className={sideMenu ? `${menuIcon} ${navbarExpand} ` : `${menuIcon} ${DesktopMenu}`}
									onClick={() => handleClose(true)}
								/>
							</div>
						)}
					</div>
				</>
			</div>
		</>
	);
}
