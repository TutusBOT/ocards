import { Button, List, ListItem } from "@mui/material";
import { FlashCard } from "../../redux/cards/cardsSlice";
import DeleteIcon from "@mui/icons-material/Delete";

interface PhotoCardsListProps {
	photoCards: FlashCard[];
	setPhotoCards: (value: FlashCard[]) => void;
}

const PhotoCardsList = ({ photoCards, setPhotoCards }: PhotoCardsListProps) => {
	const handleDelete = (cardToDelete: FlashCard) => {
		setPhotoCards(
			photoCards.filter((card) => {
				return (
					card.front !== cardToDelete.front || card.back !== cardToDelete.back
				);
			})
		);
	};

	return (
		<List>
			{photoCards.map((card) => (
				<ListItem key={card.id} className="grid grid-cols-3">
					<div>
						Term: <strong>{card.front}</strong>
					</div>
					<div>
						Definition: <strong>{card.back}</strong>
					</div>
					<div>
						<Button onClick={() => handleDelete(card)}>
							<DeleteIcon />
						</Button>
					</div>
				</ListItem>
			))}
		</List>
	);
};
export default PhotoCardsList;
