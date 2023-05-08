import { pelorous, white } from "./color-palette";

interface colorProps {
	textColor: string;
	themeColor: string;
	bodyColor: string;
	cardColor: string;
	iconColor: string;
	tableColor: string;
	border: string;
	navBorder: string;
	heading: string;
}

export const lightMode: colorProps = {
	textColor: "black",
	heading: "black",
	themeColor: pelorous,
	bodyColor: "#f3f6f9",
	cardColor: "#f3f6f9",
	iconColor: "#b4bcc8",
	tableColor: white,
	border: "#b4bcc8",
	navBorder: "#b4bcc8"
};

export const darkMode: colorProps = {
	textColor: white,
	heading: white,
	themeColor: pelorous,
	bodyColor: "black",
	cardColor: "black",
	iconColor: white,
	tableColor: "#333335",
	border: "#b4bcc8",
	navBorder: "#b4bcc8"
};
