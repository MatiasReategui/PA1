[README.md](https://github.com/user-attachments/files/32546766/README.md)
# Plataforma de Gestión de Solicitudes Académicas

**Curso:** Programación Web II (Código 30690) — ISIL
**Evaluación:** PA1 — Proceso de Aprendizaje 1 (Sesiones 1 a 4)
**Periodo académico:** 202620
**Ponderación:** 15%

## Integrantes

| N° | Nombre completo | Rol | Participación |
|----|------------------|-----|----------------|
| 1  | Matías Reategui | TypeScript / Modelos | Actividad 1 |
| 2  | Enzo Rodrigo Alvarado Vera | Base del proyecto y Componentes Angular | Actividad 2 |
| 3  | Christian Paolo Vera Palomino | Formulario reactivo y Rutas | Actividad 3 |
| 4  | José Stuart Fonseca Vega | Servicio HttpClient / Consumo de API | Actividad 4 |

## Descripción

Frontend en **Angular 16 + TypeScript** para el caso progresivo "Plataforma de Gestión de
Solicitudes Académicas". Permite **registrar**, **listar**, **filtrar** y **visualizar el detalle**
de solicitudes académicas (constancias, rectificaciones, traslados, retiros de curso, etc.),
consumiendo una API REST pública mediante `HttpClient`. Conforme a la nota curricular de la PA1,
**no se implementa backend propio en Node.js**, ya que corresponde a las sesiones 5 a 7.

## Objetivo

Evidenciar el dominio de JavaScript ES6+, TypeScript, componentes y módulos Angular, formularios
reactivos con validaciones, RouterModule y consumo de una API REST con HttpClient, dentro de una
solución modular y justificada.

## Desarrollo y solución propuesta

- **Actividad 1 — Base tipada y modular** (`src/app/solicitudes/models`, `.../utils`):
  interfaces (`Solicitud`, `Estudiante`), enum (`TipoSolicitud`), tipo literal (`EstadoSolicitud`)
  y funciones utilitarias con destructuring, spread, arrow functions, template literals,
  optional chaining y nullish coalescing.
- **Actividad 2 — Arquitectura de componentes Angular**: módulo `SolicitudesModule` con los
  componentes `SolicitudListComponent`, `SolicitudFormComponent` y `SolicitudDetailComponent`,
  data binding (interpolación, `*ngFor`, `*ngIf`, `[ngClass]`), una directiva de atributo
  personalizada (`ResaltarDirective`) y el servicio `SolicitudesService` inyectado por
  constructor en cada componente.
- **Actividad 3 — Formulario reactivo, validaciones y navegación**: `SolicitudFormComponent`
  usa `FormBuilder`/`FormGroup` con `Validators` (required, minLength, maxLength) y muestra
  mensajes de error específicos. La navegación entre vistas se configura con `RouterModule`
  (`app-routing.module.ts` y `solicitudes-routing.module.ts`, con carga diferida del módulo).
- **Actividad 4 — Consumo de API REST con HttpClient**: `SolicitudesService` usa `HttpClient`
  para consumir `https://jsonplaceholder.typicode.com/posts` (API pública autorizada para la
  práctica), mapea la respuesta al modelo tipado `Solicitud` y expone métodos para listar,
  obtener por id y registrar solicitudes. El registro combina la llamada HTTP con un almacén
  local en memoria, dado que la API pública no persiste datos reales.

## Estructura del proyecto

```
src/app/
├── app.component.*            # Shell de la aplicación
├── app-routing.module.ts      # Ruteo raíz (lazy loading de SolicitudesModule)
├── nav-bar/                   # Barra de navegación
├── shared/
│   ├── resaltar.directive.ts  # Directiva de atributo personalizada
│   └── shared.module.ts
└── solicitudes/
    ├── models/solicitud.model.ts
    ├── utils/solicitud.utils.ts
    ├── services/solicitudes.service.ts
    ├── solicitud-list/
    ├── solicitud-form/
    ├── solicitud-detail/
    ├── solicitudes.module.ts
    └── solicitudes-routing.module.ts
```

## Cómo ejecutar el proyecto

Requisitos: Node.js 18+ y npm.

```bash
npm install
npm start        # equivalente a: ng serve
```

Luego abrir `http://localhost:4200` en el navegador. Compilación de producción:

```bash
npm run build     # genera dist/plataforma-solicitudes-academicas
```

## Cómo revisar el proyecto

1. Clonar el repositorio y ejecutar `npm install`.
2. Ejecutar `npm start` y navegar por `/solicitudes` (listado y filtro por estado),
   `/solicitudes/nueva` (formulario reactivo) y `/solicitudes/:id` (detalle).
3. Revisar el código fuente indicado en la sección "Desarrollo y solución propuesta"
   para verificar cada aprendizaje evaluado.

## Evidencias

Las evidencias se encuentran en la carpeta evidencias :D

## Conclusiones del equipo

El desarrollo de esta primera etapa del caso "Plataforma de Gestión de Solicitudes Académicas"
permitió al equipo aplicar de manera integrada los contenidos revisados durante las sesiones 1
a 4 del curso, pasando de conceptos teóricos a una solución funcional y verificable.

- **TypeScript y JavaScript moderno:** tipar las entidades del caso (`Solicitud`, `TipoSolicitud`,
  `EstadoSolicitud`) desde el inicio ayudó a detectar errores en tiempo de desarrollo, antes de
  ejecutar la aplicación, y obligó al equipo a pensar primero en el modelo de datos antes que en
  la interfaz. El uso de destructuring, spread operator, arrow functions y optional chaining hizo
  el código más corto y legible frente a una implementación equivalente en JavaScript tradicional.
- **Componentes y arquitectura Angular:** separar la aplicación en un módulo de solicitudes con
  tres componentes independientes (listado, formulario y detalle) mostró la importancia de dividir
  responsabilidades: cada componente se encarga de una sola pantalla y delega el acceso a datos al
  servicio inyectado, en vez de mezclar lógica de negocio con la vista. La directiva personalizada
  reforzó cómo Angular permite extender el comportamiento del DOM sin escribir JavaScript manual.
- **Formularios reactivos y rutas:** trabajar con `FormBuilder` y `Validators` evidenció una
  ventaja clara frente a los formularios basados en plantillas: las validaciones y su estado
  (válido/inválido/tocado) se manejan de forma centralizada en el componente, lo que facilita
  mostrar mensajes de error específicos por campo. Configurar las rutas con `RouterModule`,
  además, permitió navegar entre el listado, el registro y el detalle sin recargar la página,
  simulando el comportamiento de una aplicación real de una sola página (SPA).
- **Consumo de API REST con HttpClient:** integrar `HttpClient` para consumir una API externa
  dejó en evidencia la importancia de mapear los datos crudos de una API hacia el modelo propio
  del dominio, en vez de usar la respuesta "tal cual" en los componentes. También fue necesario
  resolver un problema práctico no contemplado inicialmente: como la API pública utilizada no
  persiste datos reales, las solicitudes creadas se perdían al refrescar la página, lo que llevó
  al equipo a incorporar `localStorage` como mecanismo de persistencia local.

Como equipo, el mayor aprendizaje transversal fue el de coordinar un desarrollo modular entre
varios integrantes: al dividir el trabajo por carpetas y responsabilidades claras (modelos,
componentes, formularios/rutas y servicios), fue posible avanzar en paralelo sin generar
conflictos al integrar el código en el repositorio compartido. Esta base tipada y modular deja
al proyecto listo para la siguiente etapa del caso, en la que se integrará un backend propio
construido con Node.js.
