import { createAction, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FlashCard } from "../cards/cardsSlice";

interface Practice {
	cards: FlashCard[];
	name: string;
}

const initialState: Practice = {
	name: "",
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
		setName: (state, { payload }: PayloadAction<string>) => {
			state.name = payload;
		},
	},
});

export const practiceActions = {
	setPractice: createAction<FlashCard[]>("practice/setPractice"),
	clearPractice: createAction("practice/clearPractice"),
	setName: createAction<string>("practice/setName"),
};

export default slice.reducer;
