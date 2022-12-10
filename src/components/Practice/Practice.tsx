import {
	AppBar,
	Button,
	Card,
	Dialog,
	Grid,
	IconButton,
	Slide,
	TextField,
	Toolbar,
	Typography,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import React, { useEffect } from "react";
import { useState } from "react";
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
	const [isAnswerCorrect, setIsAnswerCorrect] = useState(false);
	const [set] = useSelector((state: RootState) =>
		state.persistedReducer.cards.sets.filter((set) => set.name === setName)
	);
	const { cards: reviewSet, name: reviewSetName } = useSelector(
		(state: RootState) => state.persistedReducer.practice
	);

	useEffect(() => {
		if ((reviewSetName !== setName || reviewSet.length < 1) && open) {
			const randomizedCards = [...set.cards].sort(() => 0.5 - Math.random());
			dispatch(practiceActions.setName(setName));
			dispatch(practiceActions.setPractice(randomizedCards));
		}
	}, [open]);

	const handleClose = () => {
		setOpen(false);
	};

	const handleOpen = () => {
		if (set.cards.length) {
			setOpen(true);
		}
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
		setIsAnswerCorrect(!isAnswerCorrect);
	};

	const handleNextAnswer = () => {
		dispatch(practiceActions.setPractice(reviewSet.slice(1)));
		setIsAnswered(false);
		setAnswer("");
		setShowAnswer(false);
		setIsAnswerCorrect(false);
		if (reviewSet.length === 1) {
			dispatch(practiceActions.setName(""));
			setOpen(false);
		}
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
							<Typography variant="h4" align="center" className=" break-all">
								{reviewSet.length ? reviewSet[0].front : null}
							</Typography>
						</Grid>
						<Grid
							item
							sm={12}
							className={!showAnswer ? "opacity-0 select-none" : ""}
						>
							<Typography align="center" className="break-all">
								{reviewSet.length ? reviewSet[0].back : null}
							</Typography>
						</Grid>
						<Grid item sm={12}>
							<TextField
								variant="outlined"
								value={answer}
								onChange={(e) => setAnswer(e.target.value)}
								focused={isAnswered}
								color={
									isAnswered
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
										{isAnswerCorrect ? "SET AS INCORRECT" : "SET AS CORRECT"}
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
