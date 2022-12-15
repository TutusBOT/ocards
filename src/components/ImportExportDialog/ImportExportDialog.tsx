import {
	Dialog,
	AppBar,
	Toolbar,
	Typography,
	IconButton,
	Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";
import { useDispatch } from "react-redux";
import { cardsActions, FlashCard } from "../../redux/cards/cardsSlice";
import { useState } from "react";
import useGenerateId from "../../hooks/useGenerateId/userGenerateId";

interface ImportExportDialog {
	variant: "import" | "export";
	open: boolean;
	handleClose: () => void;
	setName: string;
	exportedCards?: string[];
}

const ImportExportDialog = ({
	variant,
	open,
	handleClose,
	setName,
	exportedCards,
}: ImportExportDialog) => {
	const dispatch = useDispatch();
	const [cards, setCards] = useState("");

	const handleExportCopy = () => {
		if (exportedCards) navigator.clipboard.writeText(exportedCards.join("\n"));
	};

	const handleImport = () => {
		const importedCards: FlashCard[] = cards.split("\n").map((card) => {
			const splittedCard = card.split(",");
			return {
				id: useGenerateId(),
				front: splittedCard[0],
				back: splittedCard[1],
				learnedRatio: 0,
			};
		});
		dispatch(cardsActions.addCards({ name: setName, cards: importedCards }));
		handleClose();
	};

	return (
		<Dialog open={open} onClose={handleClose} fullWidth>
			<AppBar className="relative">
				<Toolbar className="justify-between">
					<Typography variant="h5">
						{variant === "import" ? "Import" : "Exported"} cards
					</Typography>
					<IconButton onClick={handleClose}>
						<CloseIcon />
					</IconButton>
				</Toolbar>
			</AppBar>
			{exportedCards ? (
				<div className="max-h-[70%] overflow-auto ml-6 mt-4">
					{exportedCards.map((card) => {
						return <Typography key={card}>{card}</Typography>;
					})}
				</div>
			) : (
				<TextField
					label="Cards as CSV"
					multiline
					value={cards}
					onChange={(e) => setCards(e.target.value)}
					className="m-4"
				/>
			)}
			<Button
				className="max-w-min self-center mb-2"
				variant="contained"
				onClick={variant === "import" ? handleImport : handleExportCopy}
			>
				{variant === "import" ? "IMPORT" : "COPY"}
			</Button>
		</Dialog>
	);
};
export default ImportExportDialog;
