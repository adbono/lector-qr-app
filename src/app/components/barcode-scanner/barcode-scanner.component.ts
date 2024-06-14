import { Component, EventEmitter, Output } from '@angular/core';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { BarcodeFormat } from '@zxing/library';

@Component({
  selector: 'app-barcode-scanner',
  standalone: true,
  imports: [ZXingScannerModule],
  templateUrl: './barcode-scanner.component.html',
  styleUrl: './barcode-scanner.component.scss'
})
export class BarcodeScannerComponent {
  @Output() scanSuccess = new EventEmitter<string>();
  hasDevices: boolean = false;
  hasPermission: boolean = false;
  @Output() close = new EventEmitter<void>();
  
  allowedFormats = [ BarcodeFormat.QR_CODE, BarcodeFormat.EAN_13, BarcodeFormat.EAN_8, BarcodeFormat.UPC_A, BarcodeFormat.UPC_E]

  ngOnInit(): void {
    // Check for devices and permissions
    this.checkForCameras();
  }

  checkForCameras() {
    navigator.mediaDevices.enumerateDevices().then(devices => {
      this.hasDevices = devices.some(device => device.kind === 'videoinput');
    }).catch(err => {
      console.error('Error enumerating devices', err);
    });

    navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
      this.hasPermission = true;
    }).catch(err => {
      console.error('Permission denied', err);
      this.hasPermission = false;
    });
  }

  closeScanner() {
    this.close.emit();
  }

  onCodeResult(resultString: string) {
    this.scanSuccess.emit(resultString);
  }
}
