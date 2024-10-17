import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, authState } from '@angular/fire/auth';
import { DbService } from './db.service';
import { Router } from '@angular/router';
import { User, UserCredential, sendPasswordResetEmail } from 'firebase/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth:Auth, 
              private db:DbService, 
              private router:Router) {}


  async logIn(email:string, password:string){
    let message: string = '';
    try{
      const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
      return true;
    }catch (error: any) {
      switch (error.code) {
        case 'auth/invalid-email':
          message = 'Correo inválido';
          alert( message);
          break;
        case 'auth/user-not-found':
          message = 'Usuario no encontrado';
          alert(message);
          break;
        case 'auth/wrong-password':
        case 'auth/missing-password':
        case 'auth/invalid-credential': 
          message = 'Credenciales inválidas';
          alert(message);
          break;
        default:
          alert('Error, intente de nuevo');
          console.log(error.message);
          break;
      }
      return false;
    }
  }

  async signUp(username: string, email:string, password:string): Promise<boolean> {
    let message: string = '';
    try{
      const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
      //this.db.addOne(email, username); se dan de alta en las altas. esto ya eemprezaria con uno logueado supongo
      return true;
    }catch (error: any) {
      switch (error.code) {
        case 'auth/email-already-in-use':
          message = 'Este correo ya está registrado';
          alert( message);
          break;
        case 'auth/weak-password':
          message =
            'Error, ingrese una contraseña que tenga mas de 5 carácteres';
            alert(message);
          break;
        case 'auth/invalid-credential': 
          message = 'Credenciales inválidas';
          alert(message);
          break;
        default:
            alert('Error, intente de nuevo');
            console.log(error.message);
            break;
      }
      return false;
    }
  }


  getCurrentUser(): Observable<User | null> {
    return new Observable((observer) => {
      const unsubscribe = this.auth.onAuthStateChanged((user: User | null) => {
        observer.next(user);
      });
      return () => {
        unsubscribe();
      };
    });
  }

  signOut() {
    this.auth.signOut();
    this.router.navigate(['/bienvenido']);;
  }


}
