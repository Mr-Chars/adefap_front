import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { firstValueFrom, Subject } from 'rxjs';
import { ModalWarningComponent } from '../../modal-warning/modal-warning.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DisplayInputValidationMessageComponent } from '../../../components/display-input-validation-message/display-input-validation-message.component';
import { ClubService } from '../../../services/club.service';

@Component({
  selector: 'app-modal-add-club',
  standalone: true,
  imports: [CommonModule, ModalWarningComponent, ReactiveFormsModule, DisplayInputValidationMessageComponent],
  templateUrl: './modal-add-club.component.html',
  styleUrl: './modal-add-club.component.css'
})
export class ModalAddClubComponent {
  @ViewChild(ModalWarningComponent) modalWarning!: ModalWarningComponent;
  isOpen = false;
  private responseSubject = new Subject<boolean>();

  clubForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
  });

  constructor(
    private clubService: ClubService,
  ) { }

  async addClub() {
    try {
      const body = {
        name: this.clubForm.value.name,
      };
      const response: any = await firstValueFrom(this.clubService.addClub(body));
      if (response.status) {
        this.modalWarning.open('Se agregó el club de manera correcta', 'success');
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
    this.clubForm.reset();
  }
}
