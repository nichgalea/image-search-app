import { Action } from "@ngrx/store";
import { UnsplashImage } from "src/models";

export enum SearchActionTypes {
  SET_QUERY = "search/query/set",
  SET_RESULTS = "search/results/set",
  GET_NEXT_SEARCH_RESULTS = "search/results/next",
  CONCAT_SEARCH_RESULTS = "search/results/add"
}

export class SetSearchQuery implements Action {
  readonly type = SearchActionTypes.SET_QUERY;

  constructor(public query: string) {}
}

export class SetSearchResults implements Action {
  readonly type = SearchActionTypes.SET_RESULTS;

  constructor(public results: UnsplashImage[]) {}
}

export class GetNextResults implements Action {
  readonly type = SearchActionTypes.GET_NEXT_SEARCH_RESULTS;

  constructor(public page: number) {}
}

export class ConcatSearchResults implements Action {
  readonly type = SearchActionTypes.CONCAT_SEARCH_RESULTS;

  constructor(public results: UnsplashImage[]) {}
}

export type SearchActionsUnion = SetSearchQuery | SetSearchResults | GetNextResults | ConcatSearchResults;
