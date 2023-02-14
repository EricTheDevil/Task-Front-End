import { createStore, combineReducers, applyMiddleware, compose } from "redux";

import favoritesReducer from "./reducers/favorites";
import countryReducer from "./reducers/country";
import reduxThunk from "redux-thunk";
import { CountryType } from "../types";

const rootReducer = combineReducers({
  countries: countryReducer,
  favorites: favoritesReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export type InitialState = {
  favorites: { favoriteCountries: [] };
  countries: {
    countriesData: CountryType[];
    isLoading: boolean;
    error: string;
    searchWord: string;
  };
};
const initialState: InitialState = {
  favorites: { favoriteCountries: [] },
  countries: {
    countriesData: [],
    isLoading: false,
    error: "",
    searchWord: "",
  },
};

const localStoragePos: string = "countries6";
const middleware = [reduxThunk];

// Creating store with initialstate
const storeFactory = () => {
  let composeEnhancers = compose;

  const favoriteList = localStorage.getItem(localStoragePos);
  if (favoriteList) {
    initialState.favorites.favoriteCountries = JSON.parse(favoriteList);
  }
  const store = createStore(
    rootReducer,
    initialState,
    composeEnhancers(applyMiddleware(...middleware))
  );

  // Subscribing localstate
  store.subscribe(() => {
    const currentState = store.getState();
    const favoriteList = currentState.favorites.favoriteCountries;
    localStorage.setItem(localStoragePos, JSON.stringify(favoriteList));
  });
  return store;
};
export default storeFactory;
