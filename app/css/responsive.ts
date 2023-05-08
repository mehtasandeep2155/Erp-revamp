const Mobile = "@media only screen and (min-width: 320px) and (max-width:480px)";
const Tablets = "@media only screen and (min-width: 480px) and  (max-width:768px)";
const LaptopSmallSize = "@media only screen and (min-width: 768px) and (max-width:1024px)";
const DesktopLargeSize = "@media only screen and (min-width: 1024px) and (max-width:1200px)";
const LargeDevices = "@media only screen and (min-width: 1200px) and (max-width:1600px) ";

let mobileWidth: any = false;
let tabletWidth: any = false;
let laptopsmallSizeWidth: any = false;
let desktopLargeSizeWidth: any = false;
let largeDevices: any = false;
if (typeof window != "undefined") {
	if (window.innerWidth > 320 && window.innerWidth < 480) {
		mobileWidth = true;
	} else if (window.innerWidth > 480 && window.innerWidth < 768) {
		tabletWidth = true;
	} else if (window.innerWidth > 768 && window.innerWidth < 1024) {
		laptopsmallSizeWidth = true;
	} else if (window.innerWidth > 1024 && window.innerWidth < 1200) {
		desktopLargeSizeWidth = true;
	} else if (window.innerWidth > 1200 && window.innerWidth < 1600) {
		largeDevices = true;
	}
}
export {
	Mobile,
	Tablets,
	LaptopSmallSize,
	DesktopLargeSize,
	LargeDevices,
	mobileWidth,
	laptopsmallSizeWidth,
	tabletWidth,
	desktopLargeSizeWidth,
	largeDevices
};
