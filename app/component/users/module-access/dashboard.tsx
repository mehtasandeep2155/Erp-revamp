import { useEffect, memo } from "react";
import Dashboard from "@component/users/module-access-ui/dashboard";
import VerifyUserFormWeb from "./verify-user-form";
import useVerification from "../module-access-ui/verify-user-hook";
import SwipeableTemporaryDrawer from "@common/drawer/drawer-model";
import { drawerDiv } from "@css/styles";
import { getUsers } from "@api/get-api-queries";

function DashboardWeb() {
	const { userDetails, getAllUser, onClick, tableData, columns, fetchagain, menu, loader } = useVerification();
	const { users } = getUsers();

	useEffect(() => {
		getAllUser();
	}, [users.isLoading, fetchagain, users.isRefetching]);

	return (
		<>
			<Dashboard columns={columns} tableData={tableData} onClickByAdmin={onClick} loading={loader} />
			<SwipeableTemporaryDrawer
				isOpen={menu}
				handleClose={onClick}
				anchor="right"
				title="Verify User"
				content={
					<div className={drawerDiv}>
						<VerifyUserFormWeb userdetails={userDetails} onClick={onClick} />
					</div>
				}
			/>
		</>
	);
}

export default memo(DashboardWeb);
