import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ParticipantService {
  private urlApi = !environment.production && !environment.useMocks ? environment.apiUrlDev : environment.apiUrlProd;
  constructor(
    public http: HttpClient,
  ) { }

  getParticipant(data: any) {
    const url = `${this.urlApi}get-participant?where=${data.where}&pagination_itemQuantity=${data.pagination_itemQuantity}&pagination_step=${data.pagination_step}`;

    return this.http.get(url);
  }

  addParticipant(body: any) {
    const url = `${this.urlApi}add-participant`;
    return this.http.post(url, body);
  }

  updateParticipant(body: any, id: number) {
    const url = `${this.urlApi}update-participant/${id}`;
    return this.http.put(url, body);
  }

  deleteParticipant(id: number) {
    const url = `${this.urlApi}delete-participant/${id}`;
    return this.http.delete(url);
  }
}
