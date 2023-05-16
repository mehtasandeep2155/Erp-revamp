import TableComponent from "@common/tables/custom-table";
import { memo } from "react";
import { header, tableTitle } from "@css/styles";
import AddCustomer from "./add-customer";
import SwipeableTemporaryDrawer from "@common/drawer/drawer-model";

const CustomerListWeb = (props: any) => {
	const {
		columns,
		tableData,
		isOpen,
		onDelete,
		loading,
		page,
		rowsPerPage,
		totalCount,
		handleChangePage,
		handleChangeRowsPerPage,
		customerValue,
		onClickByAdmin
	} = props;

	return (
		<>
			<div className={header}>
				<h3 className={tableTitle}></h3>
			</div>
			<TableComponent
				title="Customers List"
				tableData={tableData}
				columns={columns}
				onDelete={onDelete}
				loading={loading}
				buttonTitle="Add Customer"
				page={page}
				rowsPerPage={rowsPerPage}
				totalCount={totalCount}
				handleChangePage={handleChangePage}
				handleChangeRowsPerPage={handleChangeRowsPerPage}
				clickAction={onClickByAdmin}
			/>

			<>
				<SwipeableTemporaryDrawer
					isOpen={isOpen}
					handleClose={onClickByAdmin}
					anchor="right"
					title="Add Customer"
					content={
						<>
							<AddCustomer
								customerValue={customerValue}
								onClickByAdmin={onClickByAdmin}
								tableData={tableData}
							/>
						</>
					}
				/>
			</>
		</>
	);
};
export default memo(CustomerListWeb);
