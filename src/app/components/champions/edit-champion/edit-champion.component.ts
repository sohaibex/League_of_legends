import { Component, Inject, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { IChampionsModel } from "src/app/core/models/champions.model";
import { ChampionService } from "src/app/core/service/champion.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-edit-champion",
  templateUrl: "./edit-champion.component.html",
  styleUrls: ["./edit-champion.component.scss"],
})
export class EditChampionComponent implements OnInit {
  // ! operateur pour dire au compilateur que ChampionForm peut prendre une autre valeur que null ou undifined
  ChampionForm!: FormGroup;
  tags!: IChampionsModel[];
  error?: string;
  selectedTags!: IChampionsModel[];
  rowNode: any;
  champions: IChampionsModel;
  rowData: any[];
  constructor(
    private championS: ChampionService,
    private dialogRef: MatDialogRef<EditChampionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.ChampionForm = new FormGroup({
      id: new FormControl(this.data.id),
      name: new FormControl(null, [Validators.required]),
      title: new FormControl(null, [Validators.required]),
      tags: new FormControl(null),
      key: new FormControl(null),
    });
  }

  ngOnInit(): void {
    this.championS.getById(this.data.selectedId).subscribe((res: any) => {
      this.champions = res;
      this.ChampionForm = new FormGroup({
        id: new FormControl(res["id"]),
        name: new FormControl(res["name"]),
        title: new FormControl(res["title"]),
        key: new FormControl(res["key"]),
        tags: new FormControl(res["tags"]),
      });
    });

    this.getTags();
  }

  //method f pour récupérer les controles
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
    });
  }
  //Methode pour renitailiser le formulaire
  reset() {
    this.ChampionForm.reset();
  }
  //methode pour fermer le modal
  closeModal() {
    this.reset();
    this.dialogRef.close();
  }

  //methode pour ajouter les champions au DB
  updateChampion() {
    if (this.ChampionForm.valid) {
      const championD: IChampionsModel = {
        ...this.champions,
        ...this.ChampionForm.value,
      };

      this.championS.update(championD).subscribe(() => {
        this.getchampions();
        Swal.fire({
          title: "Bien Modifier!!",
          text: "Champion a été modifié avec succès",
          icon: "success",
        });
      }),
        (error: string) => {
          this.error = error;
          console.error(this.error);
        };
      //this.updateTable(this.ChampionForm.value);
    } else {
      Swal.fire({
        title: "Erreur!!",
        text: "Veuillez Replire tous les champs qui sont obligatoire",
        icon: "error",
      });
    }
  }
  getchampions() {
    this.championS.getAll().subscribe((res: any[]) => {
      this.data.datachamp = res.sort((a, b) => a.id - b.id);

       this.data.gridapi.setRowData(this.data.datachamp);
    }),
      (error: string) => {
        this.error = error;
        console.error(this.error);
      };
  }

}
