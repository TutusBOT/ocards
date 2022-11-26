import {
	IconButton,
	ListItem,
	ListItemButton,
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
import React, { useEffect, useState } from "react";
import { CardsList } from "../index";

const SetPreview = ({ set }: { set: Set }) => {
	const dispatch = useDispatch();
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const [openAdd, setOpenAdd] = useState(false);

	useEffect(() => {
		console.log(openAdd, "test");
	}, [openAdd]);

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

	const handleAddClick = () => {
		setOpenAdd(true);
	};

	const handleAddClose = () => {
		setOpenAdd(false);
	};

	return (
		<ListItem className="flex flex-col">
			<ListItemText>
				{set.name}
				<IconButton onClick={handleMenuClick}>
					<MoreVertIcon />
				</IconButton>
				<Menu anchorEl={anchorEl} open={open} onClose={handleMenuClose}>
					<CardsList set={set} outsideOpen={openAdd} />
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
			</ListItemText>
			<ListItemText>{set.cards.length} cards in set</ListItemText>
			<ListItemButton>PRACTICE</ListItemButton>
			<Paper
				className="absolute"
				elevation={24}
				sx={{ width: "100%", height: "100%", zIndex: "-1" }}
			/>
		</ListItem>
	);
};
export default SetPreview;
