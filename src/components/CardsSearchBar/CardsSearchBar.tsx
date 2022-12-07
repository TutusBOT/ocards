import { Input } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import React, { useEffect, useState } from "react";
import { FlashCard } from "../../redux/cards/cardsSlice";
import useSearch from "../../hooks/useSearch/useSearch";

interface CardsSearchBar {
	data: FlashCard[];
	setFilteredData: (filteredArray: FlashCard[]) => void;
}

const CardsSearchBar = ({ data, setFilteredData }: CardsSearchBar) => {
	const [value, setValue] = useState("");
	useEffect(() => {
		setFilteredData(useSearch(data, value, ["learnedRatio"]));
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
