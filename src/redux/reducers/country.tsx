/* eslint-disable no-case-declarations */

import {
  CountryType,
  CountryActions,
  FETCH_COUNTRIES_LOADING,
  FETCH_COUNTRIES_FAILURE,
  FETCH_COUNTRIES_SUCCESS,
  UPDATE_SEARCH_KEYWORD,
} from "../../types";

type InitState = {
  countriesData: CountryType[];
  isLoading: boolean;
  error: string;
  searchWord: string;
};
const initialState: InitState = {
  countriesData: [],
  isLoading: false,
  error: "",
  searchWord: "",
};

const countries = (state = initialState, action: CountryActions): InitState => {
  switch (action.type) {
    case FETCH_COUNTRIES_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    //if fetching is successful
    case FETCH_COUNTRIES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        countriesData: action.payload,
        error: "",
      };
    //if fetching has any errors
    case FETCH_COUNTRIES_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    case UPDATE_SEARCH_KEYWORD:
      return {
        ...state,
        searchWord: action.payload,
      };

    default:
      return state;
  }
};

export default countries;
