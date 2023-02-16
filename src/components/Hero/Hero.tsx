import { Typography, Box, Link } from "@mui/material";

const Hero = () => {
	return (
		<Box className="w-full py-4 flex gap-4 flex-col">
			<Typography
				variant="h1"
				color="secondary"
				className="text-6xl md:text-8xl"
			>
				OCaRds
			</Typography>
			<Typography variant="body1">
				This is OCaRds, a web app designed to help creating and studying
				flashcards. It uses OCR (Optical Character Recognition) and{" "}
				<Link
					variant="body1"
					color="secondary.light"
					href="https://github.com/tesseract-ocr/tesseract"
				>
					tesseract
				</Link>{" "}
				library for recognising text. Then it converts them to fully functional
				flashcards that you can edit and study.
			</Typography>
			<div className="h-px w-full bg-white"></div>
		</Box>
	);
};
export default Hero;
