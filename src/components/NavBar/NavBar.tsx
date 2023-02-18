import { Link, Typography } from "@mui/material";

const NavBar = () => {
	return (
		<header className="w-full">
			<nav className="w-full flex justify-between">
				<Typography variant="h5">OCaRds</Typography>
				<div className="flex gap-2 sm:gap-4">
					<Link variant="h5" href="#home" color="secondary.light">
						HOME
					</Link>
					<Link variant="h5" href="#cards" color="secondary.light">
						CARDS
					</Link>
					<Link variant="h5" className="cursor-pointer" color="secondary.light">
						HELP
					</Link>
				</div>
			</nav>
		</header>
	);
};
export default NavBar;
