import { List, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import SetPreview from "../SetPreview/SetPreview";

const SetList = () => {
	const sets = useSelector(
		(state: RootState) => state.persistedReducer.cards.sets
	);

	return (
		<List className="flex flex-wrap justify-center gap-6 py-8">
			{sets.length ? (
				sets.map((set, i) => <SetPreview set={set} key={i} />)
			) : (
				<Typography variant="h3">
					You don&apos;t have any sets created yet. <br />
				</Typography>
			)}
		</List>
	);
};
export default SetList;
