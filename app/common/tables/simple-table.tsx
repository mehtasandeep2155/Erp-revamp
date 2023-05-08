import useConstant from "@component/utils/form/constant";
import useHandleChange from "@component/utils/form/handle-change";
import { pelorous } from "@css/color-palette";
import { table, smTablediv, tableHeadTr, tableTr } from "@css/styles";
import { Checkbox, FormControlLabel } from "@mui/material";

export default function SimpleTable({ modules, valueProps }: any) {
	const { handleChange } = useHandleChange("", "");
	const { array } = useConstant();

	return (
		<div className={table}>
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
					<span>{modules[item].name}</span>
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
							name={modules[item].name}
							disabled={modules[item].controls.Delete === true || modules[item].controls.Edit === true}
							checked={modules[item].controls.Read === true ? true : false}
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
							name={modules[item].name}
							disabled={modules[item].controls.Delete === true}
							checked={modules[item].controls.Edit === true ? true : false}
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
							name={modules[item].name}
							checked={modules[item].controls.Delete === true ? true : false}
							onChange={(e) => handleChange(e, valueProps, modules[item], "Delete")}
						/>
					</div>
				</div>
			))}
		</div>
	);
}
