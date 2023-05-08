import {
	pdfDiv,
	pdfSmDiv,
	headDetails,
	note,
	heading,
	about,
	text,
	textSpan,
	pdfTable,
	pdfHead,
	pdfRow,
	bottomDetails,
	headingTo,
	pdfRowT,
	downLoad
} from "@css/styles";
import { CloudDownload } from "@mui/icons-material";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

function PdfTemplate({ orderDeatils }: any) {
	return (
		<>
			<div className={pdfSmDiv}>
				<div className={pdfDiv}>
					<div className={headDetails}>
						<div>
							<b className={heading}>CHALLAN NO:</b>
							<span className={textSpan}>
								<span className={text}>{orderDeatils.challan_number}</span>
							</span>
						</div>
						<div>
							<b className={heading}>DATE:</b>
							<span className={textSpan}>
								<span className={text}>25/10/2023</span>
							</span>
						</div>
					</div>
					<div className={headingTo}>
						<b>To,</b>
					</div>
					<span className={about}>
						Please Recive the following goods in good order and good condition agaist your order number{" "}
						<span className={textSpan}>
							<span className={text}>{orderDeatils.order_number}</span>
						</span>
						<br />
						<span className={about}> dated </span>
						<span className={textSpan}>
							<span className={text}>25/10/2023</span>
						</span>
					</span>
					<div>
						<table className={pdfTable}>
							<thead className={pdfHead}>
								<tr>
									<th className={pdfRow}>No</th>
									<th className={pdfRow}>DESCRIPTION</th>
									<th className={pdfRow}>QTY.</th>
									<th className={pdfRow}>RATE</th>
									<th className={pdfRow}>AMOUNT</th>
								</tr>
							</thead>
							<tbody>
								{orderDeatils.products.map((item: any) => (
									<tr>
										<td className={pdfRow}></td>
										<td className={pdfRow}></td>
										<td className={pdfRow}>{item.count}</td>
										<td className={pdfRow}>{item.rate.rate}</td>
										<td className={pdfRow}>{item.rate.rate * item.count}</td>
									</tr>
								))}
								<tr>
									<td className={pdfRow}></td>
									<td className={pdfRow}></td>
									<td className={pdfRow}></td>
									<td className={pdfRow}></td>
									<td className={pdfRow}></td>
								</tr>
								<tr>
									<td className={pdfRow}></td>
									<td className={pdfRow}></td>
									<td className={pdfRow}></td>
									<td className={pdfRow}></td>
									<td className={pdfRow}></td>
								</tr>
								<tr>
									<td className={pdfRow}></td>
									<td className={pdfRow}></td>
									<td className={pdfRow}></td>
									<td className={pdfRow}></td>
									<td className={pdfRow}></td>
								</tr>
								<tr>
									<td className={pdfRow}></td>
									<td className={pdfRowT}>
										<span className={text}>Thank You!</span>
									</td>
									<td className={pdfRow}></td>
									<td className={pdfRow}></td>
									<td className={pdfRow}></td>
								</tr>
							</tbody>
						</table>
					</div>
					<div className={bottomDetails}>
						<span className={pdfHead}>Note:</span>
						<span className={note}>
							no complaints will be entertained if the sames are recived after 3 days of delivery.
							<br />
						</span>
						<span className={heading}>Please return the voucher duly signed with stamp.</span>
					</div>
				</div>
				<div className={headDetails}>
					<b className={heading}>Reciver's Signature</b>
					<b className={heading}>Signature</b>
				</div>
			</div>
		</>
	);
}

function PurchaseOrderPdf({ orderDeatils }: any) {
	const handleGeneratePdf = () => {
		html2canvas(document.getElementById("pdf")).then(function (canvas) {
			let img = canvas.toDataURL("image/jpeg", 1);
			let doc = new jsPDF("p", "mm", "a4");
			let width = doc.internal.pageSize.getWidth();
			let height = doc.internal.pageSize.getHeight();
			doc.addImage(img, "JPEG", 0, 0, width, height);
			doc.save("sample-file.pdf");
		});
	};

	return (
		<div>
			<div className={downLoad} onClick={handleGeneratePdf}>
				<CloudDownload />
			</div>
			<div id="pdf">
				<PdfTemplate orderDeatils={orderDeatils} />
			</div>
		</div>
	);
}

export default PurchaseOrderPdf;
