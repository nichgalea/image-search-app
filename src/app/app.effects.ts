import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { switchMap, debounceTime, map, withLatestFrom } from "rxjs/operators";
import { Store } from "@ngrx/store";

import { RootAction, RootState } from "./redux";
import { UnsplashService } from "./services/unsplash";
import { SearchActionTypes, SetSearchResults, ConcatSearchResults } from "./redux/search";
import { SetLoading } from "./redux/loading";

const RESULTS_PER_PAGE = 50;

@Injectable()
export class AppEffects {
  constructor(
    private actions$: Actions<RootAction>,
    private unsplashService: UnsplashService,
    private store: Store<RootState>
  ) {}

  @Effect()
  getResults$ = this.actions$.pipe(
    ofType(SearchActionTypes.SET_QUERY),
    debounceTime(350),
    switchMap(action => this.unsplashService.search(action.query, 0, RESULTS_PER_PAGE)),
    map(results => new SetSearchResults(results))
  );

  @Effect()
  getNextPage$ = this.actions$.pipe(
    ofType(SearchActionTypes.GET_NEXT_SEARCH_RESULTS),
    withLatestFrom(this.store.select(state => state.search.query)),
    switchMap(([action, query]) => this.unsplashService.search(query, action.page, RESULTS_PER_PAGE)),
    map(results => new ConcatSearchResults(results))
  );

  @Effect()
  loading$ = this.actions$.pipe(
    ofType(
      SearchActionTypes.SET_QUERY,
      SearchActionTypes.GET_NEXT_SEARCH_RESULTS,
      SearchActionTypes.SET_RESULTS,
      SearchActionTypes.CONCAT_SEARCH_RESULTS
    ),
    map(
      ({ type }) =>
        new SetLoading(type === SearchActionTypes.SET_QUERY || type === SearchActionTypes.GET_NEXT_SEARCH_RESULTS)
    )
  );
}
