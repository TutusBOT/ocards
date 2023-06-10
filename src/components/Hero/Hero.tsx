import { Typography, Box, Link, Button } from "@mui/material";
import galleryImgUrl from "../../assets/gallery.png";
import flashCardsImgUrl from "../../assets/flash-cards.png";
import arrowImgUrl from "../../assets/arrows.png";
import HelpDialog from "./HelpDialog";

const Hero = () => {
	return (
		<Box
			className="w-full h-screen py-4 flex gap-4 items-center justify-center"
			id="home"
		>
			<div className="flex gap-4 flex-col">
				<Typography variant="h3" color="secondary" className="font-semibold ">
					A faster way to create and study flashcards.
				</Typography>
				<div className="flex gap-4 lg:gap-32 justify-center max-w-full">
					<img
						src={galleryImgUrl}
						alt="gallery"
						className="w-1/3 max-w-[200px]"
					/>
					<img src={arrowImgUrl} alt="arrow" className="w-1/3 max-w-[200px]" />
					<img
						src={flashCardsImgUrl}
						alt="flashcards"
						className="w-1/3 max-w-[200px]"
					/>
				</div>
				<div className="flex flex-col sm:flex-row gap-4 lg:gap-32 justify-center items-center">
					<Button
						variant="outlined"
						color="secondary"
						className="w-[300px] text-xl py-3"
						href="#cards"
					>
						Let&apos;s start!
					</Button>
					<HelpDialog />
				</div>
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
