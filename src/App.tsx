import {
	createTheme,
	StyledEngineProvider,
	ThemeProvider,
} from "@mui/material";
import { useState } from "react";
import "./App.css";
import Test from "./components/test";
import { grey } from "@mui/material/colors";
import { CreateSet, SetList } from "./components";

function App() {
	const [image, setImage] = useState<any>();

	const theme = createTheme({
		palette: {
			mode: "dark",
			primary: {
				main: grey[500],
			},
			secondary: {
				main: grey[100],
			},
		},
	});

	return (
		<StyledEngineProvider injectFirst>
			<ThemeProvider theme={theme}>
				<Test file={image} />
				<SetList />
				<CreateSet />
			</ThemeProvider>
		</StyledEngineProvider>
	);
}

export default App;
