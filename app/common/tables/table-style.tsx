import { createTheme } from "@mui/material/styles";
export const getMuiTheme = () =>
	createTheme({
		components: {
			MuiTableCell: {
				styleOverrides: {
					root: {
						paddingLeft: "15px"
					}
				}
			}
		}
	});
