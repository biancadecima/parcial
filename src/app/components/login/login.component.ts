import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string = "";
  password : string = "";
  rol : string = "";
  public error: boolean = false;
  loggedUser: string = "";
  msjError : string = "";
  subUsuarios! : Subscription;

  constructor(private router: Router, public auth : AuthService) {}

  LogIn(){

    this.auth.logIn(this.email, this.password).then((res) => {
      //if (res !== '') {
      if (res !== true) {
        this.error = true;
        //this.message = res;
      } else {
        this.error = false;
        this.router.navigateByUrl('bienvenido');
      }
    });
  }

  Rellenar(email : string, password : string){
    this.email = email;
    this.password = password;
  }

}
