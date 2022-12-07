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
		deleteCard: (
			state,
			{ payload }: PayloadAction<{ card: FlashCard; name: string }>
		) => {
			state.sets.forEach((set, i) => {
				if (set.name === payload.name) {
					state.sets[i].cards = state.sets[i].cards.filter((card) => {
						if (
							card.back !== payload.card.back ||
							card.front !== payload.card.front
						) {
							return card;
						}
					});
				}
			});
		},
		editCard: (
			state,
			{
				payload,
			}: PayloadAction<{ name: string; card: FlashCard; editedCard: FlashCard }>
		) => {
			state.sets = state.sets.map((set, i) => {
				if (set.name === payload.name) {
					const cards = set.cards.map((card) => {
						if (
							card.back === payload.card.back &&
							card.front === payload.card.front
						) {
							return payload.editedCard;
						}
						return card;
					});
					return { ...set, cards };
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
	deleteSet: createAction<string>("cards/deleteSet"),
	addCards: createAction<{
		name: string;
		cards: Array<FlashCard>;
	}>("cards/addCards"),
	deleteCard: createAction<{ card: FlashCard; name: string }>(
		"cards/deleteCard"
	),
	editCard: createAction<{
		name: string;
		card: FlashCard;
		editedCard: FlashCard;
	}>("cards/addCard"),
	reset: createAction("cards/reset"),
};

export default slice.reducer;
