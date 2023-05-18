import { array } from "@component/utils/form/constant";
import useHandleChange from "@component/utils/form/handle-change";
import { pelorous } from "@css/color-palette";
import { table, smTablediv, tableHeadTr, tableTr } from "@css/styles";
import { Checkbox, FormControlLabel } from "@mui/material";

export default function SimpleTable({ modules, valueProps }: any) {
	const { handleChange } = useHandleChange("", "");

	return (
		<div className={table}>
			{/* SuperAdmin */}
			{console.log(valueProps.values)}
			<div className={tableHeadTr}>
				<span>Modules</span>
				<div className={smTablediv}>
					<span>View</span>
					<span>Edit</span>
					<span>Delete</span>
				</div>
			</div>
			{array.map((item: any) => (
				<div className={tableTr}>
					<span>{modules[item]?.name}</span>
					<div>
						<FormControlLabel
							control={
								<Checkbox
									sx={{
										color: pelorous,
										"&.Mui-checked": {
											color: pelorous
										}
									}}
								/>
							}
							label=""
							name={modules[item]?.name}
							disabled={
								valueProps.values.role === "SuperAdmin" || valueProps.values.role === "Admin"
									? true
									: modules[item]?.controls?.Delete === true || modules[item]?.controls?.Edit === true
							}
							checked={
								valueProps.values.role === "SuperAdmin" || valueProps.values.role === "Admin"
									? true
									: modules[item]?.controls?.Read === true
									? true
									: false
							}
							onChange={(e) => handleChange(e, valueProps, modules[item], "Read")}
						/>
						<FormControlLabel
							control={
								<Checkbox
									sx={{
										color: pelorous,
										"&.Mui-checked": {
											color: pelorous
										}
									}}
								/>
							}
							label=""
							name={modules[item]?.name}
							disabled={
								valueProps.values.role === "SuperAdmin" || valueProps.values.role === "Admin"
									? true
									: modules[item]?.controls?.Delete === true
							}
							checked={
								valueProps.values.role === "SuperAdmin" || valueProps.values.role === "Admin"
									? true
									: modules[item]?.controls?.Edit === true
									? true
									: false
							}
							onChange={(e) => handleChange(e, valueProps, modules[item], "Edit")}
						/>
						<FormControlLabel
							control={
								<Checkbox
									sx={{
										color: pelorous,
										"&.Mui-checked": {
											color: pelorous
										}
									}}
								/>
							}
							label=""
							name={modules[item]?.name}
							disabled={
								valueProps.values.role === "SuperAdmin" || valueProps.values.role === "Admin"
									? true
									: false
							}
							checked={
								valueProps.values.role === "SuperAdmin" || valueProps.values.role === "Admin"
									? true
									: modules[item]?.controls?.Delete === true
									? true
									: false
							}
							onChange={(e) => handleChange(e, valueProps, modules[item], "Delete")}
						/>
					</div>
				</div>
			))}
		</div>
	);
}
