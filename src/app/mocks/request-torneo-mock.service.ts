import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RequestTorneoMockService {

  constructor() { }

  addRequestTorneo(body: any) {
    const mock: any = {
      status: true,
    };
    return of(mock); // Simula una respuesta observable
  }
}
