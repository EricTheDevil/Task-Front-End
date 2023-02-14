/* eslint-disable no-case-declarations */
import { ADD_FAVORITE, CountryActions, REMOVE_FAVORITE } from "../../types";

type InitState = {
  favoriteCountries: string[];
};
const initialState: InitState = {
  favoriteCountries: [],
};

const favorites = (state = initialState, action: CountryActions): InitState => {
  switch (action.type) {
    case ADD_FAVORITE:
      const countryName = action.payload;
      const isInList = state.favoriteCountries.some(
        (name) => name === countryName
      );

      if (isInList) {
        return state;
      }

      return {
        ...state,
        favoriteCountries: [...state.favoriteCountries, countryName],
      };

    case REMOVE_FAVORITE:
      const removeCountryName = action.payload;
      const newList = state.favoriteCountries.filter(
        (name) => name !== removeCountryName
      );
      return {
        ...state,
        favoriteCountries: newList,
      };
    default:
      return state;
  }
};
export default favorites;
