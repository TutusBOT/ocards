import { List } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import SetPreview from "../SetPreview/SetPreview";

const SetList = () => {
	const sets = useSelector(
		(state: RootState) => state.persistedReducer.cards.sets
	);

	return (
		<List>
			{sets.length
				? sets.map((set, i) => <SetPreview set={set} key={i} />)
				: null}
		</List>
	);
};
export default SetList;
