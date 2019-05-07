import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from "@angular/core";
import { fromEvent, Subscription } from "rxjs";
import { debounceTime, map } from "rxjs/operators";

import { UnsplashService } from "src/app/services/unsplash";

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.scss"]
})
export class SearchComponent implements OnInit, OnDestroy {
  search$$!: Subscription;

  @ViewChild("search") searchInput!: ElementRef<HTMLInputElement>;

  constructor(private unsplashService: UnsplashService) {}

  ngOnInit() {
    this.search$$ = fromEvent(this.searchInput.nativeElement, "input")
      .pipe(
        debounceTime(350),
        map(event => (event.target as HTMLInputElement).value)
      )
      // .subscribe(query => this.unsplashService.search(query, 1, 5));
      .subscribe(console.log);
  }

  ngOnDestroy() {
    this.search$$.unsubscribe();
  }
}
