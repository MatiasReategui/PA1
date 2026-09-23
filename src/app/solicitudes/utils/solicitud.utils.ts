import { EstadoSolicitud, Solicitud } from '../models/solicitud.model';

/**
 * Utilidades ES6+ para trabajar con solicitudes.
 * Se documenta cada recurso moderno de JavaScript utilizado.
 */

// Arrow function + template literals: genera una etiqueta legible para la UI
export const etiquetaSolicitud = (s: Solicitud): string =>
  `#${s.id} · ${s.titulo} (${s.estado})`;

// Destructuring de parámetros + valores por defecto
export const resumenEstudiante = ({ estudianteNombre, tipo }: Pick<Solicitud, 'estudianteNombre' | 'tipo'>): string =>
  `${estudianteNombre} solicitó: ${tipo}`;

// Spread operator: crea una copia actualizada de una solicitud sin mutar el original
export const actualizarEstado = (solicitud: Solicitud, nuevoEstado: EstadoSolicitud): Solicitud => ({
  ...solicitud,
  estado: nuevoEstado
});

// Métodos modernos de arrays (filter/map/reduce) + arrow functions
export const filtrarPorEstado = (lista: Solicitud[], estado: EstadoSolicitud): Solicitud[] =>
  lista.filter((s) => s.estado === estado);

export const contarPorEstado = (lista: Solicitud[]): Record<string, number> =>
  lista.reduce((acumulado: Record<string, number>, s) => {
    acumulado[s.estado] = (acumulado[s.estado] ?? 0) + 1;
    return acumulado;
  }, {});

// Optional chaining + nullish coalescing
export const nombreCortoEstudiante = (s?: Solicitud): string =>
  s?.estudianteNombre?.split(' ')[0] ?? 'Sin asignar';
