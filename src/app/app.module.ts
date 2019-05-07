import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { SearchComponent } from "./search";
import { StoreModule } from "@ngrx/store";

import { reducers, metaReducers } from "./redux";
import { FavouritesComponent } from './favourites/favourites.component';

@NgModule({
  declarations: [AppComponent, SearchComponent, FavouritesComponent],
  imports: [BrowserModule, AppRoutingModule, StoreModule.forRoot(reducers, { metaReducers })],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
