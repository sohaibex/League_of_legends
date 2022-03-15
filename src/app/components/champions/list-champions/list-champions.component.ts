import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material";
import { ColDef } from "ag-grid-community";
import { IChampionsModel } from "src/app/core/models/champions.model";
import { ChampionService } from "src/app/core/service/champion.service";

@Component({
  selector: "app-list-champions",
  templateUrl: "./list-champions.component.html",
  styleUrls: ["./list-champions.component.scss"],
})
export class ListChampionsComponent implements OnInit {
  rowData: IChampionsModel[];
  columnDefs: ColDef[];
  frameworkComponents: any;
  error: string;
  constructor(private dialog: MatDialog, private championS: ChampionService) {
    this.columnDefs = [
      { field: "id", sortable: true, filter: true },
      { field: "name", sortable: true, filter: true },
      { field: "title", sortable: true, filter: true },
      { field: "tags", sortable: true, filter: true },
      { field: "key", sortable: true, filter: true },
    ];
  }

  ngOnInit() {
    this.getChampions();
  }

  getChampions() {
    this.championS.getAll().subscribe((res: IChampionsModel[]) => {
      this.rowData = res.sort((a, b) => a.id - b.id);
    }),
      (error: string) => {
        this.error = error;
        console.error(this.error);
      };
  }
  openAddChampionModal() {}
}
