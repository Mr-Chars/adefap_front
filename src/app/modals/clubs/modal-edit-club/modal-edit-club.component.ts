import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { ModalWarningComponent } from '../../modal-warning/modal-warning.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DisplayInputValidationMessageComponent } from '../../../components/display-input-validation-message/display-input-validation-message.component';
import { firstValueFrom, Subject } from 'rxjs';
import { ClubService } from '../../../services/club.service';

@Component({
  selector: 'app-modal-edit-club',
  standalone: true,
  imports: [CommonModule, ModalWarningComponent, ReactiveFormsModule, DisplayInputValidationMessageComponent],
  templateUrl: './modal-edit-club.component.html',
  styleUrl: './modal-edit-club.component.css'
})
export class ModalEditClubComponent {
  @ViewChild(ModalWarningComponent) modalWarning!: ModalWarningComponent;
  isOpen = false;
  private responseSubject = new Subject<boolean>();

  clubForm = new FormGroup({
    id: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
  });

  constructor(
    private clubService: ClubService,
  ) { }

  async editClub() {
    try {
      const body = {
        name: this.clubForm.value.name,
      };
      const response: any = await firstValueFrom(this.clubService.updateClub(body, +this.clubForm.value.id!));
      if (response.status) {
        this.modalWarning.open('Se actualizó el club de manera correcta', 'success');
        this.close(true);
      } else {
        this.modalWarning.open(response.error);
      }
    } catch (error) {
      this.modalWarning.open('Ocurrió un error...');
    }
  }

  async getUserById(id: number) {
    try {
      const dataToSend = {
        where: btoa(JSON.stringify([
          ['clubs.id', '=', id,]
        ])),
      };
      const response: any = await firstValueFrom(this.clubService.getClub(dataToSend));
      if (response.data) {
        this.clubForm.controls.id.setValue(response.data[0].id);
        this.clubForm.controls.name.setValue(response.data[0].name);
      }
    } catch (error) {
      this.modalWarning.open('Ocurrió un error...');
    }
  }

  open(idClub: number): Promise<boolean> {
    this.isOpen = true;
    this.getUserById(idClub);
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
    this.clubForm.reset();
  }
}
