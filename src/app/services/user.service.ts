import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { ROLS } from '../constants/generals';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private urlApi = !environment.production && !environment.useMocks ? environment.apiUrlDev : environment.apiUrlProd;
  constructor(
    public http: HttpClient,
  ) { }

  getUser(data: any) {
    let url = `${this.urlApi}get-users?where=${data.where}`;
    if (data.pagination_itemQuantity && data.pagination_step) {
      url += `&pagination_itemQuantity=${data.pagination_itemQuantity}&pagination_step=${data.pagination_step}`;
      return this.http.get(url).pipe(
        map((response: any) => ({
          ...response,
          data: {
            ...response.data,
            data: response.data.data.map((item: any) => ({
              ...item,
              role_name: ROLS.find((rol) => +rol.id === +item.role)?.name
            }))
          }
        }))
      );
    } else {

      return this.http.get(url).pipe(
        map((response: any) => ({
          ...response,
          data: response.data.map((item: any) => ({
            ...item,
            role_name: ROLS.find((rol) => +rol.id === +item.role)?.name
          }))
        }))
      );
    }
  }

  addUser(body: any) {
    const url = `${this.urlApi}add-user`;
    return this.http.post(url, body);
  }

  updateUser(body: any, id: number) {
    const url = `${this.urlApi}update-user/${id}`;
    return this.http.put(url, body);
  }

  deleteUser(id: number) {
    const url = `${this.urlApi}delete-user/${id}`;
    return this.http.delete(url);
  }
}
