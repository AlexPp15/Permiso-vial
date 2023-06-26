import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { GeneralService } from 'src/services/general.service';
import { SweetAlertService } from 'src/services/sweet-alert.service';
import jsPDF from 'jspdf';
@Component({
  selector: 'app-constancias',
  templateUrl: './constancias.component.html',
  styleUrls: ['./constancias.component.scss']
})
export class ConstComponent {

  documento: any;
  token: any;
  var: any
  headers = ['NOMBRE','RAZON_SOCIAL',' CELULAR','CORREO','DOMICILIO','LOCALIDAD','N_PARTICIPANTES'];
  pc:any
  constructor(private api: GeneralService, private router: Router, private alertas: SweetAlertService) { }

  nuevoPC = new FormGroup({
    NOMBRE: new FormControl('', Validators.required),

  });


  ngOnInit() {




  }


  postForm() {
    this.var = this.nuevoPC.value.NOMBRE
    console.log(this.var);

    this.api.filtroConfe(this.var).subscribe(res => {
      this.documento = res.body;

      console.log(this.documento);

      if (res.body.length === 0) {
        this.alertas.alertaError('Error en la busqueda', 'El nombre no esta registrado o se registró de forma diferente.')

      }else{
            localStorage.setItem('constancia',this.var)
      this.alertas.realizado('Realizado','Generando Constancia').then((res: any) => {
this.crearPDF()
      })
      }



    })



  }





  crearPDF() {
    const doc = new jsPDF({
      orientation: "landscape",
      unit: "in",
      format: [12, 8]

    });


    doc.setFontSize(30);



    var logo = new Image();
    logo.src = 'assets/img/constancia.png';
    doc.addImage(logo, 'JPEG', .1, .1, 11.8, 7.5);
doc.text(this.documento[0].NOMBRE , 6, 4.2, {align:"center"});
    doc.output('dataurlnewwindow', {filename: 'Conferencia Magistral'});
doc.save(this.documento[0].NOMBRE + '.pdf')


  }

}
