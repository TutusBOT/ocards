import { Input } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useState } from "react";

interface SearchBar {
	data: Array<any>;
	setFilteredData: (filteredArray: Array<any>) => void;
}

const SearchBar = ({ data, setFilteredData }: SearchBar) => {
	const [value, setValue] = useState("");
	useEffect(() => {
		setFilteredData(
			data.filter((el) => {
				Object.values(el).forEach((elValue) => {
					if (elValue === value) {
						return el;
					}
				});
			})
		);
	}, [data]);

	return (
		<Input
			value={value}
			onChange={(e) => setValue(e.target.value)}
			startAdornment={<SearchIcon />}
		/>
	);
};
export default SearchBar;
