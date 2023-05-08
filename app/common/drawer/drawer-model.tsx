import * as React from "react";
import { Drawer } from "@mui/material";

export default function SwipeableTemporaryDrawer({ isOpen, handleClose, content, anchor }: any) {
	return (
		<div>
			<React.Fragment key={anchor}>
				<Drawer
					anchor={anchor}
					open={isOpen}
					onClose={() => handleClose("", "model")}
					sx={{
						"& .MuiDrawer-paper": { boxSizing: "border-box", width: { sm: "50%", md: "35%", xs: "70%" } }
					}}
				>
					{content}
				</Drawer>
			</React.Fragment>
		</div>
	);
}
