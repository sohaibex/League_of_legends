import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { IChampionsModel } from 'src/app/core/models/champions.model';

@Component({
  selector: 'app-cellbutton',
  templateUrl: './cellbutton.component.html',
  styleUrls: ['./cellbutton.component.scss'],
})
export class CellbuttonComponent implements ICellRendererAngularComp {
  error!: string;
  rowData!: any[];
  params: any;
  championss: IChampionsModel[] = [];
  constructor(private dialog: MatDialog) {}

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
   //delete champion

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
