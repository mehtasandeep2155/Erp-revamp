import { baseUrl } from "@api/base-url";
import { useState } from "react";
import { signIn, signUp, forgettPass } from "@api/network";
import {
	handleSubmitLoginProps,
	handleSubmitSignUpProps,
	handleSubmitForgettpasswordProps,
	handleSubmitResetPasswordProps
} from "@component/utils/type/interfaces";
import { useRouter } from "next/router";
import { SuccessAlert, FailureAlert, LoadingAlert } from "@common/toastify";
import { dashboard, login, productColorList, resetPassword } from "@component/utils/routes";
import axios from "axios";
import { useMutation } from "react-query";
import Swal from "sweetalert2";

export default function useSubmit() {
	const { push } = useRouter();
	const [loader, setLoader] = useState(false);
	const mutationLogin = useMutation(
		(details: any) => {
			LoadingAlert();
			return axios.post(details.url + details.api, details.data);
		},
		{
			onSuccess: (data) => {
				if (data.data.user.role !== "Admin" && data.data.user.role !== "SuperAdmin") {
					if (data.data.user.verified) {
						localStorage.setItem("userdata", JSON.stringify(data.data));
						push(productColorList);
						Swal.close();
						SuccessAlert("Login SuccessFully");
					} else {
						Swal.fire({ title: "Can't Login", text: "Your Verification Is Pending!", icon: "error" });
					}
				} else {
					localStorage.setItem("userdata", JSON.stringify(data.data));
					push(dashboard);
					Swal.close();
					SuccessAlert("Login SuccessFully");
				}
			},
			onError: (error) => {
				Swal.close();
				let errorMsg: any = error;
				setLoader(false);
				FailureAlert(errorMsg.response.data.message);
			}
		}
	);

	const mutationForgotPass = useMutation(
		(details: any) => {
			LoadingAlert();
			return axios.patch(details.url + details.api, details.data);
		},
		{
			onSuccess: (data) => {
				push(resetPassword);
				setLoader(false);
				Swal.close();
				SuccessAlert(data.data);
			},
			onError: (error) => {
				Swal.close();
				let errorMsg: any = error;
				FailureAlert(errorMsg.response.data.message);
				setLoader(false);
			}
		}
	);

	const mutationSignUp = useMutation(
		(details: any) => {
			LoadingAlert();
			setLoader(true);
			return axios.post(details.url + details.api, details.data);
		},
		{
			onSuccess: (data) => {
				push(login);
				setLoader(false);
				Swal.close();
				SuccessAlert("SignUp SuccessFully Please Login");
			},
			onError: (error) => {
				Swal.close();
				let errorMsg: any = error;
				FailureAlert(errorMsg.response.data.message);
				setLoader(false);
			}
		}
	);

	const mutationResetPassword = useMutation(
		(details: any) => {
			LoadingAlert();
			setLoader(true);
			return axios.post(details.url + details.api, details.data);
		},
		{
			onSuccess: (data) => {
				push(login);
				setLoader(false);
				Swal.close();
				SuccessAlert("SignUp SuccessFully Please Login");
			},
			onError: (error) => {
				Swal.close();
				let errorMsg: any = error;
				FailureAlert(errorMsg.response.data.message);
				setLoader(false);
			}
		}
	);

	const handleSubmitSignUp = async (values: handleSubmitSignUpProps) => {
		let details = {
			email: values.email,
			password: values.password,
			company_name: values.companyName,
			name: values.name
		};
		setLoader(true);
		mutationSignUp.mutate({ data: details, url: baseUrl, api: signUp });
	};

	const handleSubmitLogin = async (values: handleSubmitLoginProps) => {
		let details = {
			email: values.email,
			password: values.password
		};
		setLoader(true);
		mutationLogin.mutate({ data: details, url: baseUrl, api: signIn });
	};

	const handleSubmitForgettPassword = async (values: handleSubmitForgettpasswordProps) => {
		let details = {
			email: values.email
		};
		setLoader(true);
		mutationForgotPass.mutate({ data: details, url: baseUrl, api: forgettPass });
	};

	const handleResetPassword = async (values: handleSubmitResetPasswordProps) => {
		let details = {
			password: values.password
		};
		setLoader(true);
		//TODO
		// mutationForgotPass.mutate({ data: details, url: baseUrl, api: forgettPass });
	};

	return {
		handleSubmitLogin,
		handleSubmitSignUp,
		handleSubmitForgettPassword,
		handleResetPassword,
		loader
	};
}
