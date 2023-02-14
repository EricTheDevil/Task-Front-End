import { Dispatch } from "redux";
import {
  CountryActions,
  FETCH_COUNTRIES_SUCCESS,
  FETCH_COUNTRIES_FAILURE,
  FETCH_COUNTRIES_LOADING,
  REMOVE_FAVORITE,
  ADD_FAVORITE,
  UPDATE_SEARCH_KEYWORD,
} from "../types";
import axios from "axios";

// FAVORITES
export const removeFavorite = (countryName: string): CountryActions => {
  return {
    type: REMOVE_FAVORITE,
    payload: countryName,
  };
};

export const addFavorite = (countryName: string): CountryActions => {
  return {
    type: ADD_FAVORITE,
    payload: countryName,
  };
};
// FETCHING
export function fetchAllCountriesLoading(): CountryActions {
  return {
    type: FETCH_COUNTRIES_LOADING,
  };
}

export function fetchAllCountriesSuccess(countries: []): CountryActions {
  return {
    type: FETCH_COUNTRIES_SUCCESS,
    payload: countries,
  };
}

export function fetchAllCountriesFailure(error: string): CountryActions {
  return {
    type: FETCH_COUNTRIES_FAILURE,
    payload: error,
  };
}

export function fetchAllCountries() {
  return (dispatch: Dispatch) => {
    axios
      .get(`https://restcountries.com/v3.1/all`)
      .then(async (res) => {
        const data = await res.data;
        dispatch(fetchAllCountriesSuccess(data));
      })
      .catch((err) => {
        dispatch(fetchAllCountriesFailure(err));
      });
  };
}
// SEARCHING
export function setSearchKeyword(keyword: string): CountryActions {
  return {
    type: UPDATE_SEARCH_KEYWORD,
    payload: keyword,
  };
}
