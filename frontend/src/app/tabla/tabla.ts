import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Dato, DatosService } from './datos.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-tabla',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './tabla.html',
  styleUrl: './tabla.css'
})
export class Tabla implements OnInit {

  nombreUsuario: string = '';

  listaDatos = signal<Dato[]>([]);
  filaSeleccionada = signal<Dato | null>(null);
  cargando = signal<boolean>(true);
  errorCarga = signal<string | null>(null);

  mostrarInformacion = signal<boolean>(false);

  constructor(
    private datosService: DatosService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.cargarDeSesion();
    this.nombreUsuario = this.authService.usuarioActual()?.nombreUsuario ?? '';

    this.cargando.set(true);
    this.datosService.obtenerDatos().subscribe({
      next: (datos) => {
        this.listaDatos.set(datos);
        this.cargando.set(false);
      },
      error: (err) => {
        console.error('No se pudo conectar con el backend:', err);
        this.errorCarga.set('No se pudo conectar con el servidor');
        this.cargando.set(false);
      }
    });
  }

  seleccionarFila(dato: Dato): void {
    this.filaSeleccionada.set(dato);
  }

  desplegarInformacion(): void {
    if (this.filaSeleccionada()) {
      this.mostrarInformacion.set(true);
    }
  }

  regresar(): void {
    this.mostrarInformacion.set(false);
  }
}