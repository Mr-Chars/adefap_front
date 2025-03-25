import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RequestTorneoService {
  private urlApi = !environment.production && !environment.useMocks ? environment.apiUrlDev : environment.apiUrlProd;

  constructor(
    public http: HttpClient,
  ) { }

  getRequestTorneo(data: any) {
    const url = `${this.urlApi}get-request-torneo?where=${data.where}&pagination_itemQuantity=${data.pagination_itemQuantity}&pagination_step=${data.pagination_step}`;

    return this.http.get(url);
  }

  addRequestTorneo(body: any) {
    const url = `${this.urlApi}add-request-torneo`;
    return this.http.post(url, body);
  }

  generatePdf(idRequest: string) {
    const url = `${this.urlApi}generate-pdf?idRequest=${idRequest}`;
    return url;
  }
}
