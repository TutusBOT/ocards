import {
	Button,
	Dialog,
	IconButton,
	TextField,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
} from "@mui/material";
import Close from "@mui/icons-material/Close";
import Check from "@mui/icons-material/Check";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { cardsActions } from "../../redux/cards/cardsSlice";

const CreateSet = () => {
	const dispatch = useDispatch();
	const [open, setOpen] = useState(false);
	const [name, setName] = useState("");
	const [termLang, setTermLang] = useState("");
	const [defLang, setDefLang] = useState("");

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
		setName("");
		setDefLang("");
		setTermLang("");
	};

	const handleConfirm = () => {
		dispatch(
			cardsActions.addSet({
				name: name.trim(),
				cards: [],
				termLang: termLang,
				defLang: defLang,
			})
		);
		handleClose();
	};

	return (
		<>
			<Button color="secondary" variant="contained" onClick={handleOpen}>
				CREATE SET
			</Button>
			<Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
				<div className="flex flex-col gap-4 p-4">
					<div className="flex justify-between">
						<IconButton onClick={handleConfirm}>
							<Check />
						</IconButton>
						<IconButton onClick={handleClose}>
							<Close />
						</IconButton>
					</div>
					<TextField
						label="Name"
						variant="outlined"
						value={name}
						onChange={(e) => {
							setName(e.target.value);
						}}
					></TextField>
					<FormControl>
						<InputLabel id="create-set-term-label">Term language</InputLabel>
						<Select
							label="Term language"
							labelId="create-set-term-label"
							value={termLang}
							onChange={(e) => {
								setTermLang(e.target.value);
							}}
						>
							<MenuItem value="en">English</MenuItem>
							<MenuItem value="pl">Polish</MenuItem>
						</Select>
					</FormControl>
					<FormControl>
						<InputLabel id="create-set-definition-label">
							Definition language
						</InputLabel>
						<Select
							label="Definition language"
							labelId="create-set-definition-label"
							value={defLang}
							onChange={(e) => setDefLang(e.target.value)}
						>
							<MenuItem value="en">English</MenuItem>
							<MenuItem value="pl">Polish</MenuItem>
						</Select>
					</FormControl>
				</div>
			</Dialog>
		</>
	);
};
export default CreateSet;
