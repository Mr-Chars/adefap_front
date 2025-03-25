import { Component, ViewChild } from '@angular/core';
import { ModalWarningComponent } from '../../modal-warning/modal-warning.component';
import { firstValueFrom, Subject } from 'rxjs';
import { ParticipantService } from '../../../services/participant.service';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { REGEX_TYPES } from '../../../constants/generals';
import { DisplayInputValidationMessageComponent } from '../../../components/display-input-validation-message/display-input-validation-message.component';
import { ModalUbigeosComponent } from '../../modal-ubigeos/modal-ubigeos.component';

@Component({
  selector: 'app-modal-add-participant',
  standalone: true,
  imports: [
    CommonModule,
    ModalWarningComponent,
    ReactiveFormsModule,
    DisplayInputValidationMessageComponent,
    ModalUbigeosComponent
  ],
  templateUrl: './modal-add-participant.component.html',
  styleUrl: './modal-add-participant.component.css'
})
export class ModalAddParticipantComponent {
  @ViewChild(ModalUbigeosComponent) modalUbigeosComponent!: ModalUbigeosComponent;
  @ViewChild(ModalWarningComponent) modalWarning!: ModalWarningComponent;
  isOpen = false;
  private responseSubject = new Subject<boolean>();

  participantForm = new FormGroup({
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
    private participantService: ParticipantService
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

  async addParticipant() {
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
      const response: any = await firstValueFrom(this.participantService.addParticipant(body));
      if (response.status) {
        this.modalWarning.open('Se agregó el participante de manera correcta', 'success');
        this.close(true);
      } else {
        this.modalWarning.open(response.error);
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
    this.participantForm.reset();
    this.base64Image = '';
  }
}
