import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { ModalWarningComponent } from '../../modal-warning/modal-warning.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DisplayInputValidationMessageComponent } from '../../../components/display-input-validation-message/display-input-validation-message.component';
import { firstValueFrom, Subject } from 'rxjs';
import { RegionService } from '../../../services/region.service';

@Component({
  selector: 'app-modal-edit-region',
  standalone: true,
  imports: [
    CommonModule,
    ModalWarningComponent,
    ReactiveFormsModule,
    DisplayInputValidationMessageComponent
  ],
  templateUrl: './modal-edit-region.component.html',
  styleUrl: './modal-edit-region.component.css'
})
export class ModalEditRegionComponent {
  @ViewChild(ModalWarningComponent) modalWarning!: ModalWarningComponent;
  private responseSubject = new Subject<boolean>();
  isOpen = false;

  regionForm = new FormGroup({
    id: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
  });

  constructor(
    private regionService: RegionService,
  ) { }

  async getRegionById(id: number) {
    try {
      const dataToSend = {
        where: btoa(JSON.stringify([
          ['region.id', '=', id,]
        ])),
      };
      const response: any = await firstValueFrom(this.regionService.getRegion(dataToSend));

      if (response.data) {
        this.regionForm.controls.id.setValue(response.data[0].id);
        this.regionForm.controls.name.setValue(response.data[0].name);
      }
    } catch (error) {
      this.modalWarning.open('Ocurrió un error...');
    }
  }

  async updateRegion() {
    try {
      const body = {
        name: this.regionForm.value.name,
      };
      const response: any = await firstValueFrom(this.regionService.updateRegion(body, +this.regionForm.value.id!));
      if (response.status) {
        this.modalWarning.open('Se actualizó la región de manera correcta', 'success');
        this.close(true);
      } else {
        this.modalWarning.open(response.error);
      }
    } catch (error) {
      this.modalWarning.open('Ocurrió un error...');
    }
  }

  open(id: number): Promise<boolean> {
    this.isOpen = true;
    this.getRegionById(id);
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
