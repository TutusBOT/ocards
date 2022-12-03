import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FlashCard } from "../cards/cardsSlice";

interface Practice {
	cards: FlashCard[];
}

const initialState: Practice = {
	cards: [],
};

const slice = createSlice({
	name: "practice",
	initialState,
	reducers: {
		setPractice: (state, { payload }: PayloadAction<FlashCard[]>) => {
			state.cards = payload;
		},
	},
});
