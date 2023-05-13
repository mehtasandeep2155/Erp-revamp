import CustomizedDialogs from "@common/dailog/dailog-model";
import useNavbar from "@component/navbar/navbar-hook";
import { profileBtn, dropNav, dropNavShow, flex, flexUser, logOutBtn, subMenuSpan, profileImgDrop } from "@css/styles";
import MyProfile from "./profile-page";
import { useState } from "react";

export default function TopProfileBox({ details, isOpen, handleDrawer, handleToggle }: any) {
	const { handleLogOut } = useNavbar(handleToggle);
	const [openModel, setOpenModel] = useState(false);
	const handleModel = (model: any, type: any) => {
		handleDrawer("", "model");
		setOpenModel(!openModel);
	};
	return (
		<div className={isOpen ? dropNavShow : dropNav} id="profile">
			<div className={flex}>
				<div>
					<div className={profileBtn}>
						<div>
							<b>{details?.role}</b>
							<div>
								<b className={subMenuSpan}>{details?.email}</b>
							</div>
						</div>
					</div>
					<div className={logOutBtn} id="logOut" onClick={() => handleModel("", "open")}>
						<div className={flexUser}>
							<span>My Profile</span>
						</div>
					</div>
					<div className={logOutBtn} id="logOut" onClick={handleLogOut}>
						<div className={flexUser}>
							<span>Logout</span>
						</div>
					</div>
				</div>
			</div>
			<CustomizedDialogs
				title="Profile Details"
				handleClose={handleModel}
				isOpen={openModel}
				content={<MyProfile details={details} />}
			/>
		</div>
	);
}
