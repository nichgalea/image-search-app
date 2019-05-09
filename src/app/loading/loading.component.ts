import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { Store } from "@ngrx/store";

import { RootState } from "src/app/redux";

@Component({
  selector: "app-loading",
  templateUrl: "./loading.component.html",
  styleUrls: ["./loading.component.scss"]
})
export class LoadingComponent implements OnInit {
  isLoading$!: Observable<boolean>;

  constructor(private store: Store<RootState>) {}

  ngOnInit() {
    this.isLoading$ = this.store.select(state => state.loading.isLoading);
  }
}
