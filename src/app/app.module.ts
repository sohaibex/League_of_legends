import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ListChampionsComponent } from "./components/champions/list-champions/list-champions.component";
import { MaterialModule } from "./components/ui/material/material.module";
import { AgGridModule } from "ag-grid-angular";

@NgModule({
  declarations: [AppComponent, ListChampionsComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    AgGridModule.withComponents([]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
