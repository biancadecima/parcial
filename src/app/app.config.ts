import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideFirebaseApp(() => initializeApp({"projectId":"parcial-labo4-5ecd1","appId":"1:1079332258368:web:672ba06558eaf550af15a5","storageBucket":"parcial-labo4-5ecd1.appspot.com","apiKey":"AIzaSyCAqAgEuIZPsRPHKOzrtfJVIxW626RwldA","authDomain":"parcial-labo4-5ecd1.firebaseapp.com","messagingSenderId":"1079332258368"})), 
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideHttpClient()]
};
