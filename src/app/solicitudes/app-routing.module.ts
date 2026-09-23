import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Ruteo raíz: redirige a /solicitudes y delega el resto al módulo de solicitudes (lazy-friendly)
const routes: Routes = [
  { path: '', redirectTo: 'solicitudes', pathMatch: 'full' },
  { path: 'solicitudes', loadChildren: () => import('./solicitudes/solicitudes.module').then(m => m.SolicitudesModule) },
  { path: '**', redirectTo: 'solicitudes' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
