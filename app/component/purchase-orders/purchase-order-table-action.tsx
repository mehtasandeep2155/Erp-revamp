import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import { flexIcon } from "@css/styles";
import { tableActionVisibiltyIcon } from "@css/mui-styles";
import { Receipt } from "@mui/icons-material";

const PurcharseOrderTableAction = ({ handleView, item, handleDetailsView, handleDispatch }: any) => {
	return (
		<>
			{!handleDispatch ? (
				<div className={flexIcon}>
					<ExitToAppIcon sx={tableActionVisibiltyIcon} onClick={() => handleView(item)} />
					<VisibilityIcon sx={tableActionVisibiltyIcon} onClick={() => handleDetailsView(item)} />
					<DeleteIcon sx={tableActionVisibiltyIcon} />
					{/* <Edit className={editIcon} onClick={() => onClick(item, "open", item.id)} /> */}
				</div>
			) : (
				<Receipt sx={tableActionVisibiltyIcon} onClick={() => handleDispatch(item)} />
			)}
		</>
	);
};

export default PurcharseOrderTableAction;
