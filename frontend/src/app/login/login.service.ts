import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface RespuestaLogin {
  mensaje: string;
  usuario?: {
    idUsuario: number;
    nombreUsuario: string;
    privilegiosUsuario: number;
  };
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private readonly urlBase = 'http://localhost:3000/api/login';

  constructor(private http: HttpClient) {}

  iniciarSesion(nombreUsuario: string, claveUsuario: string): Observable<RespuestaLogin> {
    return this.http.post<RespuestaLogin>(this.urlBase, { nombreUsuario, claveUsuario });
  }
}