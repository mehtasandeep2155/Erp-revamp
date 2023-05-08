function arrayEquals(a: any[], b: string | any[]) {
	return (
		Array.isArray(a) &&
		Array.isArray(b) &&
		a.length === b.length &&
		a.every((val, index) => {
			return val.updatedAt === b[index].updatedAt;
		})
	);
}

export function companyPropsAreEqual(prevCompany: any, nextCompany: any) {
	return arrayEquals(prevCompany.allComapnyList, nextCompany.allComapnyList);
}

export function subCompanyPropsAreEqual(prevSubCompany: any, nextSubCompany: any) {
	return prevSubCompany.loading === nextSubCompany.loading;
}
