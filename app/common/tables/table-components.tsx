import { pelorous } from "@css/color-palette";
import { bold } from "@css/styles";
import { Chip } from "@mui/material";
import { TableFilterList } from "mui-datatables";

const CustomChip = (propsChip: any) => {
	const { itemKey, columnNames, index } = propsChip;

	return (
		<div>
			<b className={bold}>{itemKey == 0 && columnNames[index].name}</b>
			<br />
			<Chip
				variant="outlined"
				sx={{ color: pelorous, marginLeft: "10px" }}
				label={propsChip.label}
				onDelete={propsChip.onDelete}
			/>
		</div>
	);
};

export default function CustomFilterList(filterProps: any) {
	return <TableFilterList {...filterProps} ItemComponent={CustomChip} />;
}
