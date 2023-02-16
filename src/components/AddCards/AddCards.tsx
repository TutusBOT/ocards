import {
	Button,
	Dialog,
	List,
	ListItem,
	Skeleton,
	TextField,
	Typography,
} from "@mui/material";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import useGenerateId from "../../hooks/useGenerateId/userGenerateId";
import { cardsActions, FlashCard } from "../../redux/cards/cardsSlice";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import PanToolIcon from "@mui/icons-material/PanTool";
import useImageReader from "../../hooks/useImageReader/useImageReader";
import Chip from "@mui/material/Chip";

interface AddCards {
	setName: string;
}

const DIALOG_ANIMATION_TIME = 160;

const AddCards = ({ setName }: AddCards) => {
	const dispatch = useDispatch();

	const [open, setOpen] = useState(false);
	const [additionType, setAdditionType] = useState<"hand" | "photo" | null>(
		null
	);
	const [term, setTerm] = useState("");
	const [definition, setDefinition] = useState("");
	const [image, setImage] = useState<string | ArrayBuffer | null | undefined>(
		null
	);
	const [separator, setSeparator] = useState("");
	const [separators, setSeparators] = useState(["-"]);
	const [photoCards, setPhotoCards] = useState<FlashCard[] | "loading" | null>(
		null
	);
	const addCardRef = useRef<HTMLInputElement>(null);

	const handleType = (type: "hand" | "photo") => {
		setAdditionType(type);
	};

	const handleClick = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
		setTimeout(() => {
			setImage(null);
			setAdditionType(null);
		}, DIALOG_ANIMATION_TIME);
	};

	const handleAdd = () => {
		dispatch(
			cardsActions.addCards({
				name: setName,
				cards: [
					{
						id: useGenerateId(),
						front: term.trim(),
						back: definition.trim(),
						learnedRatio: 0,
					},
				],
			})
		);
		setTerm("");
		setDefinition("");
		if (addCardRef.current) addCardRef.current.focus();
	};

	const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
		const reader = new FileReader();
		if (e.target.files) {
			setPhotoCards("loading");
			reader.readAsDataURL(e.target.files[0]);
			reader.onload = async (e) => {
				setImage(e.target?.result);
				if (typeof e.target?.result === "string") {
					const wordsArray = await useImageReader({
						file: e.target.result,
						separators: separators,
					});
					const cards: FlashCard[] = [];
					for (let i = 0; i < wordsArray.length; i += 2) {
						cards.push({
							front: wordsArray[i],
							back: wordsArray[i + 1],
							learnedRatio: 0,
							id: useGenerateId(),
						});
					}
					setPhotoCards(cards);
				}
			};
		}
	};

	const deleteSeparator = (s: string) => {
		setSeparators(separators.filter((separator) => separator !== s));
	};

	return (
		<>
			<Button variant="contained" onClick={handleClick}>
				ADD
			</Button>
			<Dialog open={open} onClose={handleClose} fullWidth maxWidth={"md"}>
				{additionType ? (
					additionType === "hand" ? (
						<div className="flex flex-col p-4 gap-4">
							<TextField
								label="Term (front)"
								variant="outlined"
								value={term}
								onChange={(e) => setTerm(e.target.value)}
								inputRef={addCardRef}
							/>
							<TextField
								label="Definition (back)"
								variant="outlined"
								value={definition}
								onChange={(e) => setDefinition(e.target.value)}
							/>
							<Button variant="contained" onClick={handleAdd}>
								ADD CARD
							</Button>
						</div>
					) : (
						<div className="flex flex-col gap-6 py-4">
							<div className="self-center">
								{image && typeof image === "string" ? (
									<img className="max-h-80 rounded-sm" src={image} />
								) : (
									<Skeleton variant="rounded" width="20rem" height="20rem" />
								)}
							</div>

							{photoCards == null && (
								<div className="flex w-full justify-center gap-4">
									<TextField
										className="w-60"
										label="Term and definition separator"
										value={separator}
										onChange={(e) => setSeparator(e.target.value)}
									/>
									<Button
										variant="outlined"
										onClick={() => {
											setSeparators([...separators, separator]);
											setSeparator("");
										}}
									>
										ADD
									</Button>
								</div>
							)}

							{photoCards === "loading" && <div>Loading</div>}

							{photoCards && photoCards !== "loading" && (
								<List>
									{photoCards.map((card) => (
										<ListItem key={card.id}>
											{card.front} {card.back}
										</ListItem>
									))}
								</List>
							)}

							<List className="flex justify-center gap-2">
								{separators.map((s) => {
									return (
										<Chip
											key={s}
											variant="filled"
											label={s}
											onDelete={() => deleteSeparator(s)}
										/>
									);
								})}
							</List>
							<div className="flex justify-center gap-2">
								<Button color="secondary" variant="contained">
									<label htmlFor="flashcards" className="cursor-pointer">
										{image
											? "CHOOSE ANOTHER"
											: "CHOOSE PHOTO FROM YOUR GALLERY"}
									</label>
								</Button>
								{image && (
									<Button color="primary" variant="contained">
										NEXT
									</Button>
								)}
								<input
									className="opacity-0 absolute -left-full"
									type="file"
									name="flashcards"
									id="flashcards"
									accept="image/png, image/jpeg"
									onChange={(e) => handleImage(e)}
								/>
							</div>
						</div>
					)
				) : (
					<>
						<Typography variant="h4" className="mt-4 flex justify-center">
							Add by:
						</Typography>
						<div className="px-4 pt-4 pb-8 flex justify-center gap-4">
							<Button
								variant="outlined"
								className="flex gap-2"
								onClick={() => {
									handleType("hand");
								}}
							>
								Hand <PanToolIcon />
							</Button>
							<Button
								variant="outlined"
								className="flex gap-2"
								onClick={() => {
									handleType("photo");
								}}
							>
								Photo <CameraAltIcon />
							</Button>
						</div>
					</>
				)}
			</Dialog>
		</>
	);
};
export default AddCards;
