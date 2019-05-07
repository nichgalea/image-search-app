import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { SearchComponent } from "./search";
import { StoreModule } from "@ngrx/store";

import { reducers, metaReducers } from "./redux";
import { FavouritesComponent } from './favourites/favourites.component';
import { ImageThumbnailComponent } from './image-thumbnail/image-thumbnail.component';
import { HeartIconComponent } from './heart-icon/heart-icon.component';

@NgModule({
  declarations: [AppComponent, SearchComponent, FavouritesComponent, ImageThumbnailComponent, HeartIconComponent],
  imports: [BrowserModule, AppRoutingModule, StoreModule.forRoot(reducers, { metaReducers })],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
