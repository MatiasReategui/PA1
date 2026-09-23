import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SolicitudesRoutingModule } from './solicitudes-routing.module';
import { SolicitudListComponent } from './solicitud-list/solicitud-list.component';
import { SolicitudFormComponent } from './solicitud-form/solicitud-form.component';
import { SolicitudDetailComponent } from './solicitud-detail/solicitud-detail.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    SolicitudListComponent,
    SolicitudFormComponent,
    SolicitudDetailComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    SolicitudesRoutingModule
  ]
})
export class SolicitudesModule { }
