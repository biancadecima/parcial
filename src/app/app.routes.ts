import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', redirectTo: '/bienvenido', pathMatch: "full" },
    { path: 'bienvenido', 
        loadComponent:()=> import('./components/bienvenido/bienvenido.component').then(c =>c.BienvenidoComponent)},
    { path: 'login', 
        loadComponent:()=> import('./components/login/login.component').then(c =>c.LoginComponent)},
    { path: 'alta-chofer', 
        loadComponent:()=> import('./components/alta-chofer/alta-chofer.component').then(c =>c.AltaChoferComponent)}    
       
];