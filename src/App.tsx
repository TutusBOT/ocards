import { StyledEngineProvider, ThemeProvider } from "@mui/material";
import "./App.css";
import { CreateSet, Hero, SetList, NavBar } from "./components";
import { theme } from "./theme";

function App() {
	return (
		<StyledEngineProvider injectFirst>
			<ThemeProvider theme={theme}>
				<div className="w-screen h-screen fixed bg-gray-300 top-0 left-0 -z-50"></div>
				<NavBar />
				<Hero />
				<CreateSet />
				<SetList />
			</ThemeProvider>
		</StyledEngineProvider>
	);
}

export default App;
