import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-detalle-pais',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detalle-pais.component.html',
  styleUrl: './detalle-pais.component.css'
})
export class DetallePaisComponent implements OnInit{
  @Input() country: string | undefined;
  countryDetails: any;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    if (this.country) {
      this.getCountryDetails(this.country);
    }
  }

  getCountryDetails(country: string) {
    this.apiService.getCountryByName(country).subscribe((data) => {
      if (data && data.length > 0) {
        this.countryDetails = data[0]; // Asumimos que la respuesta es un array
      }
    });
  }

}
