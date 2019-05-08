import { FavouritesActionTypes, FavouritesActionUnion } from "./favourites.actions";

import { UnsplashImage, FavouriteGroup } from "src/models";

export interface FavouritesState {
  groups: FavouriteGroup[];
}

export const initialFavouritesState: FavouritesState = {
  groups: []
};

export function favouritesReducer(state = initialFavouritesState, action: FavouritesActionUnion): FavouritesState {
  switch (action.type) {
    case FavouritesActionTypes.ADD_GROUP:
      return {
        ...state,
        groups: [
          ...state.groups,
          {
            name: action.name,
            description: "",
            list: []
          }
        ]
      };

    case FavouritesActionTypes.REMOVE_GROUP:
      return {
        ...state,
        groups: state.groups.filter((_g, i) => i !== action.id)
      };

    case FavouritesActionTypes.RENAME_GROUP: {
      return {
        ...state,
        groups: state.groups.map((g, i) => {
          if (i === action.id) {
            return { ...g, name: action.name };
          }

          return { ...g };
        })
      };
    }

    case FavouritesActionTypes.CHANGE_GROUP_DESCRIPTION: {
      return {
        ...state,
        groups: state.groups.map((g, i) => {
          if (i === action.id) {
            return { ...g, description: action.description };
          }

          return { ...g };
        })
      };
    }

    case FavouritesActionTypes.ADD_IMAGE_TO_GROUP: {
      if (state.groups[action.groupId].list.some(i => i.id === action.image.id)) {
        return state;
      }

      return {
        ...state,
        groups: state.groups.map((g, i) => {
          if (i === action.groupId) {
            return {
              ...g,
              list: [...g.list, action.image]
            };
          }

          return { ...g };
        })
      };
    }

    case FavouritesActionTypes.REMOVE_IMAGE_FROM_GROUP: {
      return {
        ...state,
        groups: state.groups.map((g, i) => {
          if (i === action.groupId) {
            return {
              ...g,
              list: g.list.filter(i => i.id !== action.image.id)
            };
          }

          return { ...g };
        })
      };
    }

    default:
      return state;
  }
}
