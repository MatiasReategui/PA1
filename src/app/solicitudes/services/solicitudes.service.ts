import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Solicitud, TipoSolicitud, NuevaSolicitudDTO } from '../models/solicitud.model';

// Interfaz que describe la forma cruda que devuelve la API pública (JSONPlaceholder)
interface PostApi {
  id: number;
  userId: number;
  title: string;
  body: string;
}

const TIPOS: TipoSolicitud[] = Object.values(TipoSolicitud);
const ESTADOS: Solicitud['estado'][] = ['Pendiente', 'En revisión', 'Aprobada', 'Rechazada'];

// Clave usada en localStorage para persistir las solicitudes creadas localmente
const CLAVE_STORAGE = 'solicitudes-locales';

@Injectable({
  providedIn: 'root'
})
export class SolicitudesService {
  // API REST pública autorizada para la práctica (no requiere backend propio de Node.js,
  // conforme a la nota curricular: ese contenido corresponde a las sesiones 5 a 7).
  private readonly apiUrl = 'https://jsonplaceholder.typicode.com/posts';

  // Almacén local para las solicitudes creadas desde el formulario reactivo, ya que la
  // API pública no persiste datos reales. Se guarda en localStorage para que sobreviva
  // a un refresh de la página (persiste solo en el navegador de quien la creó).
  private solicitudesLocales: Solicitud[] = this.cargarDeStorage();
  private nextLocalId = this.calcularSiguienteId();

  constructor(private http: HttpClient) {}

  obtenerSolicitudes(): Observable<Solicitud[]> {
    return this.http.get<PostApi[]>(this.apiUrl).pipe(
      map((posts) => posts.slice(0, 12).map((post) => this.mapearPostASolicitud(post))),
      map((solicitudesApi) => [...this.solicitudesLocales, ...solicitudesApi])
    );
  }

  obtenerSolicitudPorId(id: number): Observable<Solicitud> {
    const local = this.solicitudesLocales.find((s) => s.id === id);
    if (local) {
      return new Observable((subscriber) => {
        subscriber.next(local);
        subscriber.complete();
      });
    }
    return this.http
      .get<PostApi>(`${this.apiUrl}/${id}`)
      .pipe(map((post) => this.mapearPostASolicitud(post)));
  }

  registrarSolicitud(dto: NuevaSolicitudDTO): Observable<Solicitud> {
    const nueva: Solicitud = {
      id: this.nextLocalId++,
      titulo: dto.titulo,
      tipo: dto.tipo,
      estudianteId: 0,
      estudianteNombre: dto.estudianteNombre,
      descripcion: dto.descripcion,
      fechaRegistro: new Date().toISOString(),
      estado: 'Pendiente'
    };

    return this.http.post<PostApi>(this.apiUrl, {
      title: nueva.titulo,
      body: nueva.descripcion,
      userId: 1
    }).pipe(
      map(() => {
        this.solicitudesLocales = [nueva, ...this.solicitudesLocales];
        this.guardarEnStorage();
        return nueva;
      })
    );
  }

  private mapearPostASolicitud(post: PostApi): Solicitud {
    return {
      id: post.id,
      titulo: post.title,
      tipo: TIPOS[post.id % TIPOS.length],
      estudianteId: post.userId,
      estudianteNombre: `Estudiante ${post.userId}`,
      descripcion: post.body,
      fechaRegistro: new Date().toISOString(),
      estado: ESTADOS[post.id % ESTADOS.length]
    };
  }

  // --- Persistencia en localStorage ---

  private cargarDeStorage(): Solicitud[] {
    try {
      const crudo = localStorage.getItem(CLAVE_STORAGE);
      return crudo ? (JSON.parse(crudo) as Solicitud[]) : [];
    } catch {
      // Si el contenido guardado está corrupto o localStorage no está disponible
      return [];
    }
  }

  private guardarEnStorage(): void {
    try {
      localStorage.setItem(CLAVE_STORAGE, JSON.stringify(this.solicitudesLocales));
    } catch {
      // Falla silenciosa (p. ej. almacenamiento lleno o bloqueado); no interrumpe la app
    }
  }

  private calcularSiguienteId(): number {
    const maximo = this.solicitudesLocales.reduce((max, s) => Math.max(max, s.id), 9999);
    return maximo + 1;
  }
}
