import { Input } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import React, { useEffect, useState } from "react";
import { FlashCard } from "../../redux/cards/cardsSlice";

interface CardsSearchBar {
	data: FlashCard[];
	setFilteredData: (filteredArray: Array<any>) => void;
}

export const filterCards = (cards: FlashCard[], value: string) => {
	console.log(cards, value);
	return cards.filter(
		(card) =>
			card.front.toLowerCase().startsWith(value.toLowerCase()) ||
			card.back.toLowerCase().startsWith(value.toLowerCase())
	);
};

const CardsSearchBar = ({ data, setFilteredData }: CardsSearchBar) => {
	const [value, setValue] = useState("");
	useEffect(() => {
		// const filteredArray = data.filter(
		// 	(el) =>
		// 		el.front.toLowerCase().startsWith(value.toLowerCase()) ||
		// 		el.back.toLowerCase().startsWith(value.toLowerCase())
		// );
		setFilteredData(filterCards(data, value));
		// console.log(filteredArray);
	}, [value]);

	const handleChange = (
		val: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
	) => {
		setValue(val.target.value);
	};

	return (
		<Input
			value={value}
			onChange={handleChange}
			startAdornment={<SearchIcon />}
		/>
	);
};
export default CardsSearchBar;
