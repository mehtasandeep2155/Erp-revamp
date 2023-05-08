import {
	companyChip,
	menuItmeStyle,
	profileDiv,
	profileImgDetails,
	roleDetails,
	subCompanyProfileDiv,
	rightProfileDiv,
	subCompanyTitle,
	flexBox
} from "@css/styles";
import { Chip } from "@mui/material";

export default function MyProfile({ details }: any) {
	return (
		<div className={profileDiv}>
			<div>
				<div className={profileImgDetails}>A</div>
			</div>
			<div className={rightProfileDiv}>
				<div>
					<div>
						<b className={roleDetails}>{details?.role}</b>
						<div>
							<b className={subCompanyTitle}>Email: </b>
							<span> {details?.email}</span>
						</div>
						<div>
							<b className={subCompanyTitle}>Company Name: </b>
							<span> {details?.company?.name}</span>
						</div>
						<div className={flexBox}>
							<b className={subCompanyTitle}>Sub Companies:</b>
							<div className={subCompanyProfileDiv}>
								<span>
									{details?.company?.sub_company.map((item1: any, index1: number) => (
										<span key={index1}>
											<Chip
												className={companyChip}
												sx={{ ml: 0.5 }}
												key={index1}
												label={<span className={menuItmeStyle}>{item1.name}</span>}
											/>
										</span>
									))}
								</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
