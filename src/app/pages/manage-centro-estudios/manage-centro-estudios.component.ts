import { Component, ViewChild } from '@angular/core';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CentroEstudiosService } from '../../services/centro-estudios.service';
import { firstValueFrom } from 'rxjs';
import { ModalWarningComponent } from '../../modals/modal-warning/modal-warning.component';
import { ModalAddCentroEstudioComponent } from '../../modals/centro-estudios/modal-add-centro-estudio/modal-add-centro-estudio.component';
import { ModalEditCentroEstudioComponent } from '../../modals/centro-estudios/modal-edit-centro-estudio/modal-edit-centro-estudio.component';
import { ModalDeleteCentroEstudioComponent } from '../../modals/centro-estudios/modal-delete-centro-estudio/modal-delete-centro-estudio.component';
import { StfPaginationComponent, StfTextComponent } from 'stf-components';

@Component({
  selector: 'app-manage-centro-estudios',
  standalone: true,
  imports: [
    SidebarComponent,
    CommonModule,
    FormsModule,
    ModalWarningComponent,
    ModalAddCentroEstudioComponent,
    ModalEditCentroEstudioComponent,
    ModalDeleteCentroEstudioComponent,
    StfPaginationComponent,
    StfTextComponent
  ],
  templateUrl: './manage-centro-estudios.component.html',
  styleUrl: './manage-centro-estudios.component.css'
})
export class ManageCentroEstudiosComponent {
  @ViewChild(ModalWarningComponent) modalWarning!: ModalWarningComponent;
  @ViewChild(ModalAddCentroEstudioComponent) modalAddCentroEstudio!: ModalAddCentroEstudioComponent;
  @ViewChild(ModalEditCentroEstudioComponent) modalEditCentroEstudio!: ModalEditCentroEstudioComponent;
  @ViewChild(ModalDeleteCentroEstudioComponent) modalDeleteCentroEstudio!: ModalDeleteCentroEstudioComponent;

  centros: any = [];

  centroWanted = '';
  isLoading = true;
  pagination = {
    current_page: 0,
    totalQuantity: 0,
    last_page: 0,
  };
  constructor(
    private centroEstudiosService: CentroEstudiosService,
  ) { }

  ngOnInit() {
    this.getCentros();
  }

  pageChangedPagination(event: any) {
    this.getCentros(event.currentPage)
  }

  async openModalAddCentro() {
    await this.modalAddCentroEstudio.open();
    this.getCentros();
  }

  async openModalEditCentro(id: number) {
    await this.modalEditCentroEstudio.open(id);
    this.getCentros();
  }

  async deleteCentro(id: number) {
    try {
      const result = await this.modalDeleteCentroEstudio.open();
      if (result) {
        const response: any = await firstValueFrom(this.centroEstudiosService.deleteCentroEstudios(id));
        if (response.status) {
          this.getCentros();
          this.modalWarning.open('Se eliminó el centro de estudios de manera correcta', 'success');
        } else {
          this.modalWarning.open('Ocurrió un error...');
        }
      }

    } catch (error) {
      this.modalWarning.open('Ocurrió un error...');
    }
  }

  async getCentros(pagination_step = 1) {
    this.isLoading = true;
    try {
      const dataDecripted = JSON.parse(localStorage.getItem('user_logged')!);
      const dataToSend = {
        where: btoa(JSON.stringify([
          ['centro_estudios.nombre', 'like', '%' + this.centroWanted + '%'],
          ['centro_estudios.id_creator', '=', dataDecripted.id]
        ])),
        pagination_itemQuantity: 10,
        pagination_step,
      };
      const response: any = await firstValueFrom(this.centroEstudiosService.getCentroEstudios(dataToSend));
      if (response.data.data) {
        this.centros = response.data.data;
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
