import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private urlApi = !environment.production && !environment.useMocks ? environment.apiUrlDev : environment.apiUrlProd;
  constructor(
    public http: HttpClient,
  ) { }

  getCategory(data: any) {
    let url = `${this.urlApi}get-category?where=${data.where}`;
    if (data.pagination_itemQuantity && data.pagination_step) {
      url += `&pagination_itemQuantity=${data.pagination_itemQuantity}&pagination_step=${data.pagination_step}`;
    }

    return this.http.get(url);
  }

  addCategory(body: any) {
    const url = `${this.urlApi}add-category`;
    return this.http.post(url, body);
  }

  updateCategory(body: any, id: number) {
    const url = `${this.urlApi}update-category/${id}`;
    return this.http.put(url, body);
  }

  deleteCategory(id: number) {
    const url = `${this.urlApi}delete-category/${id}`;
    return this.http.delete(url);
  }
}
