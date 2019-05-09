import { Action } from "@ngrx/store";

export enum LoadingActionTypes {
  SET = "loading/set"
}

export class SetLoading implements Action {
  readonly type = LoadingActionTypes.SET;

  constructor(public isLoading: boolean) {}
}

export type LoadingActionsUnion = SetLoading;
