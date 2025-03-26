import { Component, ViewChild } from '@angular/core';
import { ModalWarningComponent } from '../../modal-warning/modal-warning.component';
import { firstValueFrom, Subject } from 'rxjs';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CentroEstudiosService } from '../../../services/centro-estudios.service';
import { CommonModule } from '@angular/common';
import { DisplayInputValidationMessageComponent } from '../../../components/display-input-validation-message/display-input-validation-message.component';
import { ModalUbigeosComponent } from '../../modal-ubigeos/modal-ubigeos.component';

@Component({
  selector: 'app-modal-add-centro-estudio',
  standalone: true,
  imports: [
    CommonModule,
    ModalWarningComponent,
    ReactiveFormsModule,
    DisplayInputValidationMessageComponent,
    ModalUbigeosComponent
  ],
  templateUrl: './modal-add-centro-estudio.component.html',
  styleUrl: './modal-add-centro-estudio.component.css'
})
export class ModalAddCentroEstudioComponent {
  @ViewChild(ModalWarningComponent) modalWarning!: ModalWarningComponent;
  @ViewChild(ModalUbigeosComponent) modalUbigeosComponent!: ModalUbigeosComponent;
  isOpen = false;
  private responseSubject = new Subject<boolean>();

  centroEstudiosForm = new FormGroup({
    nombre: new FormControl('', [Validators.required]),
    ubigeo: new FormControl('', [Validators.required]),
    ubigeo_id: new FormControl('', [Validators.required]),
  });

  constructor(
    private centroEstudiosService: CentroEstudiosService,
  ) { }

  async addCentroEstudios() {
    try {
      const body = {
        nombre: this.centroEstudiosForm.value.nombre,
        ubigeo: this.centroEstudiosForm.value.ubigeo_id,
      };
      const response: any = await firstValueFrom(this.centroEstudiosService.addCentroEstudios(body));
      if (response.status) {
        this.modalWarning.open('Se agregó el centro de estudio de manera correcta', 'success');
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

  open(): Promise<boolean> {
    this.isOpen = true;
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
