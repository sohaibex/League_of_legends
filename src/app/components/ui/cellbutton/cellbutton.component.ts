import { Component } from "@angular/core";
import { ICellRendererAngularComp } from "ag-grid-angular";
import { IChampionsModel } from "src/app/core/models/champions.model";

@Component({
  selector: "app-cellbutton",
  templateUrl: "./cellbutton.component.html",
  styleUrls: ["./cellbutton.component.scss"],
})
export class CellbuttonComponent implements ICellRendererAngularComp {
  error!: string;
  rowData!: any[];
  params: any;
  championss: IChampionsModel[] = [];
  constructor() {}

  refresh(params?: any): boolean {
    console.log(params);
    return true;
  }
  agInit(params: any): void {
    this.params = params;
  }

  //delete champion

  deleteChampion($event: any) {
    if (this.params.onClick instanceof Function) {
      const params = {
        event: $event,
        rowData: this.params.node.data,
      };

      this.params.onClick(params);
    }
  }
  //update champion

  updateChampion($event: any) {
    if (this.params.onClick instanceof Function) {
      const params = {
        event: $event,
        rowData: this.params.node.data,
      };

      this.params.updateClick(params);
    }
  }
}
