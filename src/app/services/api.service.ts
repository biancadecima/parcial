import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService implements OnInit {

  private urlApi = 'https://restcountries.com/v3.1/all';
  countries: any = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getCountries();
  }

  getCountries() 
  {
    return this.http.get(this.urlApi);
  }

  getCountryByName(countryName: string): Observable<any> {
    return this.http.get<any[]>(`${this.urlApi}/name/${countryName}`);
  }
}
