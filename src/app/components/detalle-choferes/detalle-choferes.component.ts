import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Chofer } from '../../models/chofer';

@Component({
  selector: 'app-detalle-choferes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detalle-choferes.component.html',
  styleUrl: './detalle-choferes.component.css'
})
export class DetalleChoferesComponent implements OnInit{
  @Input() choferDetalle : Chofer | undefined;

  constructor() { }

  ngOnInit(): void {
  }
}
