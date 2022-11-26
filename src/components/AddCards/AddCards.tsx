import { Button, Dialog } from "@mui/material";
import { useState } from "react";

const AddCards = () => {
	const [open, setOpen] = useState(false);

	const handleClick = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<>
			<Button variant="contained" onClick={handleClick}>
				ADD
			</Button>
			<Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
				xd
			</Dialog>
		</>
	);
};
export default AddCards;
