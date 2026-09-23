import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TipoSolicitud } from '../models/solicitud.model';
import { SolicitudesService } from '../services/solicitudes.service';

/**
 * Actividad 3: formulario reactivo con validaciones relacionadas al caso
 * (campos obligatorios, longitud mínima) y navegación mediante RouterModule
 * tras un registro exitoso.
 */
@Component({
  selector: 'app-solicitud-form',
  templateUrl: './solicitud-form.component.html',
  styleUrls: ['./solicitud-form.component.css']
})
export class SolicitudFormComponent {
  tipos = Object.values(TipoSolicitud);
  enviando = false;
  enviadoConExito = false;
  errorEnvio = '';

  formulario: FormGroup = this.fb.group({
    estudianteNombre: ['', [Validators.required, Validators.minLength(3)]],
    tipo: [this.tipos[0], [Validators.required]],
    titulo: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(80)]],
    descripcion: ['', [Validators.required, Validators.minLength(15)]]
  });

  constructor(
    private fb: FormBuilder,
    private solicitudesService: SolicitudesService,
    private router: Router
  ) {}

  // Getters para acceder fácilmente a los controles desde la plantilla
  get estudianteNombre() { return this.formulario.get('estudianteNombre'); }
  get tipo() { return this.formulario.get('tipo'); }
  get titulo() { return this.formulario.get('titulo'); }
  get descripcion() { return this.formulario.get('descripcion'); }

  enviar(): void {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }

    this.enviando = true;
    this.errorEnvio = '';

    this.solicitudesService.registrarSolicitud(this.formulario.value).subscribe({
      next: (nueva) => {
        this.enviando = false;
        this.enviadoConExito = true;
        setTimeout(() => this.router.navigate(['/solicitudes', nueva.id]), 900);
      },
      error: () => {
        this.enviando = false;
        this.errorEnvio = 'Ocurrió un error al registrar la solicitud en la API REST.';
      }
    });
  }
}
