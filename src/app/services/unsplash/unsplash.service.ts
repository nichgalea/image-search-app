import { Injectable } from "@angular/core";
import { Observable, from } from "rxjs";
import Unsplash from "unsplash-js";

import { environment } from "src/environments/environment";
import { UnsplashImage } from "src/models";

@Injectable({
  providedIn: "root"
})
export class UnsplashService {
  private unsplashApi: Unsplash;

  constructor() {
    this.unsplashApi = new Unsplash({
      applicationId: environment.UNSPLASH_API_KEY,
      secret: environment.UNSPLASH_API_SECRET
    });
  }

  search(query: string, page: number, itemsPerPage: number): Observable<UnsplashImage[]> {
    return from(
      this.unsplashApi.search
        .photos(query, page, itemsPerPage)
        .then(r => r.json())
        .then(r => r.results)
    );
  }
}
