import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

//interfaz de la base de datos
export interface Dato {
  idDato: number;
  nombreDato: string;
  edadDato: number;
  sexoDato: number;
  fechaNacimientoDato: string;
  correoDato: string;
}

@Injectable({
  providedIn: 'root'
})
export class DatosService {

  private readonly urlBase = 'http://localhost:3000/api/datos';

  constructor(private http: HttpClient) {}

  obtenerDatos(): Observable<Dato[]> {
    return this.http.get<Dato[]>(this.urlBase);
  }
}