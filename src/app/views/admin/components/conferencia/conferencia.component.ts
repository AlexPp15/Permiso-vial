import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GeneralService } from 'src/services/general.service';
import { SweetAlertService } from 'src/services/sweet-alert.service';

@Component({
  selector: 'app-conferencia',
  templateUrl: './conferencia.component.html',
  styleUrls: ['./conferencia.component.scss']
})
export class ConferenciaComponent {
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
    NOMBRE: new FormControl('', Validators.required),
    ESCUELA: new FormControl('', Validators.required),
    GRADO: new FormControl('', Validators.required),
    CARRERA: new FormControl('', Validators.required),
    DIRECCION: new FormControl('', Validators.required),
    TELEFONO: new FormControl('', Validators.required),
    CIUDAD: new FormControl('', Validators.required),
    EMAIL: new FormControl('', Validators.required)
  });

  constructor(private api: GeneralService, private alerts: SweetAlertService, private router: Router,) { }

  ngOnInit(): void {


  }


  postForm(form: any) {




    this.alerts.alertaConfirmacionAgregar('Registro de datos', '¿Desea enviar los datos de su registro?')
      .then((res: any) => {

        if (res.isConfirmed) {
          if (form.NOMBRE !== '' &&
            form.ESCUELA !== '' &&
            form.GRADO !== '' &&
            form.CARRERA !== '' &&
            form.DIRECCION !== '' &&
            form.TELEFONO !== '' &&
            form.CIUDAD !== '' &&
            form.EMAIL !== '') {
 console.log(form);
            this.api.registroConfe(form).subscribe(data => {


              this.alerts.realizado('Completado', 'Se ha enviado el registro con exito').then((res: any) => {
location.reload()
              })

            }, error => {

              this.alerts.alertaError('Ups', 'Error de registro')
            })

          } else {
            this.alerts.alertaError('Error de registro', 'Todos los campos son obligatorios');
          }

        }

      })

  }





}
