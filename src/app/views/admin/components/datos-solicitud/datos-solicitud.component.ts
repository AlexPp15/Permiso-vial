import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GeneralService } from 'src/services/general.service';
import { SweetAlertService } from 'src/services/sweet-alert.service';

@Component({
  selector: 'app-datos-solicitud',
  templateUrl: './datos-solicitud.component.html',
  styleUrls: ['./datos-solicitud.component.scss'],
})
export class DatosSolicitudComponent {
  data: any;
  id: any;
  folio = '';
  nombre = '';
  apellido_pat = '';
  apellido_mat = '';
  busqueda: any;
  estado :any;
  estatus:any

  constructor(
    private api: GeneralService,
    private router: Router,
    private activo: ActivatedRoute,
    private alerta: SweetAlertService,
  ) {}

  ngOnInit() {
    this.id = this.activo.snapshot.paramMap.get('id');
    // console.log(this.id);
    this.api.datosGET(this.id).subscribe((res: any) => {
      this.data = res.body;
      console.log(this.data);
      this.folio = this.data[0].FOLIO;
      this.nombre = this.data[0].NOMBRE;
      this.apellido_pat = this.data[0].APELLIDO_PAT;
      this.apellido_mat = this.data[0].APELLIDO_MAT;
      this.busqueda = this.data[0].TIPO;
      this.estado = this.data[0].ESTATUS;

      if (this.busqueda === 0) {
        this.busqueda = 'Nacimiento';
      }
      if (this.busqueda === 1) {
        this.busqueda = 'Matrimonio';
      }
      if (this.busqueda === 2) {
        this.busqueda = 'Defuncion';
      }
      if (this.busqueda === 3) {
        this.busqueda = 'Divorcio';
      }
      if (this.busqueda === 4) {
        this.busqueda = 'Inscripciones';
      }
      if (this.busqueda === 5) {
        this.busqueda = 'Reconocimineto';
      }

      if (this.estado === 0) {
        this.estado = 'Proceso';
      }
      if (this.estado === 1) {
        this.estado = 'En Captura';
      }
      if (this.estado === 2) {
        this.estado = 'Capturado';
      }
      if (this.estado === 3) {
        this.estado = 'No Encontrado';
      }
    });
  }

  actualizarEnCaptura(){
    this.id = this.activo.snapshot.paramMap.get('id');
    console.log(this.id);
    this.api.datosPUT(1, this.id).subscribe((res: any)=>{
      this.estatus=res.body
      this.alerta.realizado('Cambio','cambio realizado').then((res:any)=>{
location.reload()
      })

    })
  }

  actualizarCapturado(){
    this.id = this.activo.snapshot.paramMap.get('id');
    console.log(this.id);
    this.api.datosPUT(2, this.id).subscribe((res: any)=>{
      this.estatus=res.body
      this.alerta.realizado('Cambio','cambio realizado').then((res:any)=>{
        location.reload()
      })

    })
  }

  actualizarNoEncontrado(){
    this.id = this.activo.snapshot.paramMap.get('id');
    console.log(this.id);
    this.api.datosPUT(3, this.id).subscribe((res: any)=>{
      this.estatus=res.body
      this.alerta.realizado('Cambio','cambio realizado').then((res:any)=>{
        location.reload()
      })

    })


}

verVolver() {
  this.router.navigate(['admin/lista-solicitudes']);
}

}
