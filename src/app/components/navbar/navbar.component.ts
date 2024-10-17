import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service'; 
import { Router, RouterLink, RouterLinkActive, RouterModule, RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'firebase/auth';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  currentUser$: Observable<User | null>;

  constructor(private router:Router, private AuthService:AuthService){
    this.currentUser$ = this.AuthService.getCurrentUser();
  }

 
  SignOut(){
    this.AuthService.signOut();
    this.router.navigate(['/bienvenido']);
    
  }
  

}
