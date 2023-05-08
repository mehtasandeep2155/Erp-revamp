import TableComponent from "@common/tables/custom-table";
import { memo } from "react";
import { header, tableTitle } from "@css/styles";
import { jobColums } from "@component/utils/form/constant";

const JobListWeb = (props: any) => {
	const { tableData, onDelete, loading } = props;

	return (
		<>
			<div className={header}>
				<h3 className={tableTitle}></h3>
			</div>
			<TableComponent
				title="Job Details List"
				tableData={tableData}
				columns={jobColums}
				onDelete={onDelete}
				loading={loading}
				buttonTitle="Add Job Details"
			/>
		</>
	);
};
export default memo(JobListWeb);
