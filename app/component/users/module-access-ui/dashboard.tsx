import { header, tableTitle } from "@css/styles";
import TableComponent from "common/tables/custom-table";
import { memo } from "react";
import useConstant from "@component/utils/form/constant";

const Dashboard = (props: any) => {
	const { tableData, onDelete, loading } = props;
	const { verifyColumns } = useConstant();

	return (
		<>
			<div className={header}>
				<h3 className={tableTitle}></h3>
			</div>
			<TableComponent
				title="Users List"
				columns={verifyColumns}
				tableData={tableData}
				onDelete={onDelete}
				loading={loading}
			/>
		</>
	);
};

export default memo(Dashboard);
