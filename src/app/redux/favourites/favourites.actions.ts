import { Action } from "@ngrx/store";

import { UnsplashImage } from "src/models";

export enum FavouritesActionTypes {
  ADD = "favourites/add",
  REMOVE = "favourites/remove"
}

export class AddFavourite implements Action {
  readonly type = FavouritesActionTypes.ADD;

  constructor(public payload: UnsplashImage) {}
}

export class RemoveFavourite implements Action {
  readonly type = FavouritesActionTypes.REMOVE;

  constructor(public payload: UnsplashImage) {}
}

export type FavouritesActionUnion = AddFavourite | RemoveFavourite;
