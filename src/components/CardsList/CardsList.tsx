import {
	AppBar,
	Button,
	Dialog,
	Grid,
	Icon,
	IconButton,
	List,
	MenuItem,
	Slide,
	Toolbar,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { Set } from "../../redux/cards/cardsSlice";
import { AddCards, CardPreview } from "../index";

const Transition = React.forwardRef(function Transition(
	props: TransitionProps & {
		children: React.ReactElement;
	},
	ref: React.Ref<unknown>
) {
	return <Slide direction="up" ref={ref} {...props} />;
});

interface CardsList {
	set: Set;
	outsideOpen: boolean;
}

const CardsList = ({ set, outsideOpen }: CardsList) => {
	const [open, setOpen] = useState<boolean>(false);

	const handleClose = () => {
		setOpen(false);
	};

	const handleClick = () => {
		setOpen(true);
	};

	return (
		<>
			<MenuItem onClick={handleClick}>
				<AddCircleOutlineIcon />
			</MenuItem>
			<Dialog
				fullScreen
				open={open}
				onClose={handleClose}
				TransitionComponent={Transition}
			>
				<AppBar className="relative">
					<Toolbar className="justify-between">
						<IconButton onClick={handleClose}>
							<CloseIcon />
						</IconButton>
						<AddCards />
					</Toolbar>
				</AppBar>
				<Grid container spacing={2}>
					{set.cards.map((card) => {
						return (
							<Grid xs={12} md={6}>
								<CardPreview card={card} />
							</Grid>
						);
					})}
				</Grid>
			</Dialog>
		</>
	);
};
export default CardsList;
