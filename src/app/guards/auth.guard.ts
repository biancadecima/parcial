import { inject } from '@angular/core';
import { CanActivateFn, Router  } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);    // Inyectamos el router para redireccionar si es necesario

  // Usamos el Observable que nos da el estado del usuario
  return auth.getCurrentUser().pipe(
    take(1),  // Solo tomamos el primer valor emitido
    map(user => {
      if (user) {
        // Si el usuario está autenticado, permitimos el acceso
        return true;
      } else {
        // Si el usuario no está autenticado, mostramos una alerta
        alert("logueate para ingresar");
        return false;
      }
    })
  );
  
};
