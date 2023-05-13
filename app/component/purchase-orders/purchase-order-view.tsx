import TableDetailsComponent from "@common/tables/details-table";
import { AddHeader } from "@component/commoncomponent/add-header";
import { backButton, detailsPage, detailsPageView, flexWrapPgae, productTitle, tableView } from "@css/styles";
import { ArrowBack } from "@mui/icons-material";

const PurchaseOrderDetails = ({ data, headTitle, handleView }: any) => {
	return (
		<>
			<div className={detailsPage}>
				<ArrowBack className={backButton} onClick={() => handleView("close")} />
				<div className={flexWrapPgae}>
					<div className={detailsPageView}>
						<AddHeader title={headTitle} />
						<div className={tableView}>
							{data.map(
								(item: any) =>
									item.data.length > 0 && (
										<div>
											<h4 className={productTitle}>{item.title}</h4>
											<TableDetailsComponent
												columns={item.columns}
												tableData={item.data}
												pagination={false}
											/>
										</div>
									)
							)}
						</div>
					</div>
				</div>
			</div>
		</>
	);
};
export default PurchaseOrderDetails;
