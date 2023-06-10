import { createTheme } from "@mui/material";
import { blue, grey } from "@mui/material/colors";

export const theme = createTheme({
	palette: {
		mode: "dark",
		primary: {
			light: grey[100],
			main: grey[200],
		},
		secondary: {
			main: blue["600"],
			light: blue["400"],
		},
	},
});
