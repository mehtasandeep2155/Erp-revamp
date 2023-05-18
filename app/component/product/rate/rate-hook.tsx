import axios from "axios";
import { useMutation } from "react-query";
import { Close, Delete, Edit } from "@mui/icons-material";
import { detailsViewBut, flex, deleteBut, editIcon } from "css/styles";
import { productRateValues, productValues } from "@component/utils/form/initial-values";
import { productRate } from "@api/network";
import { baseUrlProduct } from "@api/base-url";
import { useState } from "react";
import { DeleteAlert, FailureAlert, LoadingAlert, SuccessAlert } from "@common/toastify";
import { rateColums } from "@component/utils/form/constant";
import Swal from "sweetalert2";
import { getRate, getType, getProduct } from "@api/get-api-queries";
import { useRouter } from "next/router";
import { variantDetails } from "@component/utils/routes";

export default function useRate() {
	const [menu, setMenu] = useState(false);
	const [fetchagain, setFetchAgain] = useState(false);
	const [productVariantlist, setProductVariantlist] = useState([]);

	const [loader, setLoader] = useState(false);
	const [page, setPage] = useState(1);
	const [rowsPerPage, setRowsPerPage] = useState(5);
	const handleChangePage = (event: any, newPage: any) => {
		setPage(newPage);
	};
	const handleChangeRowsPerPage = (event: any) => {
		setRowsPerPage(event.target.value);
	};
	const { rates } = getRate(page, rowsPerPage);

	const { push } = useRouter();

	const handleOnClick = (currentRowsSelected: any, allRowsSelected: any, setFieldValue: any) => {
		setFieldValue(["productId"], productVariantlist[allRowsSelected].name);
	};

	const handleView = (item: any) => {
		let path: any = {
			pathname: `${variantDetails}`,
			query: { id: item.id }
		};
		push(path);
	};

	const columns = rateColums;
	const [tableData, setTableData] = useState();
	const [tableInnerData, setTableInnerData] = useState();
	const [rateValue, setRateValue] = useState(productRateValues);

	const mutationEdit = useMutation(
		(createPorductRate: any) => {
			LoadingAlert();
			return axios.patch(baseUrlProduct + `${productRate}/${createPorductRate.id}`, createPorductRate.value);
		},
		{
			onSuccess: () => {
				Swal.close();
				SuccessAlert("Saved Changes SuccessFully!");
				rates.refetch();
				setFetchAgain(true);
			},
			onError: (error) => {
				Swal.close();
				let errorMsg: any = error;
				FailureAlert(errorMsg.response.data.message);
				setLoader(false);
			}
		}
	);

	const mutationDelete = useMutation(
		(createCompany: any) => {
			LoadingAlert();
			return axios.delete(baseUrlProduct + `${productRate}/${createCompany.id}`);
		},
		{
			onSuccess: () => {
				Swal.close();
				SuccessAlert("Deleted SuccessFully!");
				rates.refetch();
				setFetchAgain(true);
			},
			onError: (error) => {
				Swal.close();
				let errorMsg: any = error;
				FailureAlert(errorMsg.response.data.message);
			}
		}
	);

	return {
		fetchagain,
		menu,
		rateValue,
		columns,
		productVariantlist,
		loader,
		handleView,
		tableInnerData,
		handleChangePage,
		handleChangeRowsPerPage,
		page,
		rowsPerPage,
		handleOnClick
	};
}
