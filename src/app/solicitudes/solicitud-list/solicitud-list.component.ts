import { Component, OnInit } from '@angular/core';
import { Solicitud, EstadoSolicitud } from '../models/solicitud.model';
import { SolicitudesService } from '../services/solicitudes.service';
import { contarPorEstado, etiquetaSolicitud, filtrarPorEstado } from '../utils/solicitud.utils';

/**
 * Actividad 2: componente Angular que consume el servicio inyectado
 * y usa data binding (interpolación, *ngFor, *ngIf) para mostrar las solicitudes.
 */
@Component({
  selector: 'app-solicitud-list',
  templateUrl: './solicitud-list.component.html',
  styleUrls: ['./solicitud-list.component.css']
})
export class SolicitudListComponent implements OnInit {
  todasLasSolicitudes: Solicitud[] = [];
  solicitudesVisibles: Solicitud[] = [];
  cargando = true;
  error = '';
  filtroEstado: EstadoSolicitud | 'Todos' = 'Todos';
  resumenPorEstado: Record<string, number> = {};
  etiquetaSolicitud = etiquetaSolicitud;
  readonly estadosDisponibles: EstadoSolicitud[] = ['Pendiente', 'En revisión', 'Aprobada', 'Rechazada'];

  // Inyección de dependencias del servicio (Actividad 2)
  constructor(private solicitudesService: SolicitudesService) {}

  ngOnInit(): void {
    this.cargarSolicitudes();
  }

  cargarSolicitudes(): void {
    this.cargando = true;
    this.error = '';
    this.solicitudesService.obtenerSolicitudes().subscribe({
      next: (lista) => {
        this.todasLasSolicitudes = lista;
        this.resumenPorEstado = contarPorEstado(lista);
        this.aplicarFiltro();
        this.cargando = false;
      },
      error: () => {
        this.error = 'No se pudo obtener la información desde la API REST.';
        this.cargando = false;
      }
    });
  }

  filtrar(estado: EstadoSolicitud | 'Todos'): void {
    this.filtroEstado = estado;
    this.aplicarFiltro();
  }

  private aplicarFiltro(): void {
    this.solicitudesVisibles =
      this.filtroEstado === 'Todos'
        ? this.todasLasSolicitudes
        : filtrarPorEstado(this.todasLasSolicitudes, this.filtroEstado);
  }
}
