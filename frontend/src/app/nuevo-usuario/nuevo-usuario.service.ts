import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface NuevoUsuarioPayload {
  nombreUsuario: string;
  claveUsuario: string;
  privilegiosUsuario: number;
}

@Injectable({
  providedIn: 'root'
})
export class NuevoUsuarioService {
  private urlApi = 'http://localhost:3000/api/usuarios';

  constructor(private http: HttpClient) {}

  crearUsuario(usuario: NuevoUsuarioPayload): Observable<any> {
    return this.http.post(this.urlApi, usuario);
  }
}