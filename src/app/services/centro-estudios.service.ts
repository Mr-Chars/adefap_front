import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CentroEstudiosService {
  private urlApi = !environment.production && !environment.useMocks ? environment.apiUrlDev : environment.apiUrlProd;
  constructor(
    public http: HttpClient,
  ) { }

  getCentroEstudios(data: any) {
    let url = `${this.urlApi}get-centro-estudios?where=${data.where}`;
    if (data.pagination_itemQuantity && data.pagination_step) {
      url += `&pagination_itemQuantity=${data.pagination_itemQuantity}&pagination_step=${data.pagination_step}`;
    }

    return this.http.get(url);
  }

  addCentroEstudios(body: any) {
    const url = `${this.urlApi}add-centro-estudios`;
    return this.http.post(url, body);
  }
}
