import {
	btnView,
	footerContainer,
	footerSmallDiv,
	header,
	tableTitle,
	left,
	logo,
	leftDivImg,
	loginLeftDiv,
	textTitle,
	icon,
	addDiv,
	footerStyles
} from "@css/styles";
import { loginImage } from "@component/utils/images";
import { Add } from "@mui/icons-material";

const ContainerFooter = () => {
	return <div className={footerStyles}>Copyright ©, All rights reserved Allumsmith</div>;
};

function HeaderPage(props: any) {
	const { onClickByAdmin, tableData, title } = props;
	return (
		<div className={header}>
			<h3 className={tableTitle}></h3>
			<div className={tableTitle}>
				{title && (
					<button className={btnView} onClick={() => onClickByAdmin(tableData, "open")}>
						<div className={addDiv}>
							<Add className={icon} />
							<span className={textTitle}>{title}</span>
						</div>
					</button>
				)}
			</div>
		</div>
	);
}

export { ContainerFooter, HeaderPage };
