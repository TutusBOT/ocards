import {
	AppBar,
	Dialog,
	Grid,
	IconButton,
	Slide,
	Toolbar,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { FlashCard } from "../../redux/cards/cardsSlice";
import { AddCards, CardPreview, SearchBar } from "../index";
import { useSelector } from "react-redux";
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
	const [set] = useSelector((state: RootState) =>
		state.persistedReducer.cards.sets.filter((set) => set.name === setName)
	);
	const [filteredCards, setFilteredCards] = useState<FlashCard[]>([]);

	const handleFilter = (cards: FlashCard[]) => {
		setFilteredCards(cards);
	};

	useEffect(() => {
		setFilteredCards(set.cards);
	}, [set]);

	return (
		<Dialog
			fullScreen
			open={open}
			onClose={handleClose}
			TransitionComponent={Transition}
		>
			<AppBar className="relative">
				<Toolbar className="justify-between">
					<AddCards setName={set.name} />
					<SearchBar data={set.cards} setFilteredData={handleFilter} />
					<IconButton onClick={handleClose}>
						<CloseIcon />
					</IconButton>
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
