import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from "@angular/core";
import { fromEvent, Subscription, Observable, merge } from "rxjs";
import { map, tap, switchMap } from "rxjs/operators";
import { Store } from "@ngrx/store";

import { UnsplashImage } from "src/models";
import { UnsplashService } from "src/app/services/unsplash";
import { RootState } from "src/app/redux";
import { SetSearchQuery, GetNextResults } from "src/app/redux/search";

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.scss"]
})
export class SearchComponent implements OnInit, OnDestroy {
  results$!: Observable<UnsplashImage[]>;
  query$!: Observable<string>;
  subcription$$!: Subscription;
  page = 0;

  @ViewChild("search") searchInput!: ElementRef<HTMLInputElement>;

  constructor(private store: Store<RootState>, private unsplashService: UnsplashService) {}

  ngOnInit() {
    this.searchInput.nativeElement.focus();

    this.results$ = this.store.select(state => state.search.results);
    this.query$ = this.store.select(state => state.search.query);

    const input$ = fromEvent(this.searchInput.nativeElement, "input").pipe(
      map(event => (event.target as HTMLInputElement).value),
      tap(query => {
        this.page = 0;
        this.store.dispatch(new SetSearchQuery(query));
      })
    );

    const pageScroll$ = fromEvent(window, "scroll").pipe(
      tap(() => {
        const hasReachedBottom =
          document.documentElement.clientHeight + document.documentElement.scrollTop ===
          document.documentElement.scrollHeight;

        if (hasReachedBottom) {
          this.store.dispatch(new GetNextResults(++this.page));
        }
      })
    );

    this.subcription$$ = merge(input$, pageScroll$).subscribe();
  }

  ngOnDestroy() {
    this.subcription$$.unsubscribe();
  }
}
