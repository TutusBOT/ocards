import { combineReducers } from "@reduxjs/toolkit";
import cardsReducer from "./cards/cardsSlice";

export const rootReducer = combineReducers({
	cards: cardsReducer,
});
