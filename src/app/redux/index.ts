import { ActionReducer, ActionReducerMap, MetaReducer } from "@ngrx/store";
import { storeFreeze } from "ngrx-store-freeze";

import { environment } from "src/environments/environment";

import { SearchActionsUnion, searchReducer, SearchState } from "./search";
import { FavouritesActionUnion, favouritesReducer, FavouritesState } from "./favourites";

export type RootAction = SearchActionsUnion & FavouritesActionUnion;

export interface RootState {
  search: SearchState;
  favourites: FavouritesState;
}

export const reducers: ActionReducerMap<RootState, RootAction> = {
  search: searchReducer,
  favourites: favouritesReducer
};

export const metaReducers: MetaReducer<RootState, RootAction>[] = !environment.production ? [logger, storeFreeze] : [];

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
