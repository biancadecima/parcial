import { Component } from '@angular/core';
import { Chofer } from '../../models/chofer';
import { DetalleChoferesComponent } from '../detalle-choferes/detalle-choferes.component';
import { DetallePaisComponent } from '../detalle-pais/detalle-pais.component';
import { TablaChoferesComponent } from '../tabla-choferes/tabla-choferes.component';

@Component({
  selector: 'app-choferes',
  standalone: true,
  imports: [TablaChoferesComponent, DetalleChoferesComponent, DetallePaisComponent],
  templateUrl: './choferes.component.html',
  styleUrl: './choferes.component.css'
})
export class ChoferesComponent {

  chofer!: Chofer;
  pais!:any;

  constructor() { }


  choferSeleccionado(chofer:any){
    this.chofer = chofer;
    this.pais = this.chofer.nacionalidad;
  }
}
