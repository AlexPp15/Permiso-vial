
import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { GeneralService } from 'src/services/general.service';


@Component({
  selector: 'app-permiso',
  templateUrl: './permiso.component.html',
  styleUrls: ['./permiso.component.scss']
})
export class PermisoComponent {
  documento: any;
  spinner = false;
  data: any;
  data1: any;
  data2: any;
  conteo: any;
  conteo1: any;
  conteo2: any;
  reponsable: any;
  datos: any;
  pages: number=1;

  @ViewChild('cbCampo') cbCampo: ElementRef;
  @ViewChild('ctCadena') ctCadena: ElementRef;

  constructor(private api: GeneralService, private router: Router) {}

  ngOnInit() {
    this.reponsable = localStorage.getItem('tipo');

    this.spinner = true;
    this.api.listaCarros().subscribe((res: any) => {
      this.data = res.body;
      console.log(this.data);

      this.conteo = res.body.length;
      // console.log(this.conteo);

      this.spinner = false;
    });


  }

  verDetalles(id: any) {
    this.router.navigate(['admin/datos-solitud/', id]);
  }

  verVolver() {
    this.router.navigate(['/admin/permisos']);
  }

  buscar(): void {
    let columName: string = this.cbCampo.nativeElement.value;
    let value: any = this.ctCadena.nativeElement.value;

    if (value.length) {
       console.log('entra buscar');
      this.api.buscar(columName, value).subscribe((res: any) => {
        this.data = res.body;
         console.log('entra buscar');
      });
    } else {
      this.reponsable = localStorage.getItem('tipo');

    this.spinner = true;
    this.api.listaSolicitudes().subscribe((res: any) => {
      this.data = res.body;
       console.log(this.data);

      this.conteo = res.body.length;
       console.log(this.conteo);

      this.spinner = false;
    });
    }
  }

  cambio(){
    this.pages=1
  }

}


