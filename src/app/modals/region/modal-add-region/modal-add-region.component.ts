import { Component, ViewChild } from '@angular/core';
import { ModalWarningComponent } from '../../modal-warning/modal-warning.component';
import { firstValueFrom, Subject } from 'rxjs';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RegionService } from '../../../services/region.service';
import { CommonModule } from '@angular/common';
import { DisplayInputValidationMessageComponent } from '../../../components/display-input-validation-message/display-input-validation-message.component';

@Component({
  selector: 'app-modal-add-region',
  standalone: true,
  imports: [
    CommonModule,
    ModalWarningComponent,
    ReactiveFormsModule,
    DisplayInputValidationMessageComponent
  ],
  templateUrl: './modal-add-region.component.html',
  styleUrl: './modal-add-region.component.css'
})
export class ModalAddRegionComponent {
  @ViewChild(ModalWarningComponent) modalWarning!: ModalWarningComponent;
  private responseSubject = new Subject<boolean>();
  isOpen = false;

  regionForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
  });

  constructor(
    private regionService: RegionService,
  ) { }

  async addRegion() {
    try {
      const dataDecripted = JSON.parse(localStorage.getItem('user_logged')!);
      const body = {
        name: this.regionForm.value.name,
        id_creator: dataDecripted.id,
      };
      const response: any = await firstValueFrom(this.regionService.addRegion(body));
      if (response.status) {
        this.modalWarning.open('Se agregó la región de manera correcta', 'success');
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
    this.regionForm.reset();
  }
}
