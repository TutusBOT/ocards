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
import PublishIcon from "@mui/icons-material/Publish";
import { useDispatch } from "react-redux";
import React, { useState } from "react";
import { CardsList, EditSet, ImportExportDialog, Practice } from "../index";
import Typography from "@mui/material/Typography";

const SetPreview = ({ set }: { set: Set }) => {
	const dispatch = useDispatch();
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const [openCardsList, setOpenCardsList] = useState(false);
	const [openEdit, setOpenEdit] = useState(false);
	const [openExport, setOpenExport] = useState(false);
	const [exportedCards, setExportedCards] = useState<string[]>([]);
	const [openImport, setOpenImport] = useState(false);

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

	const handleEditOpen = () => {
		setOpenEdit(true);
	};

	const handleEditClose = () => {
		setOpenEdit(false);
		handleMenuClose();
	};

	const handleImportOpen = () => {
		setOpenImport(true);
	};

	const handleImportClose = () => {
		setOpenImport(false);
		handleMenuClose();
	};

	const handleExportOpen = () => {
		const exportedCards = set.cards.map((card) => {
			return `${card.front},${card.back}`;
		});
		setExportedCards(exportedCards);
		setOpenExport(true);
	};

	const handleExportClose = () => {
		setOpenExport(false);
		handleMenuClose();
	};

	const handleCardsListClick = () => {
		setOpenCardsList(true);
	};

	const handleCardsListClose = () => {
		setOpenCardsList(false);
	};

	return (
		<ListItem className="flex-col max-w-xl">
			<div
				className="absolute h-full w-full cursor-pointer"
				onClick={handleCardsListClick}
			></div>
			<ListItemText className="w-full">
				<div className="flex justify-between items-center w-full">
					<Typography color="primary.light" variant="h5">
						{set.name}
					</Typography>
					<IconButton onClick={handleMenuClick}>
						<MoreVertIcon />
					</IconButton>
					<Menu anchorEl={anchorEl} open={open} onClose={handleMenuClose}>
						<MenuItem onClick={handleCardsListClick} className="gap-1">
							<AddCircleOutlineIcon />
							<Typography>Add</Typography>
						</MenuItem>
						<MenuItem onClick={handleEditOpen} className="gap-1">
							<EditIcon />
							<Typography>Edit</Typography>
						</MenuItem>
						<MenuItem onClick={handleImportOpen} className="gap-1">
							<PublishIcon />
							<Typography>Import</Typography>
						</MenuItem>
						<MenuItem onClick={handleExportOpen} className="gap-1">
							<ImportExportIcon />
							<Typography>Export</Typography>
						</MenuItem>
						<MenuItem onClick={handleDelete} className="gap-1">
							<DeleteIcon />
							<Typography>Delete</Typography>
						</MenuItem>
					</Menu>
				</div>
			</ListItemText>
			<ListItemText>
				<Typography color="primary.light">
					{set.cards.length} cards in set
				</Typography>
			</ListItemText>
			<Practice setName={set.name} />
			<CardsList
				setName={set.name}
				open={openCardsList}
				handleClose={handleCardsListClose}
			/>
			<EditSet
				cardSetName={set.name}
				handleClose={handleEditClose}
				open={openEdit}
			/>
			<ImportExportDialog
				open={openExport}
				variant="export"
				handleClose={handleExportClose}
				setName={set.name}
				exportedCards={exportedCards}
			/>
			<ImportExportDialog
				open={openImport}
				handleClose={handleImportClose}
				variant="import"
				setName={set.name}
			/>
			<Paper className="absolute h-full w-full z-[-1]" elevation={24} />
		</ListItem>
	);
};
export default SetPreview;
