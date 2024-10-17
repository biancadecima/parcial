import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Observable } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { GithubService } from '../../services/github.service';
import { NavbarComponent } from '../navbar/navbar.component';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { User } from 'firebase/auth';

@Component({
  selector: 'app-bienvenido',
  standalone: true,
  imports: [HttpClientModule, NavbarComponent],
  providers: [GithubService], // Añadir aquí el proveedor
  templateUrl: './bienvenido.component.html',
  styleUrl: './bienvenido.component.css'
})
export class BienvenidoComponent implements OnDestroy, OnInit{
  currentUser$: Observable<User | null>;
  subsDatos! : Subscription;
  usuario! : string;
  imagen! : string;
  cantidadRepos! : string;

  constructor(
    private router:Router, private AuthService:AuthService, private gitServ : GithubService
  ) {
    this.gitServ.obtenerDatos();
    this.currentUser$ = this.AuthService.getCurrentUser();
  }



  ngOnInit(): void {
    this.subsDatos = this.gitServ.datos.subscribe( respuesta => {
      this.usuario = respuesta.login;
      this.imagen = respuesta.avatar_url;
      this.cantidadRepos = respuesta.public_repos;
    });
  }

  

  ngOnDestroy(){
    this.subsDatos.unsubscribe();
  }

}
