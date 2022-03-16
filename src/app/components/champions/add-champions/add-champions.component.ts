import {
  Component,
  HostListener,
  Inject,
  OnDestroy,
  OnInit,
} from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { Subscription } from "rxjs";
import { ChampionsData } from "src/app/core/api/champions.service";
import { IChampionsModel } from "src/app/core/models/champions.model";
import { ChampionService } from "src/app/core/service/champion.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-add-champions",
  templateUrl: "./add-champions.component.html",
  styleUrls: ["./add-champions.component.scss"],
})
export class AddChampionsComponent implements OnInit, OnDestroy {
  // ! operateur pour dire au compilateur que ChampionForm peut prendre une autre valeur que null ou undifined
  ChampionForm!: FormGroup;
  champions: Array<any> = [];
  tags!: IChampionsModel[];
  error?: string;
  selectedTags!: IChampionsModel[];
  generatedId?: number;
  subscription: Subscription;

  constructor(
    private championS: ChampionService,
    private dialogRef: MatDialogRef<AddChampionsComponent>,
    private dataS: ChampionsData,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  //unsubscribe to avoid memory leaks
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit() {
    this.ChampionForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      title: new FormControl(null, [Validators.required]),
      tags: new FormControl(),
      key: new FormControl(null),
    });

    this.getTags();
  }

  //methode f pour récupérer les controles
  get f() {
    return this.ChampionForm.controls;
  }

  //get all tags
  getTags() {
    const arr: any[] = [];
    this.subscription = this.championS.getAll().subscribe((data: any) => {
      this.tags = data.map((o: any) => {
        for (let i in o.tags) {
          arr.push(o.tags[i]);
        }
      });
      this.tags = [...new Set(arr)];
    });
  }
  //Methode pour renitailiser le formulaire
  reset() {
    this.ChampionForm.reset();
  }
  //methode pour ajouter les champions au DB
  addChampion() {
    if (this.ChampionForm.valid) {
      (this.subscription = this.championS
        .create(this.ChampionForm.value)
        .subscribe((res) => {
          this.addToTable(res);
          this.getchampions();

          Swal.fire({
            title: "Bien Ajouter!!",
            text: "Champion a été ajouté avec succès",
            icon: "success",
          });
          this.closeModal();
        })),
        (error: string) => {
          this.error = error;
          console.error(this.error);
        };
    } else {
      Swal.fire({
        title: "Erreur!!",
        text: "Veuillez Replire tous les champs qui sont obligatoire",
        icon: "error",
      });
    }
  }

  addToTable(champianForm: any) {
    const api = this.data.gridapi;
    api.applyTransaction({ add: [champianForm] });
  }
  //methode pour fermer le modal
  closeModal() {
    this.dialogRef.close();
  }

  //get champions to reload the datatable
  getchampions() {
    this.championS.getAll().subscribe((res: any[]) => {
      this.data.row = res.sort((a, b) => a.id - b.id);
      this.data.gridapi.setRowData(this.data.row);
    }),
      (error: string) => {
        this.error = error;
        console.error(this.error);
      };
  }
}
