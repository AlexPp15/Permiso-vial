import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { GeneralService } from 'src/services/general.service';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.scss']
})
export class ListadoComponent {
  data: any;
  bann: any;
  boton: any;
  documento: any;
  token: any;

  @ViewChild('cbCampo') cbCampo: ElementRef;
  @ViewChild('ctCadena') ctCadena: ElementRef;

  constructor(private router: Router, private service: GeneralService) { }

  ngOnInit(): void {

    this.service.listadoConfe().subscribe(res => {
      this.documento = res.body;
      console.log(this.data);

    })

  }


  buscar(): void {
    let columName: string = this.cbCampo.nativeElement.value;
    let value: any = this.ctCadena.nativeElement.value;

    if (value.length) {
      console.log('entra buscar');
      this.service.buscarConfe(columName, value).subscribe((res: any) => {
        this.documento = res.body;
        console.log('entra buscar');

      });
    } else {
      this.service.listadoConfe().subscribe(res =>{
        this.documento=res.body
        console.log(this.documento);
        console.log('vacio');

       })
    }
  }
}
