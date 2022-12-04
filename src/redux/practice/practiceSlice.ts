import { createAction, createSlice, PayloadAction } from "@reduxjs/toolkit";
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
		clearPractice: (state) => {
			state.cards = [];
		},
	},
});

export const practiceActions = {
	setPractice: createAction<FlashCard[]>("practice/setPractice"),
	clearPractice: createAction("practice/clearPractice"),
};

export default slice.reducer;
