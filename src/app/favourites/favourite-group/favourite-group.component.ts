import { Component, OnInit, Input, OnDestroy } from "@angular/core";
import { FormControl } from "@angular/forms";
import { Subscription, merge } from "rxjs";

import { FavouriteGroup, UnsplashImage } from "src/models";
import { Store } from "@ngrx/store";
import { RootState } from "src/app/redux";
import { RenameGroup, ChangeGroupDescription, RemoveImageFromGroup, RemoveGroup } from "src/app/redux/favourites";
import { tap } from "rxjs/operators";

@Component({
  selector: "app-favourite-group",
  templateUrl: "./favourite-group.component.html",
  styleUrls: ["./favourite-group.component.scss"]
})
export class FavouriteGroupComponent implements OnInit, OnDestroy {
  @Input() group!: FavouriteGroup;
  @Input() id!: number;

  groupName = new FormControl();
  groupDescription = new FormControl();
  subcription!: Subscription;
  openDetails = false;

  constructor(private store: Store<RootState>) {}

  ngOnInit() {
    this.groupName.setValue(this.group.name);
    this.groupDescription.setValue(this.group.description);

    const name$ = this.groupName.valueChanges.pipe(tap(value => this.store.dispatch(new RenameGroup(this.id, value))));

    const desc$ = this.groupDescription.valueChanges.pipe(
      tap(value => this.store.dispatch(new ChangeGroupDescription(this.id, value)))
    );

    this.subcription = merge(name$, desc$).subscribe();
  }

  ngOnDestroy() {
    this.subcription.unsubscribe();
  }

  removeImage(image: UnsplashImage) {
    this.store.dispatch(new RemoveImageFromGroup(this.id, image));
  }

  deleteGroup() {
    this.store.dispatch(new RemoveGroup(this.id));
  }

  downloadImage(image: UnsplashImage) {
    console.log(image);
  }
}
