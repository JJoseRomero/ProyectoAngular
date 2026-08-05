import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RegistroBitacora, BitacoraService } from './bitacora.service';

@Component({
  selector: 'app-bitacora',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bitacora.html',
  styleUrl: './bitacora.css'
})
export class Bitacora implements OnInit {

  registros = signal<RegistroBitacora[]>([]);
  cargando = signal<boolean>(true);
  errorCarga = signal<string | null>(null);

  private readonly mesesEs = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];

  constructor(private bitacoraService: BitacoraService, private router: Router) {}

  ngOnInit(): void {
    this.cargando.set(true);
    this.bitacoraService.obtenerBitacora().subscribe({
      next: (datos) => {
        this.registros.set(datos);
        this.cargando.set(false);
      },
      error: (err) => {
        console.error('No se pudo conectar con el backend:', err);
        this.errorCarga.set('No se pudo conectar con el servidor');
        this.cargando.set(false);
      }
    });
  }

  // Da formato dd-mmm-aaaa (ej. 06-jun-2026) sin depender de
  // configuración de locale de Angular.
  formatearFecha(fechaHora: string): string {
    const fecha = new Date(fechaHora);
    const dia = String(fecha.getDate()).padStart(2, '0');
    const mes = this.mesesEs[fecha.getMonth()];
    const anio = fecha.getFullYear();
    return `${dia}-${mes}-${anio}`;
  }

  regresar(): void {
    this.router.navigate(['/tabla']);
  }
}