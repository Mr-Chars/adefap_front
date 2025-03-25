import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { RequestTorneoService } from '../../services/request-torneo.service';
import { ModalAddRequestTorneoComponent } from '../../modals/request-torneo/modal-add-request-torneo/modal-add-request-torneo.component';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { firstValueFrom } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { ModalUbigeosComponent } from '../../modals/modal-ubigeos/modal-ubigeos.component';

@Component({
  selector: 'app-manage-request-torneo',
  standalone: true,
  imports: [
    CommonModule,
    ModalAddRequestTorneoComponent,
    SidebarComponent,
    FormsModule,
  ],
  templateUrl: './manage-request-torneo.component.html',
  styleUrl: './manage-request-torneo.component.css'
})
export class ManageRequestTorneoComponent {
  @ViewChild(ModalAddRequestTorneoComponent) modal!: ModalAddRequestTorneoComponent;

  requestsTorneo: any = [];
  requestWanted = '';
  isLoading = false;
  pagination = {
    current_page: 0,
    totalQuantity: 0,
    last_page: 0,
  };
  constructor(
    private requestTorneoService: RequestTorneoService,
  ) { }

  async ngOnInit() {
    this.isLoading = true;
    await this.getRequestTorneo();
    this.isLoading = false;
  }

  generatePdf(idRequest: any) {
    return this.requestTorneoService.generatePdf(idRequest);
  }

  async getRequestTorneo(pagination_step = 1) {
    try {
      const dataToSend = {
        where: this.requestWanted ? btoa(JSON.stringify([
          ['request_torneo.nombres', 'like', '%' + this.requestWanted + '%']
        ])) : '',
        pagination_itemQuantity: 10,
        pagination_step,
      };
      const response: any = await firstValueFrom(this.requestTorneoService.getRequestTorneo(dataToSend));
      if (response.data.data) {
        this.requestsTorneo = response.data.data;
        this.pagination = {
          current_page: response.data.current_page,
          totalQuantity: response.data.total,
          last_page: response.data.last_page,
        };
      }
    } catch (error) {

    }
  }

  async openModalAddRequest() {
    const result = await this.modal.open();
    this.getRequestTorneo();
  }

  numSequence(n: number): Array<number> {
    return Array(n);
  }
}
