import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    { path: '', redirectTo: '/bienvenido', pathMatch: "full" },
    { path: 'bienvenido', 
        loadComponent:()=> import('./components/bienvenido/bienvenido.component').then(c =>c.BienvenidoComponent)},
    { path: 'login', 
        loadComponent:()=> import('./components/login/login.component').then(c =>c.LoginComponent)},
    { path: 'alta-chofer', 
        loadComponent:()=> import('./components/alta-chofer/alta-chofer.component').then(c =>c.AltaChoferComponent)},
    { path: 'choferes', 
        loadComponent:()=> import('./components/choferes/choferes.component').then(c =>c.ChoferesComponent),
        canActivate: [authGuard],
    }      
       
];