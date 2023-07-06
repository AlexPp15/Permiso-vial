import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import jsPDF from 'jspdf';
import { GeneralService } from 'src/services/general.service';
import { SweetAlertService } from 'src/services/sweet-alert.service';

@Component({
  selector: 'app-permisos',
  templateUrl: './permisos.component.html',
  styleUrls: ['./permisos.component.scss'],
})
export class PermisosComponent {
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
    PROPIETARIO: new FormControl('', Validators.required),
    MARCA: new FormControl('', Validators.required),
    SUBMARCA: new FormControl('', Validators.required),
    MODELO: new FormControl('', Validators.required),
    COLOR: new FormControl('', Validators.required),
    NUMERO_SERIE: new FormControl('', Validators.required),
    NUMERO_MOTOR: new FormControl('', Validators.required),
    FECHA_INICIAL: new FormControl('', Validators.required),
    FECHA_FINAL: new FormControl('', Validators.required),
    FOLIO_PERMISO: new FormControl('', Validators.required),
  });

  constructor(
    private api: GeneralService,
    private alerts: SweetAlertService,
    private router: Router
  ) {}

  ngOnInit(): void {
    var contador = 1;
    let fecha = new Date();
    let ano = fecha.getFullYear();
    let mes = fecha.getMonth() + 1;
    console.log(`MAN-CMSV-${ano}-${mes}/${contador++}`);
  }

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
            form.PROPIETARIO !== '' &&
            form.MARCA !== '' &&
            form.SUBMARCA !== '' &&
            form.MODELO !== '' &&
            form.COLOR !== '' &&
            form.NUMERO_SERIE !== '' &&
            form.NUMERO_MOTOR !== '' &&
            form.FECHA_INICIAL !== '' &&
            form.FECHA_FINAL !== ''
          ) {
            console.log(form);
            this.nuevoPC.value.FOLIO_PERMISO = '111111111';
            this.api.nuevoPermiso(this.nuevoPC).subscribe(
              (data) => {
                console.log(data);
                this.alerts
                  .realizado('Completado', 'Se ha enviado el permiso con exito')
                  .then((res: any) => {});
              },
              (error) => {
                this.alerts.alertaError('Ups', 'Error de permiso');
              }
            );
          } else {
            this.alerts.alertaError(
              'Error de permiso',
              'Todos los campos son obligatorios'
            );
          }
        }
      });
  }

  verDetalles() {
    this.router.navigate(['admin/lista-solicitudes/']);
  }

  crearPDF() {
    const doc = new jsPDF({
      orientation: 'landscape',
      unit: 'in',
      format: [12, 8],
    });

    doc.setFontSize(14);
    // hor ver
    var logo = new Image();
    logo.src = 'assets/img/permiso.PNG';
    doc.addImage(logo, 'JPEG', 0.1, 0.1, 11.8, 7.5);
    doc.text('Jacob Medina Cervantes', 3.15, 3.82);
    doc.text('Toyota', 2.76, 4.09);
    doc.text('CRV', 3.09, 4.35);
    doc.text('2023', 2.9, 4.62);
    doc.text('Gris', 2.7, 4.89);
    doc.text('numero de serie', 7.61, 3.82);
    doc.text('numero de motor', 7.69, 4.09);
    doc.text('folio', 7.1, 4.35);

    doc.output('dataurlnewwindow', { filename: 'Permiso Vial' });
    doc.save('jacob' + '.pdf');
  }
}
