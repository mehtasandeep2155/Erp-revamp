import React from "react";
import { errorContainer } from "../css/styles";
export default function Error() {
	return (
		<div className={errorContainer}>
			<div>
				<h6>WebPage Crashed Please Check Console</h6>
			</div>
		</div>
	);
}
