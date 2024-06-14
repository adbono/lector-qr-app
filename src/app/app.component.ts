import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AltaProductoComponent } from './components/alta-producto/alta-producto.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AltaProductoComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'lector-qr-app';
}
