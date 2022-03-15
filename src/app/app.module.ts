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

@NgModule({
  declarations: [AppComponent, ListChampionsComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    AgGridModule.withComponents([]),
    HttpClientModule,
    ReactiveFormsModule,
    HttpClientInMemoryWebApiModule.forRoot(ChampionsData),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
