import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegionService {
  private urlApi = !environment.production && !environment.useMocks ? environment.apiUrlDev : environment.apiUrlProd;
  constructor(
    public http: HttpClient,
  ) { }

  getRegion(data: any) {
    let url = `${this.urlApi}get-region?where=${data.where}`;
    if (data.pagination_itemQuantity && data.pagination_step) {
      url += `&pagination_itemQuantity=${data.pagination_itemQuantity}&pagination_step=${data.pagination_step}`;
    }

    return this.http.get(url);
  }

  addRegion(body: any) {
    const url = `${this.urlApi}add-region`;
    return this.http.post(url, body);
  }

  updateRegion(body: any, id: number) {
    const url = `${this.urlApi}update-region/${id}`;
    return this.http.put(url, body);
  }

  deleteRegion(id: number) {
    const url = `${this.urlApi}delete-region/${id}`;
    return this.http.delete(url);
  }
}
