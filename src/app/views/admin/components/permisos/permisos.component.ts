import { formatDate } from '@angular/common';
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
  contador = 1;
  folioTotal: any;
  folioTotal2: any;
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
  Folio:any;
  Propietario:any;
  Marca:any;
  Submarca:any;
  Modelo:any;
  Color:any;
  Numero_serie:any;
  Numero_motor:any;
  Fecha_inicial:any;
  Fecha_final:any;
  Folio_permiso:any;
  dia:any;
  mes:any;
  ano2:any;
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
    
    let fecha = formatDate(new Date(),'yyyy-MM-dd', 'en-US') ;
    let dia = formatDate(new Date(),'dd', 'en-US') ;
    let diayhora = formatDate(new Date(),'dd HH:mm:ss', 'en-US') ;
    let ano = formatDate(new Date(),'yy', 'en-US') ;
    let ano2 = formatDate(new Date(),'yyyy', 'en-US') ;
    let mes = formatDate(new Date(),'MM', 'en-US') ;
    let minuto = formatDate(new Date(),'mm', 'en-US') ;
    let segundo = formatDate(new Date(),'ss', 'en-US') ;
    
    this.folioTotal = (`MAN-CMSV-${ano}-${mes}/${dia}${mes}${ano}${minuto}${segundo}`);
    this.folioTotal2 = (`CMSV-${ano}-${mes}/${dia}${mes}${ano}${minuto}${segundo}`);
 
 

   //if(diayhora = '31 11:47:00'){}
  
   
   
  }



     
    
  

  postForm(form: any) {
    this.nuevoPC.value.FOLIO_PERMISO = this.folioTotal;
    console.log(form);
    
  
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
            
            
            
            this.api.nuevoPermiso(form).subscribe(
              (data) => 
              
              {
                this.Folio = this.nuevoPC.value.FOLIO
                this.Propietario = this.nuevoPC.value.PROPIETARIO
                this.Marca = this.nuevoPC.value.MARCA
                this.Submarca = this.nuevoPC.value.SUBMARCA
                this.Modelo = this.nuevoPC.value.MODELO
                this.Color = this.nuevoPC.value.COLOR
                this.Numero_serie = this.nuevoPC.value.NUMERO_SERIE
                this.Numero_motor = this.nuevoPC.value.NUMERO_MOTOR
                this.Fecha_inicial = this.nuevoPC.value.FECHA_INICIAL
                this.Fecha_final = this.nuevoPC.value.FECHA_FINAL
                this.folioTotal = this.nuevoPC.value.FOLIO_PERMISO

                console.log(this.nuevoPC.value);
                this.alerts
                  .realizado('Completado', 'Se ha enviado el permiso con exito')
                  .then((res: any) => {});
                this.crearPDF();
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
    this.router.navigate(['admin/lista/permisos/']);
  }

  crearPDF() {
    let ano = formatDate(new Date(),'yyyy', 'en-US') ;
    let mes = formatDate(new Date(),'MM', 'en-US') ;
    let dia = formatDate(new Date(),'dd', 'en-US') ;


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
    doc.setFontSize(12).text(this.Propietario, 3.15, 3.82);
    doc.setFontSize(35).text(this.folioTotal, 2.40, 1.82);
    doc.setFontSize(12).text(this.Marca, 2.76, 4.09);
    doc.setFontSize(12).text(this.Submarca, 3.09, 4.35);
    doc.setFontSize(12).text(this.Modelo, 2.9, 4.62);
    doc.setFontSize(12).text(this.Color, 2.7, 4.89);
    doc.setFontSize(12).text(this.Numero_serie, 7.61, 3.82);
    doc.setFontSize(12).text(this.Numero_motor, 7.69, 4.09);
    doc.setFontSize(12).text(this.folioTotal2, 7.1, 4.35);
    doc.setFontSize(45).text(this.Fecha_final, 5.50, 6.00);
    doc.setFontSize(10).text(`El dia ${dia} del mes ${mes} del ${ano}`, 7.60, 7.35);

    doc.output('dataurlnewwindow', { filename: 'Permiso Vial' });
    doc.save('' + '.pdf');
  }
}
