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
  @Input() download: boolean = false;

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

  downloadImage(event: MouseEvent) {
    const imageElement = event.target as HTMLImageElement;
    const imgUrl = new URL(imageElement.src);
    const format = new URLSearchParams(imgUrl.search).get("fm");

    fetch(imageElement.src)
      .then(r => r.blob())
      .then(data => {
        const filename = `${this.image.id}.${format}`;

        if (navigator.msSaveBlob) {
          navigator.msSaveBlob(data, filename);
        } else {
          const aElement = document.createElement("a");

          aElement.href = URL.createObjectURL(data);
          aElement.download = filename;

          // needs to be in DOM for FireFox
          document.body.appendChild(aElement);

          aElement.click();

          document.body.removeChild(aElement);
        }
      });
  }
}
