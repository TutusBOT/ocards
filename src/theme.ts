import { createTheme } from "@mui/material";
import { blue, deepPurple, grey } from "@mui/material/colors";

export const theme = createTheme({
	palette: {
		mode: "dark",
		primary: {
			light: grey[100],
			main: grey[200],
		},
		secondary: {
			main: blue["800"],
			light: blue["600"],
		},
	},
});
