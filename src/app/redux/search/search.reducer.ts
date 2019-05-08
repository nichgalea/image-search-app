import { SearchActionTypes, SearchActionsUnion } from "./search.actions";

export interface SearchState {
  query: string;
}

const initialSearchState: SearchState = { query: "" };

export function searchReducer(state = initialSearchState, action: SearchActionsUnion): SearchState {
  switch (action.type) {
    case SearchActionTypes.SET:
      return {
        ...state,
        query: action.query
      };

    case SearchActionTypes.CLEAR: {
      return {
        ...state,
        query: ""
      };
    }

    default:
      return state;
  }
}
