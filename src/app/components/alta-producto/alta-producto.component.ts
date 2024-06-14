import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BarcodeScannerComponent } from '../barcode-scanner/barcode-scanner.component';

@Component({
  selector: 'app-alta-producto',
  standalone: true,
  imports: [ReactiveFormsModule, BarcodeScannerComponent],
  templateUrl: './alta-producto.component.html',
  styleUrl: './alta-producto.component.scss'
})
export class AltaProductoComponent implements OnInit {
  productoForm!: FormGroup;
  scanning: boolean = false;
  scannedCode: string = '';

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

  onScanSuccess(code: string) {
    this.scannedCode = code;
    this.productoForm.patchValue({ codigoBarras: code });
    this.scanning = false;
  }

  leerCodigoBarras() {
    this.scanning = true;
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