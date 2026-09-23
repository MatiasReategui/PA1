import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SolicitudListComponent } from './solicitud-list/solicitud-list.component';
import { SolicitudFormComponent } from './solicitud-form/solicitud-form.component';
import { SolicitudDetailComponent } from './solicitud-detail/solicitud-detail.component';

// Actividad 3: configuración de rutas mediante RouterModule
const routes: Routes = [
  { path: '', component: SolicitudListComponent },
  { path: 'nueva', component: SolicitudFormComponent },
  { path: ':id', component: SolicitudDetailComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SolicitudesRoutingModule { }
