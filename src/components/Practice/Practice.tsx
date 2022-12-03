import {
	AppBar,
	Button,
	Card,
	Dialog,
	Grid,
	IconButton,
	Input,
	Slide,
	TextField,
	Toolbar,
	Typography,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import React from "react";
import { useState } from "react";
import { FlashCard, Set } from "../../redux/cards/cardsSlice";
import CloseIcon from "@mui/icons-material/Close";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const Transition = React.forwardRef(function Transition(
	props: TransitionProps & {
		children: React.ReactElement;
	},
	ref: React.Ref<unknown>
) {
	return <Slide direction="up" ref={ref} {...props} />;
});

interface Practice {
	setName: string;
}

const Practice = ({ setName }: Practice) => {
	const [open, setOpen] = useState(false);
	const [set] = useSelector((state: RootState) =>
		state.persistedReducer.cards.sets.filter((set) => set.name === setName)
	);
	const [reviewSet, setReviewSet] = useState<FlashCard[]>(
		set.cards.sort((a, b) => 0.5 - Math.random())
	);
	const [guess, setGuess] = useState("");
	const [showAnswer, setShowAnswer] = useState(false);

	const handleClose = () => {
		setOpen(false);
	};

	const handleOpen = () => {
		setOpen(true);
	};

	const handleShowAnswer = () => {
		setShowAnswer(!showAnswer);
	};

	const handleGuess = () => {};

	return (
		<>
			<Button onClick={handleOpen}>REVIEW</Button>
			<Dialog
				open={open}
				fullScreen
				TransitionComponent={Transition}
				onClose={handleClose}
			>
				<AppBar className="relative">
					<Toolbar>
						<IconButton onClick={handleClose}>
							<CloseIcon />
						</IconButton>
					</Toolbar>
				</AppBar>
				<Card className=" h-full bg-purple-900 m-4">
					<Grid container spacing={4}>
						<Grid item sm={12}>
							<Typography variant="h4">{reviewSet[0].front}</Typography>
						</Grid>
						<Grid item sm={12} className={showAnswer ? "" : "hidden"}>
							<Typography>{reviewSet[0].back}</Typography>
						</Grid>
						<Grid item sm={12}>
							<TextField
								variant="outlined"
								value={guess}
								onChange={(e) => setGuess(e.target.value)}
							/>
						</Grid>
						<Grid item sm={12}>
							<Button variant="outlined" onClick={handleShowAnswer}>
								SHOW ANSWER
							</Button>
							<Button variant="contained" onClick={handleGuess}>
								SUBMIT
							</Button>
						</Grid>
					</Grid>
				</Card>
			</Dialog>
		</>
	);
};
export default Practice;
