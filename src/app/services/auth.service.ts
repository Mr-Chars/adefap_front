import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private urlApi = !environment.production && !environment.useMocks ? environment.apiUrlDev : environment.apiUrlProd;
  constructor(
    public http: HttpClient,
  ) { }

  login(body: any) {
    const url = `${this.urlApi}auth_login`;
    return this.http.post(url, body);
  }

  isLogged() {
    const token = localStorage.getItem('token');
    const url = `${this.urlApi}token_decriptToken?token=${token}`;
    return this.http.get(url);
  }
}
