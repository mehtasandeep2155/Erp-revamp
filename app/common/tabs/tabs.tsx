import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { tabComponentData, tabComponentProps, tabPanelProps } from "@component/utils/type/interfaces";
import { useRouter } from "next/router";

function TabPanel(props: tabPanelProps) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}
		>
			{value === index && <Box sx={{ p: 3 }}>{children}</Box>}
		</div>
	);
}

export default function TabsComponent({ tabData, value, handleTabChange }: tabComponentProps) {
	const { push, pathname, asPath } = useRouter();

	return (
		<>
			<Box sx={{ borderBottom: 1, borderColor: "divider" }}>
				<Tabs variant="fullWidth" value={value} onChange={handleTabChange} aria-label="basic tabs example">
					{tabData?.map((item: tabComponentData) => (
						<Tab
							label={item.label}
							onClick={() => {
								push(
									{
										pathname: pathname,
										query: `filter=${item.route}`
									},
									undefined,
									{
										shallow: true
									}
								);
							}}
						/>
					))}
				</Tabs>
			</Box>
		</>
	);
}
