import { Action } from "@ngrx/store";

export enum SearchActionTypes {
  SET = "search/set",
  CLEAR = "search/clear"
}

export class SetSearch implements Action {
  readonly type = SearchActionTypes.SET;

  constructor(public payload: string) {}
}

export class ClearSearch implements Action {
  readonly type = SearchActionTypes.CLEAR;
}

export type SearchActionsUnion = SetSearch | ClearSearch;
