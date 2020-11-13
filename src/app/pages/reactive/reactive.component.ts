import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.css']
})
export class ReactiveComponent implements OnInit {

  forma: FormGroup;

  constructor( private fb: FormBuilder ) {
    this.crearFormulario();
   }

  ngOnInit(): void {
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
      nombre   : ['', [ Validators.required, Validators.minLength(5) ] ],
      apellido : ['',   Validators.required],
      email    : ['', [Validators.required, Validators.email ] ],
      direccion: this.fb.group({
        estado   : ['', Validators.required],
        municipio: ['', Validators.required],
      })
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
  }

}
