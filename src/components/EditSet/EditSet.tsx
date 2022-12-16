import CloseIcon from "@mui/icons-material/Close";
import {
	AppBar,
	Button,
	Dialog,
	IconButton,
	TextField,
	Toolbar,
	Typography,
} from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cardsActions } from "../../redux/cards/cardsSlice";
import { RootState } from "../../redux/store";

interface EditSet {
	open: boolean;
	handleClose: () => void;
	cardSetName: string;
}

const EditSet = ({ open, handleClose, cardSetName }: EditSet) => {
	const dispatch = useDispatch();
	const [set] = useSelector((state: RootState) =>
		state.persistedReducer.cards.sets.filter((set) => set.name === cardSetName)
	);
	const [name, setName] = useState(cardSetName);
	const [defLang, setDefLang] = useState(set.defLang);
	const [termLang, setTermLang] = useState(set.termLang);

	const handleEdit = () => {
		dispatch(
			cardsActions.editSet({
				name: cardSetName,
				set: { ...set, name: name, defLang: defLang, termLang: termLang },
			})
		);
		handleClose();
	};

	return (
		<Dialog open={open} onClose={handleClose} fullWidth>
			<AppBar className="relative">
				<Toolbar className="justify-between">
					<Typography variant="h4">Edit set</Typography>
					<IconButton onClick={handleClose}>
						<CloseIcon />
					</IconButton>
				</Toolbar>
			</AppBar>
			<div className="flex flex-col p-4 gap-4">
				<TextField
					value={name}
					onChange={(e) => setName(e.target.value)}
					label="Name"
				></TextField>
				<TextField
					value={termLang}
					onChange={(e) => setTermLang(e.target.value)}
					label="Term language"
				></TextField>
				<TextField
					value={defLang}
					onChange={(e) => setDefLang(e.target.value)}
					label="Definition language"
				></TextField>
				<Button variant="contained" onClick={handleEdit}>
					EDIT
				</Button>
			</div>
		</Dialog>
	);
};
export default EditSet;
