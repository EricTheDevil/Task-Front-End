//reducer case constants
export const FETCH_COUNTRIES_LOADING = "FETCH_COUNTRIES_LOADING";
export const FETCH_COUNTRIES_SUCCESS = "FETCH_COUNTRIES_SUCCESS";
export const FETCH_COUNTRIES_FAILURE = "FETCH_COUNTRIES_FAILURE";
export const ADD_FAVORITE = "ADD_FAVORITE";
export const REMOVE_FAVORITE = "REMOVE_FAVORITE";
export const FETCH_COUNTRY = "FETCH_COUNTRY";
export const UPDATE_SEARCH_KEYWORD = "UPDATE_SEARCH_KEYWORD";

//types
export type CountryReducerState = {
  countries: CountryType[];
  isLoading: boolean;
  error: string;
};

export type CountryType = {
  name: { common: string };
  languages: {
    [key: string]: string;
  };
  flags: {
    png: string;
  };
  region: string;
  population: number;
  capital: string[];
};

//action types
export type FetchAllCountriesLoadingAction = {
  type: typeof FETCH_COUNTRIES_LOADING;
  payload?: string;
};
export type FetchAllCountriesSuccessAction = {
  type: typeof FETCH_COUNTRIES_SUCCESS;
  payload: CountryType[];
};
export type FetchAllCountriesFailureAction = {
  type: typeof FETCH_COUNTRIES_FAILURE;
  payload: string;
};
export type AddFavoriteAction = {
  type: typeof ADD_FAVORITE;
  payload: string;
};
export type SetSearchKeywordAction = {
  type: typeof UPDATE_SEARCH_KEYWORD;
  payload: string;
};

export type RemoveFavoriteAcrion = {
  type: typeof REMOVE_FAVORITE;
  payload: string;
};

export type CountryActions =
  | FetchAllCountriesLoadingAction
  | FetchAllCountriesSuccessAction
  | FetchAllCountriesFailureAction
  | AddFavoriteAction
  | RemoveFavoriteAcrion
  | SetSearchKeywordAction;
