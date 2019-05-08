import { Action } from "@ngrx/store";

import { UnsplashImage } from "src/models";

export enum FavouritesActionTypes {
  ADD_GROUP = "favourites/group/add",
  REMOVE_GROUP = "favourites/group/remove",
  RENAME_GROUP = "favourites/group/rename",
  CHANGE_GROUP_DESCRIPTION = "favourites/group/change-description",
  ADD_IMAGE_TO_GROUP = "favourites/image/add",
  REMOVE_IMAGE_FROM_GROUP = "favourites/image/remove"
}

export class AddGroup implements Action {
  readonly type = FavouritesActionTypes.ADD_GROUP;
  constructor(public name: string) {}
}

export class RemoveGroup implements Action {
  readonly type = FavouritesActionTypes.REMOVE_GROUP;
  constructor(public id: number) {}
}

export class RenameGroup implements Action {
  readonly type = FavouritesActionTypes.RENAME_GROUP;
  constructor(public id: number, public name: string) {}
}

export class ChangeGroupDescription implements Action {
  readonly type = FavouritesActionTypes.CHANGE_GROUP_DESCRIPTION;
  constructor(public id: number, public description: string) {}
}

export class AddImageToGroup implements Action {
  readonly type = FavouritesActionTypes.ADD_IMAGE_TO_GROUP;
  constructor(public groupId: number, public image: UnsplashImage) {}
}

export class RemoveImageFromGroup implements Action {
  readonly type = FavouritesActionTypes.REMOVE_IMAGE_FROM_GROUP;
  constructor(public groupId: number, public image: UnsplashImage) {}
}

export type FavouritesActionUnion =
  | AddGroup
  | RemoveGroup
  | RenameGroup
  | ChangeGroupDescription
  | AddImageToGroup
  | RemoveImageFromGroup;
