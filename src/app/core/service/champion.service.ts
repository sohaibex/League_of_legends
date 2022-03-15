import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/internal/Observable";

import { throwError } from "rxjs/internal/observable/throwError";
import { catchError } from "rxjs/internal/operators/catchError";
import Swal from "sweetalert2";
import { IChampionsModel } from "../models/champions.model";

const cudOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" }),
};

@Injectable({
  providedIn: "root",
})
export class ChampionService {
  constructor(private http: HttpClient) {}
  private readonly url = "api/champions";
  //get all champions
  getAll(): Observable<IChampionsModel[]> {
    return this.http.get<any>(this.url).pipe(catchError(this.handleError));
  }

  //get one champion By id
  getById(id: number): Observable<IChampionsModel[]> {
    return this.http
      .get<IChampionsModel[]>(this.url + "/" + id)
      .pipe(catchError(this.handleError));
  }

  //creat a champion
  create(champion: IChampionsModel): Observable<IChampionsModel[]> {
    champion = {
      ...champion,
      id: null,
    };
    return this.http
      .post<IChampionsModel[]>(this.url, champion, cudOptions)
      .pipe(catchError(this.handleError));
  }
  //update a champion
  update(champion: IChampionsModel): Observable<IChampionsModel> {
    const url = `${this.url}/${champion.id}`;
    return this.http
      .put<IChampionsModel>(url, champion)
      .pipe(catchError(this.handleError));
  }
  //delete a champion
  delete(id: number): Observable<{}> {
    const url = `${this.url}/${id}`;
    return this.http
      .delete<IChampionsModel>(url, cudOptions)
      .pipe(catchError(this.handleError));
  }
  getDefaultHotel(): IChampionsModel {
    return {
      id: 0,
      tags: [],
      title: "",
      key: "",
      name: "",
    };
  }
  //methode qui permet de handler les erreurs
  private handleError(err: HttpErrorResponse) {
    if (err.error instanceof ErrorEvent) {
      // A client-side
      Swal.fire({
        title: "Failed!!",
        text: `An error occurred: ${err.error.message}`,
        icon: "error",
      });
    } else {
      //  backend erreur
      Swal.fire({
        title: "Failed!!",
        text:
          `Backend returned code ${err.status}, ` + `body was: ${err.error}`,
        icon: "error",
      });
    }

    return throwError("veuillez réessayer plus tard.");
  }
}
