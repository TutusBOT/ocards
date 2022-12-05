import EditIcon from "@mui/icons-material/Edit";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteIcon from "@mui/icons-material/Delete";
import {
	Card,
	CardContent,
	IconButton,
	Menu,
	MenuItem,
	Typography,
} from "@mui/material";
import { useState } from "react";
import { cardsActions, FlashCard } from "../../redux/cards/cardsSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";

interface CardPreview {
	card: FlashCard;
	setName: string;
}

const CardPreview = ({ card, setName }: CardPreview) => {
	const dispatch = useDispatch();
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);

	const handleMenuClick = (e: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(e.currentTarget);
	};

	const handleMenuClose = () => {
		setAnchorEl(null);
	};

	const handleDelete = () => {
		dispatch(cardsActions.deleteCard({ card: card, name: setName }));
		handleMenuClose();
	};

	const handleEdit = () => {
		dispatch(
			cardsActions.editCard({
				name: setName,
				card: card,
				editedCard: { front: "edytowane", back: "również", learnedRatio: 0 },
			})
		);
	};

	return (
		<Card>
			<CardContent>
				<div className="flex justify-between align-middle">
					<Typography variant="h5" className=" overflow-hidden text-ellipsis">
						{card.front}
					</Typography>
					<IconButton onClick={handleMenuClick}>
						<MoreVertIcon />
					</IconButton>
				</div>
				<Menu open={open} anchorEl={anchorEl} onClose={handleMenuClose}>
					<MenuItem onClick={handleEdit}>
						<EditIcon />
					</MenuItem>
					<MenuItem onClick={handleDelete}>
						<DeleteIcon />
					</MenuItem>
				</Menu>
				<Typography variant="body1" className="overflow-hidden text-ellipsis">
					{card.back}
				</Typography>
			</CardContent>
		</Card>
	);
};
export default CardPreview;
