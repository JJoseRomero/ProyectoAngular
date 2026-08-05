import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Registro de "bitacora" ya combinado con el nombre del usuario
// (viene del JOIN hecho en el backend con la tabla "usuarios").
export interface RegistroBitacora {
  idBitacora: number;
  fechaHoraBitacora: string;
  SoBitacora: string;
  idUsuarioBitacora: number;
  nombreUsuario: string;
}

@Injectable({
  providedIn: 'root'
})
export class BitacoraService {

  private readonly urlBase = 'http://localhost:3000/api/bitacora';

  constructor(private http: HttpClient) {}

  obtenerBitacora(): Observable<RegistroBitacora[]> {
    return this.http.get<RegistroBitacora[]>(this.urlBase);
  }
}