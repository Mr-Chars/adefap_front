import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { FormsModule } from '@angular/forms';
import { ModalWarningComponent } from '../../modals/modal-warning/modal-warning.component';
import { RegionService } from '../../services/region.service';
import { firstValueFrom } from 'rxjs';
import { ModalAddRegionComponent } from '../../modals/region/modal-add-region/modal-add-region.component';
import { ModalEditRegionComponent } from '../../modals/region/modal-edit-region/modal-edit-region.component';
import { ModalDeleteRegionComponent } from '../../modals/region/modal-delete-region/modal-delete-region.component';
import { StfPaginationComponent, StfTextComponent } from 'stf-components';

@Component({
  selector: 'app-manage-region',
  standalone: true,
  imports: [
    CommonModule,
    SidebarComponent,
    FormsModule,
    ModalWarningComponent,
    ModalAddRegionComponent,
    ModalEditRegionComponent,
    ModalDeleteRegionComponent,
    StfPaginationComponent,
    StfTextComponent
  ],
  templateUrl: './manage-region.component.html',
  styleUrl: './manage-region.component.css'
})
export class ManageRegionComponent {
  @ViewChild(ModalWarningComponent) modalWarning!: ModalWarningComponent;
  @ViewChild(ModalAddRegionComponent) modalAddRegion!: ModalAddRegionComponent;
  @ViewChild(ModalEditRegionComponent) modalEditRegion!: ModalEditRegionComponent;
  @ViewChild(ModalDeleteRegionComponent) modalDeleteRegion!: ModalDeleteRegionComponent;
  isLoading = false;
  regionWanted = '';
  regions: any = [];
  pagination = {
    current_page: 0,
    totalQuantity: 0,
    last_page: 0,
  };
  constructor(
    private regionService: RegionService,
  ) { }

  ngOnInit() {
    this.getRegion();
  }

  pageChangedPagination(event: any) {
    this.getRegion(event.currentPage)
  }

  async openModalAddRegion() {
    await this.modalAddRegion.open();
    this.getRegion();
  }

  async openModalEditRegion(id: number) {
    try {
      await this.modalEditRegion.open(id);
      this.getRegion();

    } catch (error) { }
  }

  async deleteRegion(id: number) {
    try {
      const result = await this.modalDeleteRegion.open();
      if (result) {
        const response: any = await firstValueFrom(this.regionService.deleteRegion(id));
        if (response.status) {
          this.getRegion();
          this.modalWarning.open('Se eliminó de manera correcta', 'success');
        } else {
          this.modalWarning.open('Ocurrió un error...');
        }
      }

    } catch (error) {
      this.modalWarning.open('Ocurrió un error...');
    }
  }

  async getRegion(pagination_step = 1) {
    this.isLoading = true;
    try {
      const dataDecripted = JSON.parse(localStorage.getItem('user_logged')!);
      const dataToSend = {
        where: btoa(JSON.stringify([
          ['region.name', 'like', '%' + this.regionWanted + '%'],
          ['region.id_creator', '=', dataDecripted.id]
        ])),
        pagination_itemQuantity: 10,
        pagination_step,
      };
      const response: any = await firstValueFrom(this.regionService.getRegion(dataToSend));

      if (response.data.data) {
        this.regions = response.data.data;
        this.pagination = {
          current_page: response.data.current_page,
          totalQuantity: response.data.total,
          last_page: response.data.last_page,
        };
      }
    } catch (error) {
      this.modalWarning.open('Ocurrió un error...');
    } finally {
      this.isLoading = false;
    }
  }

}
