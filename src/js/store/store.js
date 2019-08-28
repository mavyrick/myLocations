import { createStore } from "redux";
import rootReducer from "../reducers/reducer";
import { loadState, saveState } from "../LocalStorage/localStorage.js"

const persistedState = loadState();

const store = createStore(
    rootReducer,
    persistedState
);

store.subscribe(() => {
    saveState({
        categories: store.getState().categories,
        locations: store.getState().locations,
    });
});

export default store;