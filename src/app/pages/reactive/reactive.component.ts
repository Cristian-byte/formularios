import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { get } from 'http';
import { ValidadoresService } from '../../services/validadores.service';


@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.css']
})
export class ReactiveComponent implements OnInit {

  forma: FormGroup;

  constructor( private fb: FormBuilder,
               private validadores: ValidadoresService ) {
    this.crearFormulario();
    this.cargarDataAlFormulario();
    this.crearListeners();
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

  get usuarioNoValido() {
    return this.forma.get('usuario').invalid && this.forma.get('usuario').touched
  }

  get estadoNoValido() {
    return this.forma.get('direccion.estado').invalid && this.forma.get('direccion.estado').touched
  }

  get municipioNoValido() {
    return this.forma.get('direccion.municipio').invalid && this.forma.get('direccion.municipio').touched
  }

  get pass1NoValido() {
    return this.forma.get('pass1').invalid && this.forma.get('pass1').touched;
  }

  get pass2NoValido() {
    const pass1 = this.forma.get('pass1').value;
    const pass2 = this.forma.get('pass2').value;

    return ( pass1 === pass2 ) ? false : true;
  }

  crearFormulario() {
    this.forma = this.fb.group({
      nombre   : ['', [ Validators.required, Validators.minLength(4) ] ],
      apellido : ['', [ Validators.required, this.validadores.noHerrera ] ],
      email    : ['', [ Validators.required, Validators.email ] ],
      usuario  : ['', , this.validadores.existeUsuario ],
      pass1    : ['',   Validators.required ],
      pass2    : ['',   Validators.required ],
      direccion: this.fb.group({
        estado   : ['', Validators.required],
        municipio: ['', Validators.required],
      }),
      pasatiempos: this.fb.array([])
    },{
      validators: this.validadores.passwordsIguales('pass1', 'pass2')
    });
  }

  crearListeners() {
    //this.forma.valueChanges.subscribe( valor => {
    //  console.log(valor);
    //});
    //this.forma.statusChanges.subscribe( status => console.log({ status }));
    this.forma.get('nombre').valueChanges.subscribe( console.log );
  }

  cargarDataAlFormulario() {

    //this.forma.setValue({
      this.forma.reset({
      nombre: 'Cristian',
      apellido: 'Sanchez',
      email: 'dasda@gmail.com',
      pass1: '123',
      pass2: '123',
      direccion: {
        estado: 'Tlaxcala',
        municipio: 'Xaloztoc',
      }
    });
  }

  agregarPasatiempo() {
    this.pasatiempos.push( this.fb.control( '' ) )
  }

  borrarPasatiempo(i: number) {
    this.pasatiempos.removeAt(i);
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
