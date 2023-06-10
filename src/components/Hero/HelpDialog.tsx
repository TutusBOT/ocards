import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import {
	Box,
	Button,
	Dialog,
	MobileStepper,
	Paper,
	Typography,
} from "@mui/material";
import { useState } from "react";
import cameraImgUrl from "../../assets/camera.png";
import addPhotoImgUrl from "../../assets/add-photo.png";
import successImgUrl from "../../assets/success.png";

const steps = [
	{
		label: "Take a photo",
		description: "Take a photo of your notes",
		reminder: "Try to make it as clear as possible! It helps the OCR a lot.",
		image: cameraImgUrl,
	},
	{
		label: "Add your photo",
		description:
			"Choose add by photo option in your desired set. Next define separator of the term and definition. Then just add photo of your notes.",
		reminder: "Please note that this process may take a while.",
		image: addPhotoImgUrl,
	},
	{
		label: "You did it!",
		description: "You successfully created your first set of flashcards.",
		image: successImgUrl,
		reminder: "Remember: you can always manually adjust your cards.",
	},
];

const HelpDialog = () => {
	const [open, setOpen] = useState(false);
	const [activeStep, setActiveStep] = useState(0);
	const maxSteps = steps.length;

	const handleClose = () => setOpen(false);
	const handleOpen = () => setOpen(true);
	const handleNext = () => setActiveStep((prevStep) => prevStep + 1);
	const handleBack = () => setActiveStep((prevStep) => prevStep - 1);

	return (
		<>
			<Button
				variant="contained"
				color="secondary"
				className="w-[300px] text-xl py-3"
				onClick={handleOpen}
			>
				How does that work?
			</Button>
			<Dialog open={open} fullWidth onClose={handleClose}>
				<Paper
					square
					elevation={0}
					sx={{
						display: "flex",
						alignItems: "center",
						height: 50,
						pl: 2,
						bgcolor: "background.default",
					}}
				>
					<Typography className="text-2xl">
						{steps[activeStep].label}
					</Typography>
				</Paper>
				<Box className="text-xl flex flex-col justify-between w-full h-[500px] text-center py-2">
					{steps[activeStep].description}
					<img
						src={steps[activeStep].image}
						className="max-w-sm absolute top-1/2 -translate-x-1/2 left-1/2 -translate-y-1/2"
					/>
					{steps[activeStep].reminder}
				</Box>
				<MobileStepper
					variant="text"
					steps={maxSteps}
					position="static"
					activeStep={activeStep}
					nextButton={
						<Button
							size="small"
							onClick={handleNext}
							disabled={activeStep === maxSteps - 1}
						>
							Next
							<KeyboardArrowRight />
						</Button>
					}
					backButton={
						<Button
							size="small"
							onClick={handleBack}
							disabled={activeStep === 0}
						>
							<KeyboardArrowLeft />
							Back
						</Button>
					}
				/>
			</Dialog>
		</>
	);
};
export default HelpDialog;
