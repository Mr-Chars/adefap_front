import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { RequestTorneoService } from '../../services/request-torneo.service';
import { ModalAddRequestTorneoComponent } from '../../modals/request-torneo/modal-add-request-torneo/modal-add-request-torneo.component';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { firstValueFrom } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { ModalUbigeosComponent } from '../../modals/modal-ubigeos/modal-ubigeos.component';
import { CategoryService } from '../../services/category.service';

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

  idCategoryWanted = null;
  categories: any = [];

  id_region = null;
  constructor(
    private requestTorneoService: RequestTorneoService,
    private categoryService: CategoryService,
  ) { }

  async ngOnInit() {
    this.isLoading = true;
    const dataDecripted = JSON.parse(localStorage.getItem('user_logged')!);
    this.id_region = dataDecripted.id_region;
    await this.getCaterogy();
    await this.getRequestTorneo();
    this.isLoading = false;
  }

  generatePdf(idRequest: any) {
    return this.requestTorneoService.generatePdf(idRequest);
  }

  async getRequestTorneo(pagination_step = 1) {
    try {
      let where = [
        ['participant.nombres', 'like', '%' + this.requestWanted + '%']
      ];
      if (this.idCategoryWanted) {
        where.push(['request_torneo.id_category', '=', this.idCategoryWanted])
      }
      console.log(this.id_region);

      if (this.id_region) {
        where.push(['request_torneo.id_region', '=', this.id_region])
      }

      const dataToSend = {
        where: btoa(JSON.stringify(where)),
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

  async onSelect(event: any, type: string) {
    if (type === 'category' && this.idCategoryWanted !== event.target.value) {
      this.idCategoryWanted = event.target.value;
      await this.getRequestTorneo();
    }
  }

  async getCaterogy() {
    try {
      const dataToSend = {
        where: '',
      };
      const response: any = await firstValueFrom(this.categoryService.getCategory(dataToSend));
      if (response.data) {
        this.categories = response.data;
      }
    } catch (error) { }
  }

  async openModalAddRequest() {
    const result = await this.modal.open();
    this.getRequestTorneo();
  }

  numSequence(n: number): Array<number> {
    return Array(n);
  }
}
