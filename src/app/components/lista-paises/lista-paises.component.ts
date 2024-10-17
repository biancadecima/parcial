import { Component, EventEmitter, OnInit, Output } from '@angular/core';
//import { Paises } from '../../models/paises';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-paises',
  standalone: true,
  imports: [CommonModule],
  providers: [ApiService], // Añadir aquí el proveedor
  templateUrl: './lista-paises.component.html',
  styleUrl: './lista-paises.component.css'
})
export class ListaPaisesComponent implements OnInit{
  countries: any[] = [];
  @Output() selectedCountry = new EventEmitter<string>();

  constructor(private router: Router, private apiService : ApiService) 
  {
    this.getAllCountryData();
  }

  ngOnInit() {
    this.apiService.getCountries().subscribe((countriesList: any) => {
      console.log(countriesList);
      countriesList.forEach((auxCountry: any) => {
        const country = {
          nombre: auxCountry.name.common,
          bandera: auxCountry.flags.svg,
        };
        this.countries.push(country);
      });
      this.getAllCountryData();
    });
  }

  getAllCountryData() {
    const selectedCountries = ['Estados Unidos', 'Francia', 'Albania', 'Bélgica', 'México', 'Canadá', 'Alemania', ];
    this.countries = this.countries.filter(country => selectedCountries.includes(country.nombre));
  }

  selectCountry(countryName: string) {
    this.selectedCountry.emit(countryName); // Emite el nombre del país
  }

}
