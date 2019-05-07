import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from "@angular/core";
import { fromEvent, Subscription, merge, Observable } from "rxjs";
import { debounceTime, map, switchMap, tap, take, filter } from "rxjs/operators";
import { Store } from "@ngrx/store";

import { UnsplashImage } from "src/models";
import { UnsplashService } from "src/app/services/unsplash";
import { RootState } from "src/app/redux";
import { SetSearch } from "src/app/redux/search";

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.scss"]
})
export class SearchComponent implements OnInit, OnDestroy {
  images: UnsplashImage[] = [];
  query$!: Observable<string>;
  subcription$$!: Subscription;

  @ViewChild("search") searchInput!: ElementRef<HTMLInputElement>;

  constructor(private store: Store<RootState>, private unsplashService: UnsplashService) {
    this.searchImages = this.searchImages.bind(this);
  }

  ngOnInit() {
    this.searchInput.nativeElement.focus();

    this.query$ = this.store.select(state => state.search.query);

    const restorePreviousResults$ = this.query$.pipe(
      take(1),
      filter(query => query.trim().length > 0),
      switchMap(this.searchImages),
      tap(images => (this.images = images))
    );

    const input$ = fromEvent(this.searchInput.nativeElement, "input").pipe(
      map(event => (event.target as HTMLInputElement).value),
      tap(query => this.store.dispatch(new SetSearch(query))),
      debounceTime(350),
      switchMap(this.searchImages),
      tap(images => (this.images = images))
    );

    this.subcription$$ = merge(input$, restorePreviousResults$).subscribe();
  }

  ngOnDestroy() {
    this.subcription$$.unsubscribe();
  }

  searchImages(query: string): Observable<UnsplashImage[]> {
    return this.unsplashService.search(query, 1, 50);
  }
}
