import { Injectable, signal } from '@angular/core';
import { PERMISOS } from './permisos';

export interface UsuarioAutenticado {
  idUsuario: number;
  nombreUsuario: string;
  privilegiosUsuario: number;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  usuarioActual = signal<UsuarioAutenticado | null>(null);

  establecerUsuario(usuario: UsuarioAutenticado): void {
    this.usuarioActual.set(usuario);
    sessionStorage.setItem('usuario', JSON.stringify(usuario));
  }

  cargarDeSesion(): void {
    const guardado = sessionStorage.getItem('usuario');
    if (guardado) {
      this.usuarioActual.set(JSON.parse(guardado));
    }
  }

  private tienePermiso(bit: number): boolean {
    const valor = this.usuarioActual()?.privilegiosUsuario ?? 0;
    return (valor & bit) === bit;
  }

  esAdministrador(): boolean {
    return this.tienePermiso(PERMISOS.ADMINISTRADOR);
  }

  // Funcionalidad aún no implementada: bloqueado para todos por ahora
  puedeNuevoDato(): boolean {
    return false;
  }

  // Desplegar siempre disponible para cualquier usuario logueado
  puedeDesplegar(): boolean {
    return true;
  }

  // Funcionalidad aún no implementada: bloqueado para todos por ahora
  puedeEditar(): boolean {
    return false;
  }

  // Funcionalidad aún no implementada: bloqueado para todos por ahora
  puedeEliminar(): boolean {
    return false;
  }

  cerrarSesion(): void {
    this.usuarioActual.set(null);
    sessionStorage.removeItem('usuario');
  }
}