import { ICollection } from "../interfaces/icollection";
/*a. Nombre (Solo letras, requerido).
b. DNI (Solo números, 8 caracteres, requerido)
c. Edad (entre 18 y 50, requerido).
d. Nro de licencia (Solo números, mínimo 7, requerido).
e. Licencia profesional (Checkbox).
f. Nacionalidad (requerido)*/

export class Chofer implements ICollection{
    nombre! : string;
    dni! : string;
    edad! : string;
    nroLicencia! : string;
    licenciaProfesional! : string;
    nacionalidad! : string;
    id: string;
  
    constructor(nombre:string, dni:string, edad: string, nroLicencia:string, licenciaProfesional:string, nacionalidad:string, id: string = ""){
      this.nombre = nombre;
      this.dni = dni;
      this.edad = edad;
      this.nroLicencia = nroLicencia;
      this.licenciaProfesional = licenciaProfesional;
      this.nacionalidad = nacionalidad;
      this.id = id;
    }
  }