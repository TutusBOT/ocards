import { Typography, Container, Box } from "@mui/material";

const Hero = () => {
	return (
		<Box className="w-full border-white border-b-2 py-4 flex gap-2 flex-col">
			<Typography variant="h1" color="primary">
				OCaRds
			</Typography>
			<Typography variant="body1">
				This is OCaRds, a web app designed to help creating and studying
				flashcards. It uses OCR (Optical Character Recognition) and tesseract
				library for recognising text. Then it converts them to fully functional
				flashcards that you can edit and study.
			</Typography>
		</Box>
	);
};
export default Hero;
