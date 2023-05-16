import { useEffect, memo } from "react";
import CustomizedDialogs from "@common/dailog/dailog-model";
import { getBranch } from "@api/get-api-queries";
import useBranch from "./branch-hook";
import AddBranch from "./add-branch";
import BranchListUi from "./branch-list-ui";
import SwipeableTemporaryDrawer from "@common/drawer/drawer-model";

function BranchList() {
	const {
		menu,
		onClick,
		branchValue,
		columns,
		getAllBranchList,
		fetchagain,
		tableData,
		loader,
		page,
		rowsPerPage,
		handleChangePage,
		handleChangeRowsPerPage,
		totalCount
	} = useBranch();
	const { branches } = getBranch(page, rowsPerPage);

	useEffect(() => {
		getAllBranchList();
	}, [branches.isLoading, fetchagain, branches.isRefetching]);

	const handleDelete = async (id: string) => {};
	return (
		<>
			<BranchListUi
				tableData={tableData}
				columns={columns}
				onClickByAdmin={onClick}
				onDelete={handleDelete}
				loading={loader}
				page={page}
				totalCount={totalCount}
				handleChangeRowsPerPage={handleChangeRowsPerPage}
				handleChangePage={handleChangePage}
				rowsPerPage={rowsPerPage}
			/>
			<>
				<SwipeableTemporaryDrawer
					isOpen={menu}
					handleClose={onClick}
					anchor="right"
					title="Add Branch"
					content={
						<AddBranch
							setIsOpen={false}
							branchValue={branchValue}
							onClickByAdmin={onClick}
							purchase={false}
							props={undefined}
						/>
					}
				/>
			</>
		</>
	);
}
export default memo(BranchList);
