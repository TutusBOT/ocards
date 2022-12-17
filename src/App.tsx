import {
	createTheme,
	StyledEngineProvider,
	ThemeProvider,
} from "@mui/material";
import { useState } from "react";
import "./App.css";
import Test from "./components/test";
import { CreateSet, SetList } from "./components";
import { theme } from "./theme";

function App() {
	const [image, setImage] = useState<any>();

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
