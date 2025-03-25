import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FingerprintService } from './services/fingerprint.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  fingerprintData: any;

  constructor(private fingerprintService: FingerprintService) { }
  ngOnInit() {
  }
  scanFingerprint() {
    console.log('emit...scanFingerprint');

    this.fingerprintService.captureFingerprint().subscribe(
      (response) => {
        console.log('emit...response');
        console.log('Huella capturada:', response);
        this.fingerprintData = response; // Aquí se almacena la respuesta del lector
      },
      (error) => {
        console.error('Error al capturar la huella:', error);
      }
    );
  }
}
