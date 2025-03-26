import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { ModalWarningComponent } from '../../modal-warning/modal-warning.component';
import { DisplayInputValidationMessageComponent } from '../../../components/display-input-validation-message/display-input-validation-message.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ModalUbigeosComponent } from '../../modal-ubigeos/modal-ubigeos.component';
import { firstValueFrom, Subject } from 'rxjs';
import { CentroEstudiosService } from '../../../services/centro-estudios.service';
import { UbigeoService } from '../../../services/ubigeo.service';

@Component({
  selector: 'app-modal-edit-centro-estudio',
  standalone: true,
  imports: [
    CommonModule,
    ModalWarningComponent,
    ReactiveFormsModule,
    DisplayInputValidationMessageComponent,
    ModalUbigeosComponent
  ],
  templateUrl: './modal-edit-centro-estudio.component.html',
  styleUrl: './modal-edit-centro-estudio.component.css'
})
export class ModalEditCentroEstudioComponent {
  @ViewChild(ModalWarningComponent) modalWarning!: ModalWarningComponent;
  @ViewChild(ModalUbigeosComponent) modalUbigeosComponent!: ModalUbigeosComponent;
  isOpen = false;
  private responseSubject = new Subject<boolean>();

  centroEstudiosForm = new FormGroup({
    id: new FormControl('', [Validators.required,]),
    nombre: new FormControl('', [Validators.required]),
    ubigeo: new FormControl('', [Validators.required]),
    ubigeo_id: new FormControl('', [Validators.required]),
  });

  constructor(
    private centroEstudiosService: CentroEstudiosService,
    private ubigeoService: UbigeoService,
  ) { }

  async updateCentroEstudios() {
    try {
      const body = {
        nombre: this.centroEstudiosForm.value.nombre,
        ubigeo: this.centroEstudiosForm.value.ubigeo_id,
      };
      const response: any = await firstValueFrom(this.centroEstudiosService.updateCentroEstudios(body, +this.centroEstudiosForm.value.id!));
      if (response.status) {
        this.modalWarning.open('Se actualizó el centro de estudio de manera correcta', 'success');
        this.close(true);
      } else {
        this.modalWarning.open(response.error);
      }
    } catch (error) {
      this.modalWarning.open('Ocurrió un error...');
    }
  }

  async chooseUbigeo() {
    try {
      const response: any = await this.modalUbigeosComponent.open();
      if (response) {
        this.centroEstudiosForm.controls.ubigeo.setValue(response.distrito);
        this.centroEstudiosForm.controls.ubigeo_id.setValue(response.ubigeo_reniec);
      }
    } catch (error) {

    }
  }

  async getCentroEstudiosById(id: number) {
    try {
      const dataToSend = {
        where: btoa(JSON.stringify([
          ['centro_estudios.id', '=', id,]
        ])),
        pagination_itemQuantity: 10,
        pagination_step: 0,
      };
      const response: any = await firstValueFrom(this.centroEstudiosService.getCentroEstudios(dataToSend));

      if (response.data) {
        const centroEstudios = response.data[0];

        this.centroEstudiosForm.controls.id.setValue(centroEstudios.id);
        this.centroEstudiosForm.controls.nombre.setValue(centroEstudios.nombre);

        const responseUbigeo = await this.getUbigeo(centroEstudios.ubigeo);
        if (responseUbigeo) {
          this.centroEstudiosForm.controls.ubigeo.setValue(responseUbigeo.distrito);
          this.centroEstudiosForm.controls.ubigeo_id.setValue(responseUbigeo.ubigeo_reniec);
        }
      }
    } catch (error) {
      this.modalWarning.open('Ocurrió un error...');
    }
  }

  async getUbigeo(idReniecUbigeo: string) {
    try {
      const body = {
        where: btoa(JSON.stringify([
          ['tb_ubigeos.ubigeo_reniec', '=', idReniecUbigeo]
        ])),
        pagination_itemQuantity: 10,
        pagination_step: 0,
      };
      const response: any = await firstValueFrom(this.ubigeoService.getUbigeo(body));
      return response.data.data[0];
    } catch (error) {
      return false;
    }
  }

  open(idCentro: number): Promise<boolean> {
    this.isOpen = true;
    this.getCentroEstudiosById(idCentro);
    return new Promise((resolve) => {
      this.responseSubject = new Subject<boolean>();
      this.responseSubject.subscribe((response) => {
        this.isOpen = false;
        resolve(response);
      });
    });
  }

  close(response: boolean) {
    this.responseSubject.next(response);
    this.responseSubject.complete();
    this.centroEstudiosForm.reset();
  }
}
