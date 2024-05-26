import { applyMiddleware, combineReducers, createStore } from "redux";
import { basketReducer } from "./reducers/basket-reducer";
import { thunk } from "redux-thunk";

const rootReducer = combineReducers({
  basket: basketReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
