import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NuevoUsuarioService } from './nuevo-usuario.service';
import { PERMISOS } from '../permisos';

@Component({
  selector: 'app-nuevo-usuario',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './nuevo-usuario.html',
  styleUrl: './nuevo-usuario.css'
})
export class NuevoUsuario {
  usuario: string = '';
  contrasena: string = '';
  mostrarContrasena: boolean = false;

  privilegios = {
    nuevoDato: false,
    administrador: false,
    desplegar: false,
    editar: false,
    eliminar: false
  };

  guardando = signal<boolean>(false);
  mensajeError = signal<string | null>(null);
  mensajeExito = signal<string | null>(null);

  constructor(
    private nuevoUsuarioService: NuevoUsuarioService,
    private router: Router
  ) {}

  toggleContrasena(): void {
    this.mostrarContrasena = !this.mostrarContrasena;
  }

  private calcularBitmask(): number {
    let valor = 0;
    if (this.privilegios.administrador) valor += PERMISOS.ADMINISTRADOR;
    if (this.privilegios.nuevoDato) valor += PERMISOS.NUEVO_DATO;
    if (this.privilegios.desplegar) valor += PERMISOS.DESPLEGAR;
    if (this.privilegios.editar) valor += PERMISOS.EDITAR;
    if (this.privilegios.eliminar) valor += PERMISOS.ELIMINAR;
    return valor;
  }

  almacenar(): void {
    this.mensajeError.set(null);
    this.mensajeExito.set(null);

    if (!this.usuario || !this.contrasena) {
      this.mensajeError.set('Usuario y contraseña son obligatorios');
      return;
    }

    this.guardando.set(true);

    this.nuevoUsuarioService.crearUsuario({
      nombreUsuario: this.usuario,
      claveUsuario: this.contrasena,
      privilegiosUsuario: this.calcularBitmask()
    }).subscribe({
      next: () => {
        this.guardando.set(false);
        this.mensajeExito.set('Usuario creado correctamente');
        this.usuario = '';
        this.contrasena = '';
        this.privilegios = {
          nuevoDato: false,
          administrador: false,
          desplegar: false,
          editar: false,
          eliminar: false
        };
      },
      error: (err) => {
        this.guardando.set(false);
        if (err.status === 409) {
          this.mensajeError.set('Ese nombre de usuario ya existe');
        } else {
          this.mensajeError.set('No se pudo crear el usuario');
        }
      }
    });
  }
}