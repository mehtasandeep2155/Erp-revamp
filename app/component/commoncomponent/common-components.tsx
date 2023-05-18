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
import { IconButtons } from "@common/buttons";
import { headerButtonStyle, titleStyle } from "@css/mui-styles";

const ContainerFooter = () => {
	return <div className={footerStyles}>Copyright ©, All rights reserved Allumsmith</div>;
};

function HeaderPage(props: any) {
	const { onClickByAdmin, tableData, title } = props;
	return (
		<>
			<div className={header}>
				{title && (
					<>
						<h3 className={tableTitle}></h3>
						<div className={tableTitle}>
							<IconButtons
								styles={headerButtonStyle}
								lebel={title}
								clickEvent={() => onClickByAdmin(tableData, "open", "")}
							/>
						</div>
					</>
				)}
			</div>
		</>
	);
}

export { ContainerFooter, HeaderPage };
