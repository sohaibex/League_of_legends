import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ListChampionsComponent } from "./components/champions/list-champions/list-champions.component";
import { MaterialModule } from "./components/ui/material/material.module";
import { AgGridModule } from "ag-grid-angular";
import { HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientInMemoryWebApiModule } from "angular-in-memory-web-api";
import { ChampionsData } from "./core/api/champions.service";
import { AddChampionsComponent } from "./components/champions/add-champions/add-champions.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { CellbuttonComponent } from "./components/ui/cellbutton/cellbutton.component";
import { EditChampionComponent } from "./components/champions/edit-champion/edit-champion.component";

@NgModule({
  declarations: [
    AppComponent,
    ListChampionsComponent,
    AddChampionsComponent,
    EditChampionComponent,
    CellbuttonComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    AgGridModule.withComponents([CellbuttonComponent]),
    HttpClientModule,
    ReactiveFormsModule,
    HttpClientInMemoryWebApiModule.forRoot(ChampionsData),
    NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [AddChampionsComponent, EditChampionComponent],
})
export class AppModule {}
