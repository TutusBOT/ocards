import { Input } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import React, { useEffect, useState } from "react";

interface SearchBar {
	data: Array<Object>;
	setFilteredData: (filteredArray: Array<any>) => void;
}

const SearchBar = ({ data, setFilteredData }: SearchBar) => {
	const [value, setValue] = useState("");
	useEffect(() => {
		const filteredArray = data.filter((el) => {
			return Object.values(el).reduce((elValue: string) => {
				if (elValue.startsWith(value)) {
					return el;
				}
			});
		});
		setFilteredData(filteredArray);
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
export default SearchBar;
