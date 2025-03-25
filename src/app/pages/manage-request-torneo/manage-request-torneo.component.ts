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
  constructor(
    private requestTorneoService: RequestTorneoService,
  ) { }

  ngOnInit(): void {
    this.getRequestTorneo();
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
      }
    } catch (error) {

    }
  }

  async openModalAddRequest() {
    const result = await this.modal.open();
    this.getRequestTorneo();
  }
}
