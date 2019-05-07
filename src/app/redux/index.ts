import { ActionReducer, ActionReducerMap, MetaReducer } from "@ngrx/store";

import { environment } from "src/environments/environment";

import { SearchActionsUnion, searchReducer, SearchState } from "./search";

export type RootAction = SearchActionsUnion;

export interface RootState {
  search: SearchState;
}

export const reducers: ActionReducerMap<RootState, RootAction> = {
  search: searchReducer
};

export const metaReducers: MetaReducer<RootState, RootAction>[] = !environment.production ? [logger] : [];

export function logger(reducer: ActionReducer<RootState, RootAction>): ActionReducer<RootState, RootAction> {
  return (state, action) => {
    const result = reducer(state, action);

    console.groupCollapsed(":: Action ::", action);
    console.log("prev state", state);
    console.log("next state", result);
    console.groupEnd();

    return result;
  };
}
