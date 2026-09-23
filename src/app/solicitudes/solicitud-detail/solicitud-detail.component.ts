import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Solicitud } from '../models/solicitud.model';
import { SolicitudesService } from '../services/solicitudes.service';
import { resumenEstudiante } from '../utils/solicitud.utils';

/**
 * Actividad 2/3: componente que obtiene el parámetro de ruta (:id) inyectado
 * por ActivatedRoute y consulta el servicio para mostrar el detalle.
 */
@Component({
  selector: 'app-solicitud-detail',
  templateUrl: './solicitud-detail.component.html',
  styleUrls: ['./solicitud-detail.component.css']
})
export class SolicitudDetailComponent implements OnInit {
  solicitud: Solicitud | null = null;
  cargando = true;
  error = '';
  resumenEstudiante = resumenEstudiante;

  constructor(
    private route: ActivatedRoute,
    private solicitudesService: SolicitudesService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.solicitudesService.obtenerSolicitudPorId(id).subscribe({
      next: (s) => {
        this.solicitud = s;
        this.cargando = false;
      },
      error: () => {
        this.error = 'No se encontró la solicitud solicitada.';
        this.cargando = false;
      }
    });
  }
}
