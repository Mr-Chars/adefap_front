import { Component, ViewChild } from '@angular/core';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CentroEstudiosService } from '../../services/centro-estudios.service';
import { firstValueFrom } from 'rxjs';
import { ModalWarningComponent } from '../../modals/modal-warning/modal-warning.component';
import { ModalAddCentroEstudioComponent } from '../../modals/centro-estudios/modal-add-centro-estudio/modal-add-centro-estudio.component';

@Component({
  selector: 'app-manage-centro-estudios',
  standalone: true,
  imports: [
    SidebarComponent,
    CommonModule,
    FormsModule,
    ModalWarningComponent,
    ModalAddCentroEstudioComponent
  ],
  templateUrl: './manage-centro-estudios.component.html',
  styleUrl: './manage-centro-estudios.component.css'
})
export class ManageCentroEstudiosComponent {
  @ViewChild(ModalWarningComponent) modalWarning!: ModalWarningComponent;
  @ViewChild(ModalAddCentroEstudioComponent) modalAddCentroEstudio!: ModalAddCentroEstudioComponent;

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

  async openModalAddCentro() {
    await this.modalAddCentroEstudio.open();
    this.getCentros();
  }

  async openModalEditCentro(id: number) {

  }

  async deleteCentro(id: number) {

  }

  async getCentros(pagination_step = 1) {
    this.isLoading = true;
    try {
      const dataToSend = {
        where: this.centroWanted ? btoa(JSON.stringify([
          ['centro_estudios.nombre', 'like', '%' + this.centroWanted + '%']
        ])) : '',
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

  numSequence(n: number): Array<number> {
    return Array(n);
  }
}
