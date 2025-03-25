import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthMockService {

  constructor() { }

  login(body: any): any {
    const mockUsers: any = {
      status: true,
      token: '123',
      token_decripted: {
        username: 'Aaron'
      },
    };
    return of(mockUsers); // Simula una respuesta observable
  }

  isLogged(): any {
    const mock: any = {
      status: localStorage.getItem('token') ? true : false,
    };
    return of(mock); // Simula una respuesta observable
  }
}
