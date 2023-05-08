import TableComponent from "@common/tables/custom-table";
import { memo } from "react";
import { header, tableTitle } from "@css/styles";

const CustomerListWeb = (props: any) => {
	const { columns, tableData, isOpen, onDelete, loading } = props;

	return (
		<>
			<div className={header}>
				<h3 className={tableTitle}></h3>
			</div>
			{!isOpen && (
				<TableComponent
					title="Customers List"
					tableData={tableData}
					columns={columns}
					onDelete={onDelete}
					loading={loading}
					buttonTitle="Add Customer"
				/>
			)}
		</>
	);
};
export default memo(CustomerListWeb);
