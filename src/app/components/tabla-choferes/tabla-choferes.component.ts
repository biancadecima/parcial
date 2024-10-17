import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ChoferService } from '../../services/chofer.service';
import { Chofer } from '../../models/chofer';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tabla-choferes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tabla-choferes.component.html',
  styleUrl: './tabla-choferes.component.css'
})
export class TablaChoferesComponent implements OnInit{

  choferes!: Chofer[];
  @Output() choferElegido = new EventEmitter<Chofer>();

  constructor(
    private choferService : ChoferService
  ) { }

  ngOnInit(): void {
    this.choferService.getAllSnapshots().subscribe( respuesta => {
      this.choferes = new Array<Chofer>();
      respuesta.forEach((chofer: any)=> {
        let choferAux = new Chofer(chofer.nombre, chofer.dni, chofer.edad, chofer.nroLicencia, chofer.licenciaProfesional, chofer.nacionalidad)
        this.choferes?.push(choferAux);
      })
    })
  }

  clickLinea(item: Chofer){
    this.choferElegido.emit(item);
  }
}
