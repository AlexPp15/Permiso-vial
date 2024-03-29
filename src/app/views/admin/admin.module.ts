import { AdminRoutingModule } from './admin-routing.module';
import { NgModule } from '@angular/core';

import { SharedModule } from 'src/app/shared/shared.module';

import { LoginComponent } from './components/LOGIN/login/login.component';
import { MenuCompartidoComponent } from './components/menu-compartido/menu-compartido.component';
import { IndexComponent } from './components/index/index.component';

import { ActualizarComponent } from 'src/app/shared/components/footer-admin/actualizar/actualizar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LogoComponent } from 'src/app/shared/components/sidenav-admin/logo/logo.component';
import { CommonModule } from '@angular/common';
import { PermisosComponent } from './components/permisos/permisos.component';
import { PermisoComponent } from './components/permiso/permiso.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { InicioComponent } from './components/inicio/inicio.component';

@NgModule({
  declarations: [
    LoginComponent,
    MenuCompartidoComponent,
    IndexComponent,
    ActualizarComponent,
    LogoComponent,
    PermisosComponent,
    PermisoComponent,
    InicioComponent,

  ],

  imports: [AdminRoutingModule, SharedModule, ReactiveFormsModule,CommonModule,NgxPaginationModule],
})
export class AdminModule {}
