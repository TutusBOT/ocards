import { StyledEngineProvider, ThemeProvider } from "@mui/material";
import "./App.css";
import { CreateSet, SetList } from "./components";
import { theme } from "./theme";

function App() {
	return (
		<StyledEngineProvider injectFirst>
			<ThemeProvider theme={theme}>
				<div className="w-screen h-screen fixed bg-gray-500 top-0 left-0"></div>
				<SetList />
				<CreateSet />
			</ThemeProvider>
		</StyledEngineProvider>
	);
}

export default App;
