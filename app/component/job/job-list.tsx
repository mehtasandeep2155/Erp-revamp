import { useEffect, memo } from "react";
import { useValidation } from "@component/utils/form/validation";
import CustomizedDialogs from "@common/dailog/dailog-model";
import JobListWeb from "./job-list-ui";
import AddJob from "./add-job";
import useJob from "./job-hook";
import { getJob } from "@api/get-api-queries";

function JobList() {
	const { jobs } = getJob();
	const { menu, onClick, jobValue, getAllCompanyList, tableData, loader } = useJob(jobs);
	const { CompanySchema } = useValidation(jobValue);

	useEffect(() => {
		getAllCompanyList();
	}, [jobs.isLoading, jobs.isRefetching]);

	const handleDelete = async (id: string) => {};
	return (
		<>
			<JobListWeb
				tableData={tableData}
				// columns={columns}
				onClickByAdmin={onClick}
				onDelete={handleDelete}
				loading={loader}
			/>
			<CustomizedDialogs
				title="Job"
				isOpen={menu}
				handleClose={onClick}
				content={
					<AddJob
						setIsOpen={false}
						jobValue={jobValue}
						validation={CompanySchema}
						onClickByAdmin={onClick}
						purchase={false}
						props={undefined}
					/>
				}
			/>
		</>
	);
}
export default memo(JobList);
