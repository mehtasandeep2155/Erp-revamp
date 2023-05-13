import React from "react";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import IconButton from "@mui/material/IconButton";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Collapse from "@mui/material/Collapse";
import Paper from "@mui/material/Paper";
import { ArrowDownward, ExpandLess, ExpandMore } from "@mui/icons-material";

const YourPurchaseOrderTable = ({ rows, tableInnerData, iconAt, tableInnerHead, title }: any) => {
	const [open, setOpen] = React.useState(false);

	return (
		<>
			<TableRow>
				{rows.map((item: any, index: number) => (
					<TableCell>
						<div style={{ display: "flex", marginTop: "10px", alignItems: "center" }}>
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
			<TableRow>
				<TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
					<Collapse in={open} timeout="auto" unmountOnExit>
						<Box margin={1}>
							<Typography variant="subtitle2" gutterBottom component="div">
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
									{tableInnerData?.map((item: any, index: number) => (
										<TableRow>
											{item?.map((item: any) => (
												<TableCell>{item}</TableCell>
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
				<TableHead>
					<TableRow>
						{tableHead?.map((item: any) => (
							<TableCell>{item}</TableCell>
						))}
					</TableRow>
				</TableHead>
				<TableBody>
					{tableData?.map((item: any) => (
						<YourPurchaseOrderTable
							rows={item}
							tableInnerData={tableInnerData}
							iconAt={iconAt}
							tableInnerHead={tableInnerHead}
							title={title}
						/>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}
