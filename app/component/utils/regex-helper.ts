const emailregex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordregex = /^(?!.*@[^,]*,)/;
const phoneRegExp =
	/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const nameRegExp = /^([A-Za-z]+ )+[A-Za-z]+$|^[A-Za-z]+$/;
const nameNumberRegExp = /^([A-Za-z0-9]+ )+[A-Za-z0-9]+$|^[A-Za-z0-0]+$/;
const priceRegExp = /^[0-9]+(,[0-9]+)*$/gm;
const replaceRegExp = /\B(?=(\d{3})+(?!\d))/g;
export { emailregex, passwordregex, phoneRegExp, nameRegExp, priceRegExp, nameNumberRegExp, replaceRegExp };
