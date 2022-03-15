import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ListChampionsComponent } from "./components/champions/list-champions/list-champions.component";

const routes: Routes = [
  {
    path: "",
    component: ListChampionsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
