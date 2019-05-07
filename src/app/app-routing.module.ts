import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { SearchComponent } from "./search";
import { FavouritesComponent } from "./favourites";

const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    redirectTo: "search"
  },
  { path: "search", component: SearchComponent },
  { path: "favourites", component: FavouritesComponent },
  { path: "**", redirectTo: "search" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
