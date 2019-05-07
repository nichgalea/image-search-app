import { FavouritesActionTypes, FavouritesActionUnion } from "./favourites.actions";

import { UnsplashImage } from "src/models";

export interface FavouritesState {
  list: UnsplashImage[];
}

export const initialFavouritesState: FavouritesState = {
  list: []
};

export function favouritesReducer(state = initialFavouritesState, action: FavouritesActionUnion): FavouritesState {
  switch (action.type) {
    case FavouritesActionTypes.ADD: {
      if (state.list.some(i => i.id === action.payload.id)) {
        return state;
      }

      return {
        ...state,
        list: [...state.list, action.payload]
      };
    }

    case FavouritesActionTypes.REMOVE: {
      return {
        ...state,
        list: [...state.list.filter(i => i.id !== action.payload.id)]
      };
    }

    default:
      return state;
  }
}
