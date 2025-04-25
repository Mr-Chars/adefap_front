import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { firstValueFrom, Subject } from 'rxjs';
import { DisplayInputValidationMessageComponent } from '../../../components/display-input-validation-message/display-input-validation-message.component';
import { ROLS } from '../../../constants/generals';
import { UserService } from '../../../services/user.service';
import { ModalWarningComponent } from '../../modal-warning/modal-warning.component';
import { RegionService } from '../../../services/region.service';

@Component({
  selector: 'app-modal-user',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, DisplayInputValidationMessageComponent, ModalWarningComponent],
  templateUrl: './modal-user.component.html',
  styleUrl: './modal-user.component.css'
})
export class ModalUserComponent {
  @ViewChild(ModalWarningComponent) modalWarning!: ModalWarningComponent;

  private responseSubject = new Subject<boolean>();
  isOpen = false;

  ROLS = ROLS;
  userForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    role: new FormControl('', [Validators.required]),
    id_region: new FormControl('', []),
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });
  regions: any = [];

  constructor(
    private userService: UserService,
    private regionService: RegionService,
  ) { }

  async getRegion() {
    try {
      const dataToSend = {
        where: '',
      };
      const response: any = await firstValueFrom(this.regionService.getRegion(dataToSend));
      console.log(response.data);

      if (response.data) {
        this.regions = response.data;
      }
    } catch (error) {
      this.modalWarning.open('Ocurrió un error...');
    }
  }

  async addUser() {
    try {
      const body = {
        name: this.userForm.value.name,
        role: this.userForm.value.role,
        id_region: this.userForm.value.id_region,
        username: this.userForm.value.username,
        password: this.userForm.value.password,
      };
      const response: any = await firstValueFrom(this.userService.addUser(body));
      if (response.status) {
        this.modalWarning.open('Se agregó el usuario de manera correcta', 'success');
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
    this.getRegion();
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
    this.userForm.reset();
  }
}
