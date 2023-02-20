import { Typography } from "@mui/material";
import TinderCard from "react-tinder-card";

interface Card {
	term: string;
	definition: string;
}

const Card = ({ term, definition }: Card) => {
	return (
		<TinderCard
			preventSwipe={["up", "down"]}
			className="w-[250px] h-[400px] bg-white rounded-md p-4 flex flex-col gap-4"
		>
			<div className="w-full"></div>
			<Typography variant="h5">{term}</Typography>
			<Typography variant="body1">{definition}</Typography>
		</TinderCard>
	);
};
export default Card;
