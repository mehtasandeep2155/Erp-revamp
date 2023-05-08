import { Box, CircularProgress } from "@mui/material";

import { loadingDiv } from "@css/styles";
import { pelorous } from "@css/color-palette";

export default function CircularIntegration() {
	return (
		<Box sx={{ display: "flex", alignItems: "center" }}>
			<div className={loadingDiv}>
				<Box sx={{ m: 1, position: "relative" }}>
					<CircularProgress
						size={50}
						sx={{
							color: pelorous,
							position: "relative",
							top: "100px",
							zIndex: 1
						}}
					/>
				</Box>
			</div>
		</Box>
	);
}
