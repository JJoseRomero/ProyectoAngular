import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Dato, DatosService } from './datos.service';

@Component({
  selector: 'app-tabla',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tabla.html',
  styleUrl: './tabla.css'
})
export class Tabla implements OnInit {

  // Usuario que inició sesión (vendrá del login / servicio de autenticación)
  nombreUsuario: string = 'Maria del Carmen Perez';

  listaDatos = signal<Dato[]>([]);
  filaSeleccionada = signal<Dato | null>(null);
  cargando = signal<boolean>(true);
  errorCarga = signal<string | null>(null);

  constructor(private datosService: DatosService) {}

  ngOnInit(): void {
    this.cargando.set(true);
    this.datosService.obtenerDatos().subscribe({
      next: (datos) => {
        console.log('Datos recibidos:', datos);
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
}