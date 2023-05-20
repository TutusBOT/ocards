import { Input } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import React, { useEffect, useState } from "react";
import { FlashCard } from "../../redux/cards/cardsSlice";

interface CardsSearchBar {
	data: FlashCard[];
	setFilteredData: (filteredArray: FlashCard[]) => void;
}

const handleSearch = (
	cards: FlashCard[],
	searchedValue: string,
	setFilteredData: (value: FlashCard[]) => void
) => {
	const filteredArray = cards.filter((card) => {
		return (
			card.front.toLowerCase().startsWith(searchedValue.toLowerCase()) ||
			card.back.toLowerCase().startsWith(searchedValue.toLowerCase())
		);
	});
	setFilteredData(filteredArray);
};

const CardsSearchBar = ({ data, setFilteredData }: CardsSearchBar) => {
	const [value, setValue] = useState("");
	useEffect(() => {
		handleSearch(data, value, setFilteredData);
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
