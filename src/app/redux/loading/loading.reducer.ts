import { LoadingActionTypes, LoadingActionsUnion } from "./loading.actions";

export interface LoadingState {
  isLoading: boolean;
}

const initialLoadingState: LoadingState = { isLoading: false };

export function loadingReducer(state = initialLoadingState, action: LoadingActionsUnion): LoadingState {
  switch (action.type) {
    case LoadingActionTypes.SET:
      return {
        ...state,
        isLoading: action.isLoading
      };

    default:
      return state;
  }
}
