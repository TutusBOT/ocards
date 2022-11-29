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
import { AddCards, CardPreview, SearchBar } from "../index";

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
	open: boolean;
	handleClose: () => void;
}

const CardsList = ({ set, open, handleClose }: CardsList) => {
	const test = (a: Array<Object>) => {
		console.log(a);
	};
	return (
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
					<SearchBar data={set.cards} setFilteredData={test} />
					<AddCards setName={set.name} />
				</Toolbar>
			</AppBar>
			<Grid container spacing={2}>
				{set.cards.map((card) => {
					return (
						<Grid item xs={12} sm={6} md={4}>
							<CardPreview card={card} setName={set.name} />
						</Grid>
					);
				})}
			</Grid>
		</Dialog>
	);
};
export default CardsList;
