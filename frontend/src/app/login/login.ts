import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  nombreUsuario: string = '';
  claveUsuario: string = '';
  mensajeError = signal<string | null>(null);
  cargando = signal<boolean>(false);

  constructor(private loginService: LoginService, private router: Router) {}

  iniciarSesion(): void {
    this.mensajeError.set(null);

    if (!this.nombreUsuario || !this.claveUsuario) {
      this.mensajeError.set('Ingresa usuario y contraseña');
      return;
    }

    this.cargando.set(true);

    this.loginService.iniciarSesion(this.nombreUsuario, this.claveUsuario).subscribe({
      next: () => {
        this.cargando.set(false);
        // Login correcto -> se manda a la ventana de Datos
        this.router.navigate(['/tabla']);
      },
      error: (err) => {
        this.cargando.set(false);
        if (err.status === 401) {
          this.mensajeError.set('Usuario o contraseña incorrectos');
        } else {
          this.mensajeError.set('No se pudo conectar con el servidor');
        }
      }
    });
  }
}
