import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FingerprintService {

  private apiUrl = 'https://localhost:8443/SGIFPCapture';

  constructor(private http: HttpClient) { }

  captureFingerprint(): Observable<any> {
    const requestData = 'Timeout=10000&Quality=50&licstr=&templateFormat=ISO&imageWSQRate=0.75';
    // const requestData = {
    //   Quality: 100, // Calidad de la imagen (0-100)
    //   Timeout: 10000, // Tiempo máximo de espera en milisegundos
    //   Light: 0, // Configuración de iluminación (según modelo)
    //   Template: true // Si se quiere la plantilla biométrica
    // };

    return this.http.post<any>(this.apiUrl, requestData);
  }
}
