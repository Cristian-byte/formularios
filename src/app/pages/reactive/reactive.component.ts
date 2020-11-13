import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

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

  crearFormulario() {
    this.forma = this.fb.group({
      nombre  : ['Cristian'],
      apellido: ['Sanchez'],
      correo  : ['dsadsa@dasdas.com'],
    });
  }

  guardar() {
    console.log( this.forma );
  }

}
