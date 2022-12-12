import {
	IconButton,
	ListItem,
	ListItemText,
	Menu,
	MenuItem,
	Paper,
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

const SetPreview = ({ set }: { set: Set }) => {
	const dispatch = useDispatch();
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const [openCardsList, setOpenCardsList] = useState(false);

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

	const handleExport = () => {
		handleMenuClose();
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
						<MenuItem onClick={handleExport}>
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
			<Paper className="absolute h-full w-full z-[-1]" elevation={24} />
		</ListItem>
	);
};
export default SetPreview;
