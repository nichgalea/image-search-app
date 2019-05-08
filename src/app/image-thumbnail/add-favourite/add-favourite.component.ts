import { Component, OnInit, Input, ViewChild, ElementRef, EventEmitter, Output } from "@angular/core";
import { Observable } from "rxjs";
import { Store } from "@ngrx/store";

import { FavouriteGroup } from "src/models";
import { RootState } from "src/app/redux";
import { AddGroup } from "src/app/redux/favourites";

@Component({
  selector: "app-add-favourite",
  templateUrl: "./add-favourite.component.html",
  styleUrls: ["./add-favourite.component.scss"]
})
export class AddFavouriteComponent implements OnInit {
  newGroupName = "";
  favouritesGroups$!: Observable<FavouriteGroup[]>;

  @Output() close = new EventEmitter<void>();
  @Output() groupSelect = new EventEmitter<number>();
  @ViewChild("groupNameInput") groupNameInput!: ElementRef<HTMLInputElement>;
  @ViewChild("groupList") groupList!: ElementRef<HTMLUListElement>;

  constructor(private store: Store<RootState>) {}

  ngOnInit() {
    this.favouritesGroups$ = this.store.select(state => state.favourites.groups);
  }

  addGroup() {
    const trimmedName = this.newGroupName.trim();

    if (trimmedName.length > 0) {
      this.store.dispatch(new AddGroup(trimmedName));
      this.newGroupName = "";

      this.groupNameInput.nativeElement.focus();
    }
  }

  selectGroup(id: number) {
    this.groupSelect.emit(id);
    this.close.emit();
  }
}
