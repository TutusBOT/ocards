import EditIcon from "@mui/icons-material/Edit";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteIcon from "@mui/icons-material/Delete";
import {
	Button,
	Card,
	CardContent,
	Dialog,
	IconButton,
	Menu,
	MenuItem,
	TextField,
	Typography,
} from "@mui/material";
import { useRef, useState } from "react";
import { cardsActions, FlashCard } from "../../redux/cards/cardsSlice";
import { useDispatch } from "react-redux";

interface CardPreview {
	card: FlashCard;
	setName: string;
}

const CardPreview = ({ card, setName }: CardPreview) => {
	const dispatch = useDispatch();
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const [openEdit, setOpenEdit] = useState(false);
	const [term, setTerm] = useState(card.front);
	const [definition, setDefinition] = useState(card.back);
	const editCardRef = useRef<HTMLInputElement>(null);

	const handleMenuClick = (e: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(e.currentTarget);
	};

	const handleMenuClose = () => {
		setAnchorEl(null);
	};

	const handleDelete = () => {
		dispatch(cardsActions.deleteCard({ name: setName, id: card.id }));
		handleEditClose();
		handleMenuClose();
	};

	const handleEdit = () => {
		dispatch(
			cardsActions.editCard({
				name: setName,
				id: card.id,
				editedCard: {
					id: card.id,
					front: term,
					back: definition,
					learnedRatio: card.learnedRatio,
				},
			})
		);
		handleEditClose();
	};

	const handleEditOpen = () => {
		setOpenEdit(true);
	};

	const handleEditClose = () => {
		setOpenEdit(false);
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
					<MenuItem onClick={handleEditOpen} className="gap-1">
						<EditIcon />
						<Typography>Edit</Typography>
					</MenuItem>
					<MenuItem onClick={handleDelete} className="gap-1">
						<DeleteIcon />
						<Typography>Delete</Typography>
					</MenuItem>
				</Menu>
				<Dialog
					open={openEdit}
					onClose={handleEditClose}
					fullWidth
					maxWidth="sm"
				>
					<div className="flex flex-col p-4 gap-4">
						<TextField
							label="Term (front)"
							variant="outlined"
							value={term}
							onChange={(e) => setTerm(e.target.value)}
							inputRef={editCardRef}
						/>
						<TextField
							label="Definition (back)"
							variant="outlined"
							value={definition}
							onChange={(e) => setDefinition(e.target.value)}
						/>
						<Button variant="contained" onClick={handleEdit}>
							EDIT CARD
						</Button>
					</div>
				</Dialog>
				<Typography variant="body1" className="overflow-hidden text-ellipsis">
					{card.back}
				</Typography>
			</CardContent>
		</Card>
	);
};
export default CardPreview;
