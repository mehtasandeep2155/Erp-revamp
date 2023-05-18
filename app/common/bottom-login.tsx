import { bottomDiv, textRegister } from "@component/auth/login/styles";
import { useRouter } from "next/router";

export default function BottomLoginDiv(props: any) {
	const { title, route, routeText } = props;
	const { push } = useRouter();
	return (
		<div className={bottomDiv}>
			{routeText !== "Register" && (
				<>
					<span>{title}</span>
					<h4 className={textRegister}>
						<a
							onClick={() => {
								push(route);
							}}
						>
							{routeText}
						</a>
					</h4>
				</>
			)}
		</div>
	);
}
