

import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { CommonModule } from '@angular/common';

import { LoginComponent } from '../LOGIN/login/login.component';


import { IndexComponent } from '../index/index.component';

import { LogoComponent } from 'src/app/shared/components/sidenav-admin/logo/logo.component';

import { ActualizarComponent } from 'src/app/shared/components/footer-admin/actualizar/actualizar.component';


import { AuthEGuard } from 'src/app/core/guard/authE.guard';
import { PermisosComponent } from '../permisos/permisos.component';
import { ConferenciaComponent } from '../conferencia/conferencia.component';
import { ConstComponent } from '../conferencia/constancias/constancias.component';
import { PermisoComponent } from '../permiso/permiso.component';
import { InicioComponent } from '../inicio/inicio.component';


const routes: Routes = [
  /*{
    path: '',
    component: DashboardComponent,
  },*/
  {

    path: 'login',
    component: LoginComponent
  },
  {

    path: 'inicio',
    component: InicioComponent
  },
  {
    path: 'indice',
    component: IndexComponent,
    canActivate:[AuthEGuard],
  },
  {
    path: 'logo',
    component: LogoComponent
  },
  {
    path:'pie-de-pagina/actualizar',
    component: ActualizarComponent
  },
  {
    path:'permisos',
    component: PermisosComponent,
    canActivate:[AuthEGuard],
  },
  {
    path:'constancia',
    component: ConstComponent
  },
  {
    path: 'lista/permisos',
    component: PermisoComponent,
    canActivate:[AuthEGuard],
  },
  



];

@NgModule({
  imports: [CommonModule, RouterModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class DashboardRoutingModule { }
