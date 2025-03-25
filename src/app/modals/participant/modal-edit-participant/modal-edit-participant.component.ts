import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { ModalWarningComponent } from '../../modal-warning/modal-warning.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DisplayInputValidationMessageComponent } from '../../../components/display-input-validation-message/display-input-validation-message.component';
import { ModalUbigeosComponent } from '../../modal-ubigeos/modal-ubigeos.component';
import { firstValueFrom, Subject } from 'rxjs';
import { REGEX_TYPES } from '../../../constants/generals';
import { ParticipantService } from '../../../services/participant.service';
import { UbigeoService } from '../../../services/ubigeo.service';

@Component({
  selector: 'app-modal-edit-participant',
  standalone: true,
  imports: [
    CommonModule,
    ModalWarningComponent,
    ReactiveFormsModule,
    DisplayInputValidationMessageComponent,
    ModalUbigeosComponent
  ],
  templateUrl: './modal-edit-participant.component.html',
  styleUrl: './modal-edit-participant.component.css'
})
export class ModalEditParticipantComponent {
  @ViewChild(ModalUbigeosComponent) modalUbigeosComponent!: ModalUbigeosComponent;
  @ViewChild(ModalWarningComponent) modalWarning!: ModalWarningComponent;
  isOpen = false;
  private responseSubject = new Subject<boolean>();

  participantForm = new FormGroup({
    id: new FormControl('', [Validators.required,]),
    nombres: new FormControl('', [Validators.required,]),
    apellido_paterno: new FormControl('', [Validators.required,]),
    apellido_materno: new FormControl('', [Validators.required,]),
    fecha_nacimiento: new FormControl('', [Validators.required,]),
    ubigeo_nacimiento: new FormControl('', [Validators.required,]),
    ubigeo_nacimiento_id: new FormControl('', [Validators.required,]),
    n_celular: new FormControl('', [Validators.required, Validators.pattern(REGEX_TYPES.number)]),
    talla: new FormControl('', [Validators.required,]),
    peso: new FormControl('', [Validators.required, Validators.pattern(REGEX_TYPES.peso)]),
    participantPhoto: new FormControl('', [Validators.required,]),
    dni: new FormControl('', [Validators.required, Validators.pattern(REGEX_TYPES.dni)]),
    domicilio: new FormControl('', [Validators.required,]),
    ubigeo_domicilio: new FormControl('', [Validators.required,]),
    ubigeo_domicilio_id: new FormControl('', [Validators.required,]),
  });

  base64Image: string | null = null;

  constructor(
    private participantService: ParticipantService,
    private ubigeoService: UbigeoService,
  ) {

  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        this.base64Image = reader.result as string;

        this.participantForm.controls.participantPhoto.setValue(this.base64Image);
      };

      reader.readAsDataURL(file);
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

  async chooseUbigeoLugarNacimiento() {
    try {
      const response: any = await this.modalUbigeosComponent.open();
      if (response) {
        this.participantForm.controls.ubigeo_nacimiento.setValue(response.distrito);
        this.participantForm.controls.ubigeo_nacimiento_id.setValue(response.ubigeo_reniec);
      }
    } catch (error) {

    }
  }

  async chooseUbigeoDomicilio() {
    try {
      const response: any = await this.modalUbigeosComponent.open();
      if (response) {
        this.participantForm.controls.ubigeo_domicilio.setValue(response.distrito);
        this.participantForm.controls.ubigeo_domicilio_id.setValue(response.ubigeo_reniec);
      }
    } catch (error) {

    }
  }

  async updateParticipant() {
    try {
      const body = {
        nombres: this.participantForm.value.nombres,
        apellido_paterno: this.participantForm.value.apellido_paterno,
        apellido_materno: this.participantForm.value.apellido_materno,
        fecha_nacimiento: this.participantForm.value.fecha_nacimiento,
        ubigeo_nacimiento: this.participantForm.value.ubigeo_nacimiento_id,
        dni: this.participantForm.value.dni,
        domicilio: this.participantForm.value.domicilio,
        ubigeo_domicilio: this.participantForm.value.ubigeo_domicilio_id,
        n_celular: this.participantForm.value.n_celular,
        talla: this.participantForm.value.talla,
        peso: this.participantForm.value.peso,
        participantPhoto: this.participantForm.value.participantPhoto,
      };
      const response: any = await firstValueFrom(this.participantService.updateParticipant(body, +this.participantForm.value.id!));
      if (response.status) {
        this.modalWarning.open('Se actualizó el participante de manera correcta', 'success');
        this.close(true);
      } else {
        this.modalWarning.open(response.error);
      }

    } catch (error) {

    }
  }

  async getParticipantById(id: number) {
    try {
      const dataToSend = {
        where: btoa(JSON.stringify([
          ['participant.id', '=', id,]
        ])),
        pagination_itemQuantity: 10,
        pagination_step: 0,
      };
      const response: any = await firstValueFrom(this.participantService.getParticipant(dataToSend));

      if (response.data) {
        const participant = response.data.data[0];

        this.participantForm.controls.id.setValue(participant.id);
        this.participantForm.controls.nombres.setValue(participant.nombres);
        this.participantForm.controls.apellido_paterno.setValue(participant.apellido_paterno);
        this.participantForm.controls.apellido_materno.setValue(participant.apellido_materno);
        this.participantForm.controls.fecha_nacimiento.setValue(participant.fecha_nacimiento);
        this.participantForm.controls.n_celular.setValue(participant.n_celular);
        this.participantForm.controls.talla.setValue(participant.talla);
        this.participantForm.controls.peso.setValue(participant.peso);
        this.participantForm.controls.participantPhoto.setValue(participant.participantPhoto);
        this.participantForm.controls.dni.setValue(participant.dni);
        this.participantForm.controls.domicilio.setValue(participant.domicilio);

        this.base64Image = participant.participantPhoto;

        const responseUbigeoDomicilio = await this.getUbigeo(participant.ubigeo_domicilio);
        if (responseUbigeoDomicilio) {
          this.participantForm.controls.ubigeo_domicilio.setValue(responseUbigeoDomicilio.distrito);
          this.participantForm.controls.ubigeo_domicilio_id.setValue(responseUbigeoDomicilio.ubigeo_reniec);
        }

        const responseUbigeoNacimiento = await this.getUbigeo(participant.ubigeo_nacimiento);
        if (responseUbigeoNacimiento) {
          this.participantForm.controls.ubigeo_nacimiento.setValue(responseUbigeoNacimiento.distrito);
          this.participantForm.controls.ubigeo_nacimiento_id.setValue(responseUbigeoNacimiento.ubigeo_reniec);
        }
      }
    } catch (error) {
      this.modalWarning.open('Ocurrió un error...');
    }
  }

  open(idParticipant: number): Promise<boolean> {
    this.isOpen = true;
    this.getParticipantById(idParticipant);
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
    this.participantForm.reset();
    this.base64Image = '';
  }
}
