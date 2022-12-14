import {
	AppBar,
	Button,
	Dialog,
	IconButton,
	ListItem,
	ListItemText,
	Menu,
	MenuItem,
	Paper,
	Toolbar,
} from "@mui/material";
import { cardsActions, Set } from "../../redux/cards/cardsSlice";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteIcon from "@mui/icons-material/Delete";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import EditIcon from "@mui/icons-material/Edit";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useDispatch } from "react-redux";
import React, { useState } from "react";
import { CardsList, Practice } from "../index";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";

const SetPreview = ({ set }: { set: Set }) => {
	const dispatch = useDispatch();
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const [openCardsList, setOpenCardsList] = useState(false);
	const [openExport, setOpenExport] = useState(false);
	const [exportedCards, setExportedCards] = useState<string[]>([]);

	const handleMenuClick = (e: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(e.currentTarget);
	};

	const handleMenuClose = () => {
		setAnchorEl(null);
	};

	const handleDelete = () => {
		handleMenuClose();
		dispatch(cardsActions.deleteSet(set.name));
	};

	const handleExportOpen = () => {
		let exportedCards = set.cards.map((card) => {
			return `${card.front},${card.back}`;
		});
		setExportedCards(exportedCards);
		setOpenExport(true);
	};

	const handleExportClose = () => {
		setOpenExport(false);
		handleMenuClose();
	};

	const handleExportCopy = () => {
		navigator.clipboard.writeText(exportedCards.join("\n"));
	};

	const handleEdit = () => {
		handleMenuClose();
	};

	const handleCardsListClick = () => {
		setOpenCardsList(true);
	};

	const handleCardsListClose = () => {
		setOpenCardsList(false);
	};

	return (
		<ListItem className="flex-col">
			<div
				className="absolute h-full w-full cursor-pointer"
				onClick={handleCardsListClick}
			></div>
			<ListItemText className="w-full">
				<div className="flex justify-between items-center w-full">
					<Typography variant="h5">{set.name}</Typography>
					<IconButton onClick={handleMenuClick}>
						<MoreVertIcon />
					</IconButton>
					<Menu
						anchorEl={anchorEl}
						open={open}
						onClose={handleMenuClose}
						className="-ml-2"
					>
						<MenuItem onClick={handleCardsListClick}>
							<AddCircleOutlineIcon />
						</MenuItem>
						<MenuItem onClick={handleEdit}>
							<EditIcon />
						</MenuItem>
						<MenuItem onClick={handleExportOpen}>
							<ImportExportIcon />
						</MenuItem>
						<MenuItem onClick={handleDelete}>
							<DeleteIcon />
						</MenuItem>
					</Menu>
				</div>
			</ListItemText>
			<ListItemText>{set.cards.length} cards in set</ListItemText>
			<Practice setName={set.name} />
			<CardsList
				setName={set.name}
				open={openCardsList}
				handleClose={handleCardsListClose}
			/>
			<Dialog open={openExport} onClose={handleExportClose} fullWidth>
				<AppBar className="relative">
					<Toolbar className="justify-between">
						<Typography variant="h5">Exported cards</Typography>
						<IconButton onClick={handleExportClose}>
							<CloseIcon />
						</IconButton>
					</Toolbar>
				</AppBar>
				{exportedCards.map((card) => {
					return <Typography key={card}>{card}</Typography>;
				})}
				<Button
					className="max-w-min self-center mb-2"
					variant="contained"
					onClick={handleExportCopy}
				>
					COPY
				</Button>
			</Dialog>
			<Paper className="absolute h-full w-full z-[-1]" elevation={24} />
		</ListItem>
	);
};
export default SetPreview;
