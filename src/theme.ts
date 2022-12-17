import { createTheme } from "@mui/material";
import { deepPurple, grey } from "@mui/material/colors";

export const theme = createTheme({
	palette: {
		mode: "dark",
		primary: {
			light: grey[200],
			main: grey[300],
		},
		secondary: {
			main: deepPurple["800"],
			light: deepPurple["600"],
		},
	},
});
