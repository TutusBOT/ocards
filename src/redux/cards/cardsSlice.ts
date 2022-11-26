import { createSlice, createAction, PayloadAction } from "@reduxjs/toolkit";

export interface Set {
	name: string;
	cards: Array<FlashCard>;
	defLang: string;
	termLang: string;
}

export interface FlashCard {
	front: string;
	back: string;
}

type CardsState = {
	sets: Array<Set>;
};

export const initialState: CardsState = {
	sets: [
		{
			name: "",
			cards: [],
			defLang: "",
			termLang: "",
		},
	],
};

const slice = createSlice({
	name: "cards",
	initialState,
	reducers: {
		addSet: (state, { payload }: PayloadAction<Set>) => {
			state.sets.push(payload);
			return state;
		},
		deleteSet: (state, { payload }: PayloadAction<string>) => {
			state.sets = state.sets.filter((set) => set.name !== payload);
		},
		addCards: (
			state,
			{
				payload,
			}: PayloadAction<{
				name: string;
				cards: Array<FlashCard>;
			}>
		) => {
			state.sets.map((set) => {
				if (set.name === payload.name) {
					set.cards = [...set.cards, ...payload.cards];
				}
				return set;
			});
		},
		reset: () => {
			return initialState;
		},
	},
});

export const cardsActions = {
	addSet: createAction<Set>("cards/addSet"),
	deleteSet: createAction<String>("cards/deleteSet"),
	addCards: createAction<{
		name: string;
		cards: Array<FlashCard>;
	}>("cards/addCards"),
	reset: createAction("cards/reset"),
};

export default slice.reducer;
