import { Component, Inject, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { ChampionsData } from "src/app/core/api/champions.service";
import { IChampionsModel } from "src/app/core/models/champions.model";
import { ChampionService } from "src/app/core/service/champion.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-add-champions",
  templateUrl: "./add-champions.component.html",
  styleUrls: ["./add-champions.component.scss"],
})
export class AddChampionsComponent implements OnInit {
  // ! operateur pour dire au compilateur que ChampionForm peut prendre une autre valeur que null ou undifined
  ChampionForm!: FormGroup;
  champions: Array<any> = [];
  tags!: IChampionsModel[];
  error?: string;
  selectedTags!: IChampionsModel[];
  generatedId?: number;
  constructor(
    private championS: ChampionService,
    private dialogRef: MatDialogRef<AddChampionsComponent>,
    private dataS: ChampionsData,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    this.generatedId = this.dataS.genId(this.data.row);
    this.ChampionForm = new FormGroup({
      id: new FormControl(this.generatedId),
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
    this.championS.getAll().subscribe((data: any) => {
      this.tags = data.map((o: any) => {
        for (let i in o.tags) {
          arr.push(o.tags[i]);
        }
      });
      this.tags = [...new Set(arr)];
      console.log(this.tags);
    });
  }
  //Methode pour renitailiser le formulaire
  reset() {
    this.ChampionForm.reset();
  }
  //methode pour ajouter les champions au DB
  addChampion() {
    if (this.ChampionForm.valid) {
      this.addToTable(this.ChampionForm.value);
      this.closeModal();
      this.championS.create(this.ChampionForm.value).subscribe(() => {
        Swal.fire({
          title: "Bien Ajouter!!",
          text: "Champion a été ajouté avec succès",
          icon: "success",
        });
      }),
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
    this.reset();
    this.dialogRef.close();
  }
}