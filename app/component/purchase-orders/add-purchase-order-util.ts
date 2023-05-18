const getProductListFromRating = (productWithRateData: any) => {
	const productListFromRatingData: any = [];
	const productListFromRating = productWithRateData?.map((item: any) => {
		productListFromRatingData?.push(item);
	});
	return productListFromRatingData;
};

const getProductCoatingList = (productWithRateData: any[], id: string): any => {
	const productCoatingList: any = [];
	const findProduct = productWithRateData?.find((item) => item?.id === id);
	const productCoatingListData = findProduct?.rate?.map((item: any) => {
		productCoatingList?.push({ name: item?.coating_type?.type, id: item?.coatingId });
	});
	return productCoatingList ? productCoatingList : [];
};

const getProductLength = (productWithRateData: any[], id: string): any => {
	const findProduct = productWithRateData?.find((item) => item?.id === id);
	return findProduct?.length;
};

const getCoatingColorList = (productWithRateData: any[], id: string, coatingId: string): any => {
	const coatingColorList: any = [];
	const findProduct = productWithRateData?.find((item) => item?.id === id);
	const findCoating = findProduct?.rate?.find((item: any) => item?.coatingId === coatingId);
	const coatingColorListData = findCoating?.coating_type.colors?.map((item: any) => {
		coatingColorList?.push({ name: item?.color, id: item?.id });
	});
	return coatingColorList ? coatingColorList : [];
};

export { getProductListFromRating, getProductCoatingList, getCoatingColorList, getProductLength };
