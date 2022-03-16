import { Component, OnInit } from "@angular/core";
import { ColDef, GridApi } from "ag-grid-community";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";

import { CellbuttonComponent } from "src/app/components/ui/cellbutton/cellbutton.component";
import Swal from "sweetalert2";
import { ChampionService } from "src/app/core/service/champion.service";
import { AddChampionsComponent } from "../add-champions/add-champions.component";
import { EditChampionComponent } from "../edit-champion/edit-champion.component";
import { Observable } from "rxjs";
import { IChampionsModel } from "src/app/core/models/champions.model";

@Component({
  selector: "app-list-champions",
  templateUrl: "./list-champions.component.html",
  styleUrls: ["./list-champions.component.scss"],
})
export class ListChampionsComponent implements OnInit {
  rowData: Observable<[IChampionsModel]>;
  frameworkComponents: any;
  columnDefs: ColDef[];
  error: any;
  gridColumnApi: any;
  gridApi!: GridApi;

  constructor(private dialog: MatDialog, private championS: ChampionService) {
    //configuration des colonnes de ag grid
    this.columnDefs = [
      { field: "id", sortable: true, filter: true },
      { field: "name", sortable: true, filter: true },
      { field: "title", sortable: true, filter: true },
      { field: "tags", sortable: true, filter: true },
      { field: "key", sortable: true, filter: true },
      {
        field: "Actions",
        cellRenderer: "btnCellRenderer",
        cellRendererParams: {
          onClick: this.onDelete.bind(this),
          updateClick: this.openUpdateChampionModal.bind(this),
        },
      },
    ];

    this.frameworkComponents = {
      btnCellRenderer: CellbuttonComponent,
    };
  }

  ngOnInit(): void {
    this.getchampions();
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }

  // get tous les champions
  getchampions() {
    this.championS.getAll().subscribe((res: any) => {
      this.rowData = res.sort((a, b) => a.id - b.id);
    }),
      (error: string) => {
        this.error = error;
        console.error(this.error);
      };
  }

  //fonction qui permet de supprimer un champion
  onDelete(params: any) {
    Swal.fire({
      title: "Êtes-vous sûr?",
      text: "Vous voulez vraiment Supprimer ce champion",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "oui",
    }).then((result) => {
      if (result.isConfirmed) {
        this.championS.delete(params.rowData.id).subscribe((res) => {
          const api = this.gridApi;
          api.applyTransaction({ remove: [params.rowData] });

          Swal.fire({
            title: "Bien Supprimer!!",
            text: "Champion a été supprimé avec succès",
            icon: "success",
          });
          return this.rowData;
        }),
          (error: string) => {
            this.error = error;
            console.error(this.error);
          };
      }
    });
  }

  //open Addchamion Modal
  openAddChampionModal() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    (dialogConfig.data = { row: this.rowData, gridapi: this.gridApi }),
      this.dialog.open(AddChampionsComponent, dialogConfig);
  }

  //open updatechamion Modal
  openUpdateChampionModal(params: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    dialogConfig.data = {
      selectedId: params.rowData.id,
      datachamp: this.rowData,
      gridapi: this.gridApi,
    };
    this.dialog.open(EditChampionComponent, dialogConfig);
  }
}
