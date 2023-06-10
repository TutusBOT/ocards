import { Button, StyledEngineProvider, ThemeProvider } from "@mui/material";
import "./App.css";
import { CreateSet, Hero, SetList } from "./components";
import { theme } from "./theme";

function App() {
	return (
		<StyledEngineProvider injectFirst>
			<ThemeProvider theme={theme}>
				<div className="w-screen h-screen fixed bg-gray-100 top-0 left-0 -z-50"></div>
				<Hero />
				<div className="h-screen w-full py-16" id="cards">
					<div className="flex justify-center items-center gap-4">
						<Button variant="outlined" color="secondary" href="#home">
							Home
						</Button>
						<CreateSet />
					</div>
					<SetList />
				</div>
			</ThemeProvider>
		</StyledEngineProvider>
	);
}

export default App;
