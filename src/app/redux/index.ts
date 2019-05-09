import { ActionReducer, ActionReducerMap, MetaReducer } from "@ngrx/store";
import { storeFreeze } from "ngrx-store-freeze";
import { localStorageSync } from "ngrx-store-localstorage";

import { environment } from "src/environments/environment";

import { SearchActionsUnion, searchReducer, SearchState } from "./search";
import { FavouritesActionUnion, favouritesReducer, FavouritesState } from "./favourites";
import { LoadingActionsUnion, loadingReducer, LoadingState } from "./loading";

export type RootAction = SearchActionsUnion | FavouritesActionUnion | LoadingActionsUnion;

export interface RootState {
  search: SearchState;
  favourites: FavouritesState;
  loading: LoadingState;
}

export const reducers: ActionReducerMap<RootState, any> = {
  search: searchReducer,
  favourites: favouritesReducer,
  loading: loadingReducer
};

export const metaReducers: MetaReducer<RootState, RootAction>[] = !environment.production
  ? [logger, storeFreeze, storage]
  : [storage];

function storage(reducer: ActionReducer<RootState, RootAction>) {
  return localStorageSync({ keys: ["favourites"], rehydrate: true })(reducer);
}

function logger(reducer: ActionReducer<RootState, RootAction>): ActionReducer<RootState, RootAction> {
  return (state, action) => {
    const result = reducer(state, action);

    console.groupCollapsed(":: Action ::", action);
    console.log("prev state", state);
    console.log("next state", result);
    console.groupEnd();

    return result;
  };
}
