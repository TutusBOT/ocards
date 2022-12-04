import { combineReducers } from "@reduxjs/toolkit";
import cardsReducer from "./cards/cardsSlice";
import practiceReducer from "./practice/practiceSlice";

export const rootReducer = combineReducers({
	cards: cardsReducer,
	practice: practiceReducer,
});
