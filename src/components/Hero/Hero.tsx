import { Typography, Box, Link } from "@mui/material";

const Hero = () => {
	return (
		<Box
			className="w-full h-screen py-4 flex gap-4 items-center justify-center"
			id="home"
		>
			<div className="flex gap-4 flex-col">
				<Typography variant="h3" color="secondary" className="font-semibold">
					A faster way to create and study flashcards.
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
					library for recognising text. Then it converts them to fully
					functional flashcards that you can edit and study.
				</Typography>
			</div>
		</Box>
	);
};
export default Hero;
