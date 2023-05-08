import { useEffect, memo } from "react";
import CustomizedDialogs from "@common/dailog/dailog-model";
import { getBranch } from "@api/get-api-queries";
import useBranch from "./branch-hook";
import AddBranch from "./add-branch";
import BranchListUi from "./branch-list-ui";

function BranchList() {
	const { branches } = getBranch();
	const { menu, onClick, branchValue, columns, getAllBranchList, fetchagain, tableData, loader } = useBranch();

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
			/>
			<CustomizedDialogs
				title="Branch"
				isOpen={menu}
				handleClose={onClick}
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
	);
}
export default memo(BranchList);
