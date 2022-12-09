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
import { FlashCard, Set } from "../../redux/cards/cardsSlice";
import { AddCards, CardPreview, SearchBar } from "../index";
import { shallowEqual, useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const Transition = React.forwardRef(function Transition(
	props: TransitionProps & {
		children: React.ReactElement;
	},
	ref: React.Ref<unknown>
) {
	return <Slide direction="up" ref={ref} {...props} />;
});

interface CardsList {
	setName: string;
	open: boolean;
	handleClose: () => void;
}

const CardsList = ({ setName, open, handleClose }: CardsList) => {
	const set = useSelector(
		(state: RootState) =>
			state.persistedReducer.cards.sets.filter(
				(set) => set.name === setName
			)[0],
		shallowEqual
	);
	const [filteredCards, setFilteredCards] = useState(set.cards);

	const handleFilter = (cards: FlashCard[]) => {
		setFilteredCards(cards);
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
					<SearchBar data={set.cards} setFilteredData={handleFilter} />
					<AddCards setName={set.name} />
				</Toolbar>
			</AppBar>
			<Grid container spacing={2}>
				{filteredCards.map((card, i) => {
					return (
						<Grid item xs={12} sm={6} md={4} key={i}>
							<CardPreview card={card} setName={set.name} />
						</Grid>
					);
				})}
			</Grid>
		</Dialog>
	);
};
export default CardsList;
