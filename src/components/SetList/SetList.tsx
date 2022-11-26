import { List } from "@mui/material";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import SetPreview from "../SetPreview/SetPreview";

const SetList = () => {
	const sets = useSelector(
		(state: RootState) => state.persistedReducer.cards.sets
	);
	useEffect(() => {
		console.log(sets, "jd");
	}, []);

	return (
		<List>
			{sets.map((set, i) => (
				<SetPreview set={set} key={i} />
			))}
		</List>
	);
};
export default SetList;
