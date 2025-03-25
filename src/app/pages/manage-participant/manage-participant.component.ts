import { Component, ViewChild } from '@angular/core';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ParticipantService } from '../../services/participant.service';
import { ModalAddParticipantComponent } from '../../modals/participant/modal-add-participant/modal-add-participant.component';
import { firstValueFrom } from 'rxjs';
import { ModalWarningComponent } from '../../modals/modal-warning/modal-warning.component';
import { ModalEditParticipantComponent } from '../../modals/participant/modal-edit-participant/modal-edit-participant.component';
import { ModalDeleteParticipantComponent } from '../../modals/participant/modal-delete-participant/modal-delete-participant.component';

@Component({
  selector: 'app-manage-participant',
  standalone: true,
  imports: [
    SidebarComponent,
    CommonModule,
    FormsModule,
    ModalAddParticipantComponent,
    ModalWarningComponent,
    ModalEditParticipantComponent,
    ModalDeleteParticipantComponent
  ],
  templateUrl: './manage-participant.component.html',
  styleUrl: './manage-participant.component.css'
})
export class ManageParticipantComponent {
  @ViewChild(ModalWarningComponent) modalWarning!: ModalWarningComponent;
  @ViewChild(ModalAddParticipantComponent) modalAddParticipant!: ModalAddParticipantComponent;
  @ViewChild(ModalEditParticipantComponent) modalEditParticipant!: ModalEditParticipantComponent;
  @ViewChild(ModalDeleteParticipantComponent) modalDeleteParticipant!: ModalDeleteParticipantComponent;
  participants: any = [];

  participantWanted = '';

  constructor(
    private participantService: ParticipantService
  ) {

  }

  ngOnInit(): void {
    this.getParticipants();
  }

  async getParticipants(pagination_step = 1) {
    try {
      const dataToSend = {
        where: this.participantWanted ? btoa(JSON.stringify([
          ['participant.nombres', 'like', '%' + this.participantWanted + '%']
        ])) : '',
        pagination_itemQuantity: 10,
        pagination_step,
      };
      const response: any = await firstValueFrom(this.participantService.getParticipant(dataToSend));
      if (response.data) {
        this.participants = response.data.data;
      }
    } catch (error) {
      this.modalWarning.open('Ocurrió un error...');
    }
  }

  async openModalAddParticipant() {
    const result = await this.modalAddParticipant.open();
    this.getParticipants();
  }

  async openModalEditParticipant(id: number) {
    const result = await this.modalEditParticipant.open(id);
    this.getParticipants();
  }

  async deleteParticipant(id: number) {
    try {
      const result = await this.modalDeleteParticipant.open();
      if (result) {
        const response: any = await firstValueFrom(this.participantService.deleteParticipant(id));
        if (response.status) {
          this.getParticipants();
          this.modalWarning.open('Se eliminó el participante de manera correcta', 'success');
        } else {
          this.modalWarning.open('Ocurrió un error...');
        }
      }

    } catch (error) {
      this.modalWarning.open('Ocurrió un error...');
    }
  }
}
