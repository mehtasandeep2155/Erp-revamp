import { useRouter } from "next/router";
import { MutationCache, QueryCache } from "react-query";
import { login } from "@component/utils/routes";
import { SuccessAlert } from "@common/toastify";
import Swal from "sweetalert2";

export default function useNavbar(handleToggle: any) {
	const mutationCache = new MutationCache({
		onError: (error) => {},
		onSuccess: (data) => {}
	});
	const queryCache = new QueryCache({
		onError: (error) => {},
		onSuccess: (data) => {}
	});
	const { push, pathname } = useRouter();

	const handleLogOut = () => {
		handleToggle("logout");
		Swal.fire({
			title: "",
			text: "Please wait..",
			didOpen: () => {
				Swal.showLoading();
			}
		});
		localStorage.clear();
		mutationCache.clear();
		queryCache.clear();
		push(login);
		SuccessAlert("LogOut Successfully!");
	};

	return { handleLogOut, push, pathname };
}
