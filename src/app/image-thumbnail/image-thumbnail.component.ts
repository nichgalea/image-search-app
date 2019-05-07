import { Component, Input } from "@angular/core";

import { UnsplashImage } from "src/models";

@Component({
  selector: "app-image-thumbnail",
  templateUrl: "./image-thumbnail.component.html",
  styleUrls: ["./image-thumbnail.component.scss"]
})
export class ImageThumbnailComponent {
  @Input() image!: UnsplashImage;

  favourite = false;

  addToFavourites() {
    this.favourite = !this.favourite;
  }
}
