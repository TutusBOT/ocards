import { Card, CardContent, Typography } from "@mui/material";
import { FlashCard } from "../../redux/cards/cardsSlice";

const CardPreview = ({ card }: { card: FlashCard }) => {
	return (
		<Card>
			<CardContent>
				<Typography variant="h5">{card.front}</Typography>
				<Typography>{card.back}</Typography>
			</CardContent>
		</Card>
	);
};
export default CardPreview;
