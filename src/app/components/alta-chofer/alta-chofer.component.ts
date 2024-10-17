import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Chofer } from '../../models/chofer';
import { ChoferService } from '../../services/chofer.service';
import { CommonModule } from '@angular/common';
import { ListaPaisesComponent } from '../lista-paises/lista-paises.component';

@Component({
  selector: 'app-alta-chofer',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, ListaPaisesComponent],
  templateUrl: './alta-chofer.component.html',
  styleUrl: './alta-chofer.component.css'
})
export class AltaChoferComponent {
  formulario!: FormGroup;
  mensajeError: string | undefined;
  mensajeExito: string | undefined;

  licenciaProfesional : string | undefined;
  nacionalidad : string | undefined;

  constructor(
    private choferService: ChoferService
  ) {
    this.licenciaProfesional = undefined;
    this.nacionalidad = undefined;
  }

  ngOnInit(): void {

    this.formulario = new FormGroup({
      nombre: new FormControl('', [Validators.pattern('^[a-zA-Z]+$'), Validators.required]),
      dni: new FormControl('', [Validators.pattern('^[0-9]*$'), Validators.required, Validators.minLength(8), Validators.maxLength(8)]),
      edad: new FormControl('', [Validators.pattern('^[0-9]*$'), Validators.min(18), Validators.max(50), Validators.required]),
      nroLicencia: new FormControl('', [Validators.pattern('^[0-9]*$'), Validators.required, Validators.minLength(7)]),
    });
  }

  get nombre(){
    return this.formulario.get('nombre');
  }
  get dni(){
    return this.formulario.get('dni');
  }
  get edad(){
    return this.formulario.get('edad');
  }
  get nroLicencia(){
    return this.formulario.get('nroLicencia');
  }

  crearChofer(){
    if(this.evaluarErrorInputs()){//this.formulario.valid
      const choferData = new Chofer(
        this.nombre?.value,
        this.dni?.value,
        this.edad?.value,
        this.nroLicencia?.value,
        this.licenciaProfesional!,
        this.nacionalidad!
      );
        
      this.choferService.addChofer(choferData);
      /*.then(() => {
        // Mensaje de éxito o acción posterior
        alert('Gracias por contestar la encuesta!');
        this.actorForm.reset(); // Reiniciar el formulario después de enviarlo
        //this.router.navigateByUrl('home');
      })
      .catch(error => {
        // Manejo de errores
        console.error('Error al enviar la encuesta:', error);
        alert('Hubo un error al enviar la encuesta. Inténtalo de nuevo.');
      });*/
      this.mostrarMensajeExito();
    };
  }

  verLicencia(evento: any){
    if(evento.srcElement.value != "invalido"){
      this.licenciaProfesional = evento.srcElement.value;
    }else{
      this.licenciaProfesional = undefined;
    }
  }

  recibirPaisSelect(nombrePais: string){
    this.nacionalidad = nombrePais;
  }

  evaluarErrorInputs() : boolean{

    if(!this.nombre?.valid){
      this.mensajeError = "El campo 'Nombre' no es válido."
      this.mostrarMensajeError();
      return false;
    }
    if(!this.dni?.valid){
      this.mensajeError = "El campo 'DNI' no es válido."
      this.mostrarMensajeError();
      return false;
    }
    if(!this.edad?.valid){
      this.mensajeError = "El campo 'Edad' no es válido."
      this.mostrarMensajeError();
      return false;
    }
    if(!this.nroLicencia?.valid){
      this.mensajeError = "El campo 'Numero de Licencia' no es válido."
      this.mostrarMensajeError();
      return false;
    }
    if(this.licenciaProfesional == undefined){
      this.mensajeError = "Debe seleccionar si posee licencia profesional."
      this.mostrarMensajeError();
      return false;
    }
    else if(this.nacionalidad == undefined){
      this.mensajeError = "Debe seleccionar un pais"
      this.mostrarMensajeError();
      return false;
    }
    return true;
  }

  mostrarMensajeExito(){
    this.mensajeExito = "El chofer se creó con éxito.";
    setTimeout(() =>{ this.mensajeExito = undefined }, 2500);
  }

  mostrarMensajeError(){
    setTimeout(() =>{ this.mensajeError = undefined }, 2500);
  }
}
