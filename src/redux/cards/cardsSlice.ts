import { createSlice, createAction, PayloadAction } from "@reduxjs/toolkit";

export interface Set {
	name: string;
	cards: Array<FlashCard>;
	defLang: string;
	termLang: string;
}

export interface FlashCard {
	id: string;
	front: string;
	back: string;
	learnedRatio: number;
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
			return { sets: [...state.sets, payload] };
		},
		editSet: (
			state,
			{ payload }: PayloadAction<{ name: string; set: Set }>
		) => {
			return {
				sets: state.sets.map((set) => {
					if (set.name === payload.name) {
						return payload.set;
					}
					return set;
				}),
			};
		},
		deleteSet: (state, { payload }: PayloadAction<string>) => {
			return { sets: state.sets.filter((set) => set.name !== payload) };
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
			return {
				sets: state.sets.map((set) => {
					if (set.name === payload.name) {
						return { ...set, cards: [...set.cards, ...payload.cards] };
					}
					return set;
				}),
			};
		},
		deleteCard: (
			state,
			{ payload }: PayloadAction<{ name: string; id: string }>
		) => {
			return {
				sets: state.sets.map((set) => {
					if (set.name === payload.name) {
						return {
							...set,
							cards: set.cards.filter((card) => {
								return card.id !== payload.id;
							}),
						};
					}
					return set;
				}),
			};
		},
		editCard: (
			state,
			{
				payload,
			}: PayloadAction<{ name: string; id: string; editedCard: FlashCard }>
		) => {
			return {
				...state,
				sets: state.sets.map((set) => {
					if (set.name === payload.name) {
						const cards = set.cards.map((card) => {
							if (card.id === payload.id) {
								return payload.editedCard;
							}
							return card;
						});
						return { ...set, cards };
					}
					return set;
				}),
			};
		},
		reset: () => {
			return initialState;
		},
	},
});

export const cardsActions = {
	addSet: createAction<Set>("cards/addSet"),
	deleteSet: createAction<string>("cards/deleteSet"),
	editSet: createAction<{ name: string; set: Set }>("cards/editSet"),
	addCards: createAction<{
		name: string;
		cards: Array<FlashCard>;
	}>("cards/addCards"),
	deleteCard: createAction<{ name: string; id: string }>("cards/deleteCard"),
	editCard: createAction<{ name: string; id: string; editedCard: FlashCard }>(
		"cards/editCard"
	),
	reset: createAction("cards/reset"),
};

export default slice.reducer;
