import { Link, Typography } from "@mui/material";

const NavBar = () => {
	return (
		<header className="w-full fixed top-0 left-0 shadow-lg z-50">
			<nav className="w-full flex justify-between bg-slate-50 py-4">
				<Typography variant="h5" className="pl-4">
					OCaRds
				</Typography>
				<div className="flex gap-2 sm:gap-4 pr-4">
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
