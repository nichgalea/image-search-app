import { Component, OnInit, OnDestroy } from "@angular/core";
import { UnsplashService } from "./services/unsplash";
import { Subscription } from "rxjs";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  title = "Image Search App";
}
