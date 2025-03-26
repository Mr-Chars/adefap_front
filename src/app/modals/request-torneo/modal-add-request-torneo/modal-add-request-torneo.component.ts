import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { firstValueFrom, Subject } from 'rxjs';
import { RequestTorneoService } from '../../../services/request-torneo.service';
import { DisplayInputValidationMessageComponent } from '../../../components/display-input-validation-message/display-input-validation-message.component';
import { lastYears, REGEX_TYPES } from '../../../constants/generals';
import { ClubService } from '../../../services/club.service';
import { ModalWarningComponent } from '../../modal-warning/modal-warning.component';
import { ModalUbigeosComponent } from '../../modal-ubigeos/modal-ubigeos.component';
import { ParticipantService } from '../../../services/participant.service';
import { UbigeoService } from '../../../services/ubigeo.service';

@Component({
  selector: 'app-modal-add-request-torneo',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DisplayInputValidationMessageComponent,
    ModalWarningComponent,
    ModalUbigeosComponent
  ],
  templateUrl: './modal-add-request-torneo.component.html',
  styleUrl: './modal-add-request-torneo.component.css'
})
export class ModalAddRequestTorneoComponent {
  @ViewChild(ModalWarningComponent) modalWarning!: ModalWarningComponent;
  @ViewChild(ModalUbigeosComponent) modalUbigeosComponent!: ModalUbigeosComponent;
  isOpen = false;
  private responseSubject = new Subject<boolean>();

  base64Image: string | null = null;

  lastYears = lastYears;

  requestTorneoForm = new FormGroup({
    id_club: new FormControl('', [Validators.required]),
    id_participant: new FormControl('', [Validators.required,]),
    centro_estudios: new FormControl('', [Validators.required,]),
    ubigeo_centro_estudios: new FormControl('', [Validators.required,]),

    nombres: new FormControl('', [Validators.required,]),
    apellido_paterno: new FormControl('', [Validators.required,]),
    apellido_materno: new FormControl('', [Validators.required,]),
    fecha_nacimiento: new FormControl('', [Validators.required,]),
    distrito_nacimiento: new FormControl('', [Validators.required,]),
    distrito_centro_estudios: new FormControl('', [Validators.required,]),
    year_estudios: new FormControl('', [Validators.required,]),
    dni: new FormControl('', [Validators.required, Validators.pattern(REGEX_TYPES.dni)]),
    domicilio: new FormControl('', [Validators.required,]),
    distrito_domicilio: new FormControl('', [Validators.required,]),
    n_celular: new FormControl('', [Validators.required, Validators.pattern(REGEX_TYPES.number)]),
    talla: new FormControl('', [Validators.required,]),
    peso: new FormControl('', [Validators.required, Validators.pattern(REGEX_TYPES.peso)]),
  });
  clubs: any = [];

  constructor(
    private requestTorneoService: RequestTorneoService,
    private clubService: ClubService,
    private participantService: ParticipantService,
    private ubigeoService: UbigeoService,
  ) {
    this.getClubs();
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

  async searchParticipanteById() {
    try {
      const dataToSend = {
        where: btoa(JSON.stringify([
          ['participant.dni', '=', this.requestTorneoForm.value.dni,]
        ])),
        pagination_itemQuantity: 10,
        pagination_step: 0,
      };
      const response: any = await firstValueFrom(this.participantService.getParticipant(dataToSend));
      if (response.data.data) {
        const participant = response.data.data[0];
        this.base64Image = participant.participantPhoto;
        this.requestTorneoForm.controls.id_participant.setValue(participant.id);
        this.requestTorneoForm.controls.nombres.setValue(participant.nombres);
        this.requestTorneoForm.controls.apellido_paterno.setValue(participant.apellido_paterno);
        this.requestTorneoForm.controls.apellido_materno.setValue(participant.apellido_materno);
        this.requestTorneoForm.controls.fecha_nacimiento.setValue(participant.fecha_nacimiento);
        this.requestTorneoForm.controls.n_celular.setValue(participant.n_celular);
        this.requestTorneoForm.controls.talla.setValue(participant.talla);
        this.requestTorneoForm.controls.peso.setValue(participant.peso);
        this.requestTorneoForm.controls.dni.setValue(participant.dni);
        this.requestTorneoForm.controls.domicilio.setValue(participant.domicilio);

        const responseUbigeoNacimientp = await this.getUbigeo(participant.ubigeo_nacimiento);
        if (responseUbigeoNacimientp) {
          this.requestTorneoForm.controls.distrito_nacimiento.setValue(responseUbigeoNacimientp.distrito);
        }

        const responseUbigeoDomicilio = await this.getUbigeo(participant.ubigeo_domicilio);
        if (responseUbigeoDomicilio) {
          this.requestTorneoForm.controls.distrito_domicilio.setValue(responseUbigeoDomicilio.distrito);
        }
      } else {
        this.modalWarning.open('Ocurrió un error al buscar el participante');
      }

    } catch (error) {
      this.modalWarning.open('Ocurrió un error al buscar el participante');
    }
  }

  async chooseUbigeoCentroEstudio() {
    try {
      const response: any = await this.modalUbigeosComponent.open();
      if (response) {
        this.requestTorneoForm.controls.distrito_centro_estudios.setValue(response.distrito);
        this.requestTorneoForm.controls.ubigeo_centro_estudios.setValue(response.ubigeo_reniec);
      }
    } catch (error) {

    }
  }

  async getClubs() {
    try {
      const dataToSend = {
        where: '',
      };
      const response: any = await firstValueFrom(this.clubService.getClub(dataToSend));
      if (response.data) {
        this.clubs = response.data;
      }
    } catch (error) {
      this.modalWarning.open('Ocurrió un error...');
    }
  }

  async addRequest() {
    try {
      const body = {
        id_participant: this.requestTorneoForm.value.id_participant,
        id_club: this.requestTorneoForm.value.id_club,
        centro_estudios: this.requestTorneoForm.value.centro_estudios,
        ubigeo_centro_estudios: this.requestTorneoForm.value.ubigeo_centro_estudios,
        year_estudios: this.requestTorneoForm.value.year_estudios,
      };
      const response: any = await firstValueFrom(this.requestTorneoService.addRequestTorneo(body));
      if (response.status) {
        this.modalWarning.open('Se agregó el requerimiento de manera correcta', 'success');
        this.close(true);
      } else {
        this.modalWarning.open(response.error);
      }
    } catch (error) {
      this.modalWarning.open('Ocurrió un error...');
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
    this.requestTorneoForm.reset();
  }
}
