import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GeneralService } from 'src/services/general.service';
import { SweetAlertService } from 'src/services/sweet-alert.service';

@Component({
  selector: 'app-solicitudes',
  templateUrl: './solicitudes.component.html',
  styleUrls: ['./solicitudes.component.scss'],
})
export class SolicitudesComponent {
  boton: any;
  id: any;
  data: any;
  areas: any;
  area: any;
  subarea: any;
  areas1: any;
  menu: any;
  titulo: any;
  icono: any;
  archivos: string[] = [];

  nuevoPC = new FormGroup({
    FOLIO: new FormControl('', Validators.required),
    NOMBRE: new FormControl('', Validators.required),
    APELLIDO_PAT: new FormControl('', Validators.required),
    APELLIDO_MAT: new FormControl('', Validators.required),
    TIPO: new FormControl('', Validators.required),
  });

  constructor(
    private api: GeneralService,
    private alerts: SweetAlertService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  postForm(form: any) {
    this.alerts
      .alertaConfirmacionAgregar(
        'Registro de datos',
        '¿Desea enviar los datos de su registro?'
      )
      .then((res: any) => {
        if (res.isConfirmed) {
          if (
            form.FOLIO !== '' &&
            form.NOMBRE !== '' &&
            form.APELLIDO_PAT !== '' &&
            form.TIPO !== ''
          ) {
            console.log(form);

            this.api.solicitudes(form).subscribe(
              (data) => {
                console.log(data);
                this.alerts
                  .realizado(
                    'Completado',
                    'Se ha enviado el solicitud con exito'
                  )
                  .then((res: any) => {});
              },
              (error) => {
                this.alerts.alertaError('Ups', 'Error de solicitud');
              }
            );
          } else {
            this.alerts.alertaError(
              'Error de solicitud',
              'Todos los campos son obligatorios'
            );
          }
        }
      });
  }

  verDetalles() {
    this.router.navigate(['admin/lista-solicitudes/']);
  }

}
