import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { get } from 'http';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.css']
})
export class ReactiveComponent implements OnInit {

  forma: FormGroup;

  constructor( private fb: FormBuilder ) {
    this.crearFormulario();
    this.cargarDataAlFormulario();
   }

  ngOnInit(): void {
  }

  get pasatiempos() {
    return this.forma.get('pasatiempos') as FormArray;
  }

  get nombreNoValido() {
    return this.forma.get('nombre').invalid && this.forma.get('nombre').touched
  }

  get apellidoNoValido() {
    return this.forma.get('apellido').invalid && this.forma.get('apellido').touched
  }
  get emailNoValido() {
    return this.forma.get('email').invalid && this.forma.get('email').touched
  }
  get estadoNoValido() {
    return this.forma.get('direccion.estado').invalid && this.forma.get('direccion.estado').touched
  }
  get municipioNoValido() {
    return this.forma.get('direccion.municipio').invalid && this.forma.get('direccion.municipio').touched
  }

  crearFormulario() {
    this.forma = this.fb.group({
      nombre   : ['', [ Validators.required, Validators.minLength(4) ] ],
      apellido : ['',   Validators.required],
      email    : ['', [Validators.required, Validators.email ] ],
      direccion: this.fb.group({
        estado   : ['', Validators.required],
        municipio: ['', Validators.required],
      }),
      pasatiempos: this.fb.array([
        [], [], [], [], [],
      ])
    });
  }

  cargarDataAlFormulario() {

    //this.forma.setValue({
      this.forma.reset({
      nombre: 'Cristian',
      apellido: 'Sanchez',
      email: 'cristian@gmail.com',
      direccion: {
        estado: 'Tlaxcala',
        municipio: 'Xaloztoc'
      }
    });
  }

  guardar() {
    console.log( this.forma );

    if (this.forma.invalid) {

      return Object.values(this.forma.controls).forEach(control => {

        if ( control instanceof FormGroup ) {
          Object.values( control.controls ).forEach( control => control.markAsTouched() );
        } else {
        control.markAsTouched();
        }
      });
    }

    //Posteo de información
    this.forma.reset({

    });
  }

}
