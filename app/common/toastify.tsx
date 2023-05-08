import { toastifyCancel, toastifyConfirm } from "@css/color-palette";
import Swal from "sweetalert2";
export function SuccessAlert(message: string) {
	Swal.fire({ title: "Success", timer: 1500, icon: "success", text: message });
}

export function FailureAlert(message: string) {
	Swal.fire({
		title: "Failed",
		icon: "error",
		text: message
	});
}

export function LoadingAlert() {
	Swal.fire({
		title: "",
		text: "Please wait..",
		didOpen: () => {
			Swal.showLoading();
		}
	});
}

export function DeleteAlert(mutationDelete: any, id: any) {
	Swal.fire({
		title: "Are you sure?",
		text: "You won't be able to revert this!",
		icon: "warning",
		showCancelButton: true,
		confirmButtonColor: toastifyConfirm,
		cancelButtonColor: toastifyCancel,
		confirmButtonText: "Yes, delete it!"
	}).then((result) => {
		if (result.isConfirmed) {
			mutationDelete.mutate({ id: id });
		}
	});
}
