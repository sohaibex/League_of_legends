import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material";
import { ColDef } from "ag-grid-community";

@Component({
  selector: "app-list-champions",
  templateUrl: "./list-champions.component.html",
  styleUrls: ["./list-champions.component.scss"],
})
export class ListChampionsComponent implements OnInit {
  rowData: any[];
  columnDefs: ColDef[];
  frameworkComponents: any;
  constructor(private dialog: MatDialog) {
    this.columnDefs = [
      { field: "id", sortable: true, filter: true },
      { field: "name", sortable: true, filter: true },
      { field: "title", sortable: true, filter: true },
      { field: "tags", sortable: true, filter: true },
      { field: "key", sortable: true, filter: true },
    ];
  }

  ngOnInit() {}

  getChampions() {}
  openAddChampionModal() {}
}
