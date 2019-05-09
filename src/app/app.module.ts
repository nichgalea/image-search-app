import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { SearchComponent } from "./search";
import { StoreModule } from "@ngrx/store";

import { reducers, metaReducers } from "./redux";
import { FavouritesComponent } from "./favourites/favourites.component";
import { FavouriteGroupComponent } from "./favourites/favourite-group";
import { ImageThumbnailComponent } from "./image-thumbnail/image-thumbnail.component";
import { HeartIconComponent } from "./image-thumbnail/heart-icon";
import { AddFavouriteComponent } from "./image-thumbnail/add-favourite";
import { LoadingComponent } from './loading/loading.component';
import { EffectsModule } from '@ngrx/effects';
import { AppEffects } from './app.effects';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    FavouritesComponent,
    ImageThumbnailComponent,
    HeartIconComponent,
    AddFavouriteComponent,
    FavouriteGroupComponent,
    LoadingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot([AppEffects])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
