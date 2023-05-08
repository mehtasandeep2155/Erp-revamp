import { dropNav, dropNavShowAlert, alertItems, alertItemsli, notifyDiv } from "@css/styles";

export default function CustomizeNotifications({ isOpen }: any) {
	return (
		<div className={notifyDiv}>
			<div className={isOpen ? dropNavShowAlert : dropNav} id="profile">
				<b>Notifications</b>
				<div className={alertItems}>
					<div className={alertItemsli} id="details">
						Purchase Order Initiated
					</div>
					<div className={alertItemsli} id="details">
						Purchase Order Initiated
					</div>
					<div className={alertItemsli} id="details">
						Purchase Order Initiated
					</div>
					<div className={alertItemsli} id="details">
						Purchase Order Initiated
					</div>
				</div>
			</div>
		</div>
	);
}
