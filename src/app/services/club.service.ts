import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClubService {
  private urlApi = !environment.production && !environment.useMocks ? environment.apiUrlDev : environment.apiUrlProd;
  constructor(
    public http: HttpClient,
  ) { }

  getClub(data: any) {
    let url = `${this.urlApi}get-clubs?where=${data.where}`;
    if (data.pagination_itemQuantity && data.pagination_step) {
      url += `&pagination_itemQuantity=${data.pagination_itemQuantity}&pagination_step=${data.pagination_step}`;
    }

    return this.http.get(url);
  }

  addClub(body: any) {
    const url = `${this.urlApi}add-club`;
    return this.http.post(url, body);
  }

  updateClub(body: any, id: number) {
    const url = `${this.urlApi}update-club/${id}`;
    return this.http.put(url, body);
  }

  deleteClub(id: number) {
    const url = `${this.urlApi}delete-club/${id}`;
    return this.http.delete(url);
  }
}
