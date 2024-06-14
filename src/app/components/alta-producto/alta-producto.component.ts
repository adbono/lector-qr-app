import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-alta-producto',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './alta-producto.component.html',
  styleUrl: './alta-producto.component.scss'
})
export class AltaProductoComponent implements OnInit {
  productoForm!: FormGroup;
  private fb = inject(FormBuilder)

  constructor() {}

  ngOnInit(): void {
    this.productoForm = this.fb.group({
      nombre: ['', Validators.required],
      precio: [0, Validators.required],
      categoria: [''],
      codigoBarras: [''],
      descripcion: [''],
      estado: ['DISPONIBLE', Validators.required]
    });
  }

  leerCodigoBarras(){
    console.log("leerCodigoBarras")
  }

  onSubmit(): void {
    if (this.productoForm.valid) {
      console.log(this.productoForm.value);
      // Aquí puedes agregar la lógica para guardar los datos, por ejemplo, enviarlos a un servicio de API
    } else {
      console.log('Formulario no válido');
    }
  }
}