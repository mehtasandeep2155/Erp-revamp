import React from "react";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Collapse from "@mui/material/Collapse";
import Paper from "@mui/material/Paper";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { innerDataContainer, innerTableHeadingStyle, outerTableRow } from "@css/mui-styles";
import { secondary100, white } from "@css/color-palette";

export const YourPurchaseOrderTable = ({ rows, tableInnerData, iconAt, tableInnerHead, title, index }: any) => {
	const [open, setOpen] = React.useState(false);

	let modifiedTableInnerData = tableInnerData.filter((item: any, i: number) => i === index);
	return (
		<>
			<TableRow sx={{ padding: "0px", background: index % 2 === 0 ? white : secondary100 }}>
				{rows.map((item: any, index: number) => (
					<TableCell sx={{ padding: "7px" }}>
						<div
							style={{
								display: "flex",
								marginTop: "10px",
								alignItems: "center"
							}}
						>
							{iconAt === index ? (
								open ? (
									<ExpandMore onClick={() => setOpen(!open)} />
								) : (
									<ExpandLess onClick={() => setOpen(!open)} />
								)
							) : null}
							{item}
						</div>
					</TableCell>
				))}
			</TableRow>
			<TableRow sx={{ background: index % 2 === 0 ? white : secondary100 }}>
				<TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
					<Collapse in={open} timeout="auto" unmountOnExit>
						<Box sx={innerDataContainer}>
							<Typography variant="subtitle2" gutterBottom component="div" sx={innerTableHeadingStyle}>
								{title}
							</Typography>
							<Table>
								<TableHead>
									<TableRow>
										{tableInnerHead.map((item: any, index: number) => (
											<TableCell>{item}</TableCell>
										))}
									</TableRow>
								</TableHead>
								<TableBody>
									{modifiedTableInnerData?.map((item: any, index: number) => (
										<TableRow sx={{ background: index % 2 === 0 ? white : secondary100 }}>
											{item?.map((item: any) => (
												<TableCell sx={{ background: index % 2 === 0 ? white : secondary100 }}>
													{item}
												</TableCell>
											))}
										</TableRow>
									))}
								</TableBody>
							</Table>
						</Box>
					</Collapse>
				</TableCell>
			</TableRow>
		</>
	);
};

export default function CollapsibleTable({ tableHead, tableInnerHead, tableData, tableInnerData, iconAt, title }: any) {
	return (
		<TableContainer component={Paper} sx={{ width: "100%" }}>
			<Table>
				<TableHead sx={outerTableRow}>
					<TableRow sx={outerTableRow}>
						{tableHead?.map((item: any) => (
							<TableCell>{item}</TableCell>
						))}
					</TableRow>
				</TableHead>
				<TableBody>
					{tableData?.map((item: any, index: number) => (
						<YourPurchaseOrderTable
							rows={item}
							tableInnerData={tableInnerData}
							iconAt={iconAt}
							tableInnerHead={tableInnerHead}
							title={title}
							index={index}
						/>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}
