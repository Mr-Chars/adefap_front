import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UbigeoService {
  private urlApi = !environment.production && !environment.useMocks ? environment.apiUrlDev : environment.apiUrlProd;
  constructor(
    public http: HttpClient,
  ) { }

  getUbigeo(data: any) {
    const url = `${this.urlApi}get-ubigeos?where=${data.where}&pagination_itemQuantity=${data.pagination_itemQuantity}&pagination_step=${data.pagination_step}&orWhere=${data.orWhere}`;

    return this.http.get(url);
  }
}
