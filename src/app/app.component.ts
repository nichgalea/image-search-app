import { Component, OnInit, OnDestroy } from "@angular/core";
import { UnsplashService } from "./services/unsplash";
import { Subscription } from "rxjs";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit, OnDestroy {
  sub!: Subscription;

  title = "image-search-app";

  constructor(private unsplashService: UnsplashService) {}

  ngOnInit() {
    this.sub = this.unsplashService.search("cats", 2, 1).subscribe(console.log);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
