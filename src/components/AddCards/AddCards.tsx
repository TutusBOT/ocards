import { Button, Dialog, TextField } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { cardsActions } from "../../redux/cards/cardsSlice";

interface AddCards {
	setName: string;
}

const AddCards = ({ setName }: AddCards) => {
	const [open, setOpen] = useState(false);
	const [term, setTerm] = useState("");
	const [definition, setDefinition] = useState("");
	const dispatch = useDispatch();

	const handleClick = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleAdd = () => {
		dispatch(
			cardsActions.addCards({
				name: setName,
				cards: [{ front: term, back: definition, learnedRatio: 0 }],
			})
		);
		setTerm("");
		setDefinition("");
	};

	return (
		<>
			<Button variant="contained" onClick={handleClick}>
				ADD
			</Button>
			<Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
				<div className="flex flex-col p-4 gap-4">
					<TextField
						label="Term (front)"
						variant="outlined"
						value={term}
						onChange={(e) => setTerm(e.target.value)}
					/>
					<TextField
						label="Definition (back)"
						variant="outlined"
						value={definition}
						onChange={(e) => setDefinition(e.target.value)}
					/>
					<Button variant="contained" onClick={handleAdd}>
						ADD CARD
					</Button>
				</div>
			</Dialog>
		</>
	);
};
export default AddCards;
