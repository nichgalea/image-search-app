import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";

import { RootState } from "src/app/redux";
import { FavouriteGroup } from "src/models";

@Component({
  selector: "app-favourites",
  templateUrl: "./favourites.component.html",
  styleUrls: ["./favourites.component.scss"]
})
export class FavouritesComponent implements OnInit {
  favouritesGroups$!: Observable<FavouriteGroup[]>;

  constructor(private store: Store<RootState>) {}

  ngOnInit() {
    this.favouritesGroups$ = this.store.select(state => state.favourites.groups);
  }

  trackByIndex(index: number) {
    return index;
  }
}
