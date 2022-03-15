import { NgModule } from "@angular/core";
import { MatGridListModule } from "@angular/material/grid-list";

import { MatBadgeModule } from "@angular/material/badge";

import { MatButtonModule } from "@angular/material/button";

import { MatCardModule } from "@angular/material/card";

import { MatDialogModule } from "@angular/material/dialog";

import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";

import { MatSelectModule } from "@angular/material/select";

import { MatToolbarModule } from "@angular/material/toolbar";
import { MatTooltipModule } from "@angular/material/tooltip";

@NgModule({
  exports: [
    MatBadgeModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatToolbarModule,
    MatTooltipModule,
    MatGridListModule,
  ],
})
export class MaterialModule {}
