import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

// Interfaz que respeta EXACTAMENTE los nombres y tipos de columnas
// de la tabla "datos" de la base de datos "framework".
// idDato int(11), nombreDato varchar(100), edadDato tinyint(4),
// sexoDato tinyint(4), fechaNacimientoDato date, correoDato varchar(100)
export interface Dato {
  idDato: number;
  nombreDato: string;
  edadDato: number;
  sexoDato: number;
  fechaNacimientoDato: string;
  correoDato: string;
}

@Component({
  selector: 'app-datos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tabla.html',
  styleUrl: './tabla.css'
})
export class Tabla {

  // Usuario que inició sesión (vendrá del login / servicio de autenticación)
  nombreUsuario: string = 'Maria del Carmen Perez';

  // Datos de ejemplo, solo para mostrar la estructura de la tabla.
  // Cuando se conecte el backend (Node.js) esta lista se llenará
  // desde el servicio que consulte la tabla "datos".
  listaDatos: Dato[] = [
    { idDato: 1, nombreDato: 'BUELNA SALAZAR IVAN DE JESUS', edadDato: 22, sexoDato: 1, fechaNacimientoDato: '2003-04-10', correoDato: 'ivan.buelna@correo.com' },
    { idDato: 2, nombreDato: 'CARVAJAL BLANCAS JORGE ADRIAN', edadDato: 21, sexoDato: 1, fechaNacimientoDato: '2004-02-18', correoDato: 'jorge.carvajal@correo.com' },
    { idDato: 3, nombreDato: 'CORONA CALVARIO JESUS SALVADOR', edadDato: 23, sexoDato: 1, fechaNacimientoDato: '2002-11-05', correoDato: 'jesus.corona@correo.com' },
    { idDato: 4, nombreDato: 'DIAZ CASTOR AARON', edadDato: 20, sexoDato: 1, fechaNacimientoDato: '2005-06-30', correoDato: 'aaron.diaz@correo.com' },
    { idDato: 5, nombreDato: 'GARCIA AVILA DIEGO ARTURO', edadDato: 22, sexoDato: 1, fechaNacimientoDato: '2003-09-12', correoDato: 'diego.garcia@correo.com' },
    { idDato: 6, nombreDato: 'GARCIA GARCIA RAMON', edadDato: 24, sexoDato: 1, fechaNacimientoDato: '2001-12-01', correoDato: 'ramon.garcia@correo.com' },
    { idDato: 7, nombreDato: 'JAIMES VERA ULISES', edadDato: 21, sexoDato: 1, fechaNacimientoDato: '2004-05-22', correoDato: 'ulises.jaimes@correo.com' },
    { idDato: 8, nombreDato: 'LOPEZ TORRES JORGE IVAN', edadDato: 20, sexoDato: 1, fechaNacimientoDato: '2005-01-15', correoDato: 'jorge.lopez@correo.com' },
    { idDato: 9, nombreDato: 'PINACHO CARRANZA ABNER ABSALON', edadDato: 23, sexoDato: 1, fechaNacimientoDato: '2002-08-08', correoDato: 'abner.pinacho@correo.com' },
    { idDato: 10, nombreDato: 'RAMIREZ MILAGRO DANIEL', edadDato: 22, sexoDato: 1, fechaNacimientoDato: '2003-03-27', correoDato: 'daniel.ramirez@correo.com' },
    { idDato: 11, nombreDato: 'BUELNA SALAZAR IVAN DE JESUS', edadDato: 22, sexoDato: 1, fechaNacimientoDato: '2003-04-10', correoDato: 'ivan.buelna2@correo.com' },
    { idDato: 12, nombreDato: 'CARVAJAL BLANCAS JORGE ADRIAN', edadDato: 21, sexoDato: 1, fechaNacimientoDato: '2004-02-18', correoDato: 'jorge.carvajal2@correo.com' }
  ];

  // Fila seleccionada actualmente (como se ve resaltada en la imagen)
  filaSeleccionada: Dato | null = this.listaDatos.find(d => d.idDato === 7) ?? null;

  // Al hacer clic en una fila solo se marca como seleccionada.
  // No dispara ninguna otra función (eso se conectará después).
  seleccionarFila(dato: Dato): void {
    this.filaSeleccionada = dato;
  }
}