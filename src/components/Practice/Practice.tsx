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
import React, { useEffect } from "react";
import { useState } from "react";
import { FlashCard, Set } from "../../redux/cards/cardsSlice";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { practiceActions } from "../../redux/practice/practiceSlice";

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
	const dispatch = useDispatch();
	const [open, setOpen] = useState(false);
	const [showAnswer, setShowAnswer] = useState(false);
	const [answer, setAnswer] = useState("");
	const [isAnswered, setIsAnswered] = useState(false);
	const [isAnswerCorrect, setIsAnswerCorrect] = useState<null | boolean>(null);
	const [set] = useSelector((state: RootState) =>
		state.persistedReducer.cards.sets.filter((set) => set.name === setName)
	);
	const reviewSet = useSelector(
		(state: RootState) => state.persistedReducer.practice.cards
	);

	useEffect(() => {
		if (!reviewSet.length) {
			dispatch(
				practiceActions.setPractice(
					set.cards.sort((a, b) => 0.5 - Math.random())
				)
			);
		}
	}, []);

	const handleClose = () => {
		setOpen(false);
	};

	const handleOpen = () => {
		setOpen(true);
	};

	const handleShowAnswer = () => {
		setShowAnswer(!showAnswer);
	};

	const handleGuess = () => {
		setIsAnswered(true);
		setShowAnswer(true);
		if (answer === reviewSet[0].back) {
			setIsAnswerCorrect(true);
		} else {
			setIsAnswerCorrect(false);
		}
	};

	const handleSetAsCorrect = () => {
		setIsAnswerCorrect(true);
	};

	const handleNextAnswer = () => {
		dispatch(practiceActions.setPractice(reviewSet.slice(1)));
		setIsAnswered(false);
		setAnswer("");
		setShowAnswer(false);
		setIsAnswerCorrect(null);
	};

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
					<Grid
						container
						spacing={4}
						justifyContent="center"
						direction="column"
						alignContent="center"
					>
						<Grid item sm={12}>
							<Typography variant="h4" align="center">
								{reviewSet[0].front}
							</Typography>
						</Grid>
						<Grid
							item
							sm={12}
							className={!showAnswer ? "opacity-0 select-none" : ""}
						>
							<Typography align="center">{reviewSet[0].back}</Typography>
						</Grid>
						<Grid item sm={12}>
							<TextField
								variant="outlined"
								value={answer}
								onChange={(e) => setAnswer(e.target.value)}
								focused={isAnswered}
								color={
									isAnswerCorrect !== null
										? isAnswerCorrect
											? "success"
											: "error"
										: "primary"
								}
							/>
						</Grid>
						<Grid item sm={12}>
							{!isAnswered ? (
								<>
									<Button variant="outlined" onClick={handleShowAnswer}>
										SHOW ANSWER
									</Button>
									<Button variant="contained" onClick={handleGuess}>
										SUBMIT
									</Button>
								</>
							) : (
								<>
									<Button variant="outlined" onClick={handleSetAsCorrect}>
										SET AS CORRECT
									</Button>
									<Button variant="contained" onClick={handleNextAnswer}>
										NEXT
									</Button>
								</>
							)}
						</Grid>
					</Grid>
				</Card>
			</Dialog>
		</>
	);
};
export default Practice;
