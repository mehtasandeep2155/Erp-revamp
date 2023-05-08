import { headerAdd } from "@css/styles";
export const AddHeader = ({ title }: any) => {
	return (
		<div className={headerAdd}>
			<h4>{title}</h4>
		</div>
	);
};
