import { Component, Input } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";

import { UnsplashImage } from "src/models";
import { RootState } from "src/app/redux";
import { AddImageToGroup } from "../redux/favourites";

@Component({
  selector: "app-image-thumbnail",
  templateUrl: "./image-thumbnail.component.html",
  styleUrls: ["./image-thumbnail.component.scss"]
})
export class ImageThumbnailComponent {
  @Input() image!: UnsplashImage;

  isFavourite$!: Observable<boolean>;
  addingToFavourites = false;

  constructor(private store: Store<RootState>) {}

  ngOnInit() {
    this.isFavourite$ = this.store.select(state => {
      for (const g of state.favourites.groups) {
        if (g.list.some(i => i.id === this.image.id)) {
          return true;
        }
      }

      return false;
    });
  }

  addToFavouritesGroup(groupId: number) {
    this.store.dispatch(new AddImageToGroup(groupId, this.image));
  }
}
