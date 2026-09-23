/**
 * Actividad 1 — Base tipada y modular del caso.
 * Define las entidades principales de "Plataforma de Gestión de Solicitudes Académicas"
 * usando TypeScript (interfaces, enums, tipos literales) y recursos de JavaScript ES6+.
 */

// Enum: restringe los valores posibles de tipo de solicitud (tipado estático)
export enum TipoSolicitud {
  CONSTANCIA = 'Constancia de estudios',
  RECTIFICACION_NOTA = 'Rectificación de nota',
  TRASLADO_INTERNO = 'Traslado interno',
  RETIRO_CURSO = 'Retiro de curso',
  CONVALIDACION = 'Convalidación'
}

// Tipo literal (union type) para el estado del flujo de una solicitud
export type EstadoSolicitud = 'Pendiente' | 'En revisión' | 'Aprobada' | 'Rechazada';

// Interfaz principal de la entidad Solicitud
export interface Solicitud {
  id: number;
  titulo: string;
  tipo: TipoSolicitud;
  estudianteId: number;
  estudianteNombre: string;
  descripcion: string;
  fechaRegistro: string; // ISO string
  estado: EstadoSolicitud;
}

// Interfaz auxiliar usada por el formulario reactivo (sin id ni metadatos generados por el sistema)
export interface NuevaSolicitudDTO {
  titulo: string;
  tipo: TipoSolicitud;
  estudianteNombre: string;
  descripcion: string;
}

// Interfaz para la entidad Estudiante (referenciada por una solicitud)
export interface Estudiante {
  id: number;
  nombreCompleto: string;
  codigo: string;
  carrera: string;
}
