import { UnsplashImage } from "src/models";

import { SearchActionTypes, SearchActionsUnion } from "./search.actions";

export interface SearchState {
  query: string;
  results: UnsplashImage[];
}

const initialSearchState: SearchState = { query: "", results: [] };

export function searchReducer(state = initialSearchState, action: SearchActionsUnion): SearchState {
  switch (action.type) {
    case SearchActionTypes.SET_QUERY:
      return {
        ...state,
        query: action.query
      };

    case SearchActionTypes.SET_RESULTS: {
      return {
        ...state,
        results: action.results
      };
    }

    case SearchActionTypes.CONCAT_SEARCH_RESULTS: {
      return {
        ...state,
        results: [...state.results, ...action.results]
      };
    }

    default:
      return state;
  }
}
