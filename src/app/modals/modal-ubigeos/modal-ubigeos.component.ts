import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { firstValueFrom, Subject } from 'rxjs';
import { UbigeoService } from '../../services/ubigeo.service';

@Component({
  selector: 'app-modal-ubigeos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './modal-ubigeos.component.html',
  styleUrl: './modal-ubigeos.component.css'
})
export class ModalUbigeosComponent {
  private responseSubject = new Subject<any>();
  isOpen = false;
  ubigeoWanted = '';

  ubigeos: any = [];


  pagination = {
    current_page: 0,
    totalQuantity: 0,
    last_page: 0,
  };
  constructor(
    private ubigeoService: UbigeoService,
  ) {
    this.getUbigeo();
  }

  async getUbigeo(pagination_step = 1) {
    try {
      const body = {
        where: this.ubigeoWanted ? btoa(JSON.stringify([
          ['tb_ubigeos.departamento', 'like', '%' + this.ubigeoWanted + '%']
        ])) : '',
        orWhere: this.ubigeoWanted ? btoa(JSON.stringify([
          ['tb_ubigeos.distrito', 'like', '%' + this.ubigeoWanted + '%']
        ])) : '',
        pagination_itemQuantity: 10,
        pagination_step,
      };
      const response: any = await firstValueFrom(this.ubigeoService.getUbigeo(body));
      if (response.data) {
        this.ubigeos = response.data.data;
        this.pagination = {
          current_page: response.data.current_page,
          totalQuantity: response.data.total,
          last_page: response.data.last_page,
        };
      }
    } catch (error) {

    }
  }

  chooseUbigeo(id: any) {
    this.close(id);
  }

  numSequence(n: number): Array<number> {
    return Array(n);
  }

  open(): Promise<boolean> {
    this.isOpen = true;
    return new Promise((resolve) => {
      this.responseSubject = new Subject<any>();
      this.responseSubject.subscribe((response: any) => {
        this.isOpen = false;
        resolve(response);
      });
    });
  }

  close(response: any) {
    this.responseSubject.next(response);
    this.responseSubject.complete();
  }
}
