import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { firstValueFrom, Subject } from 'rxjs';
import { ModalWarningComponent } from '../modal-warning/modal-warning.component';
import { ROLS } from '../../constants/generals';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { DisplayInputValidationMessageComponent } from '../../components/display-input-validation-message/display-input-validation-message.component';

@Component({
  selector: 'app-modal-edit-user',
  standalone: true,
  imports: [CommonModule, DisplayInputValidationMessageComponent, ReactiveFormsModule, ModalWarningComponent],
  templateUrl: './modal-edit-user.component.html',
  styleUrl: './modal-edit-user.component.css'
})
export class ModalEditUserComponent {
  @ViewChild(ModalWarningComponent) modalWarning!: ModalWarningComponent;

  private responseSubject = new Subject<boolean>();
  isOpen = false;

  ROLS = ROLS;
  userForm = new FormGroup({
    id: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
    role: new FormControl('', [Validators.required]),
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', []),
  });

  constructor(
    private userService: UserService,
  ) {
  }

  async getUserById(id: number) {
    try {
      const dataToSend = {
        where: JSON.stringify([
          ['user.id', '=', id,]
        ]),
      };
      const response: any = await firstValueFrom(this.userService.getUser(dataToSend));
      if (response.data) {
        this.userForm.controls.id.setValue(response.data[0].id);
        this.userForm.controls.name.setValue(response.data[0].name);
        this.userForm.controls.role.setValue(response.data[0].role);
        this.userForm.controls.username.setValue(response.data[0].username);
      }
    } catch (error) {
      this.modalWarning.open('Ocurrió un error...');
    }
  }

  async editUser() {
    try {
      const body = {
        name: this.userForm.value.name,
        role: this.userForm.value.role,
        username: this.userForm.value.username,
        password: this.userForm.value.password,
      };
      const response: any = await firstValueFrom(this.userService.updateUser(body, +this.userForm.value.id!));
      if (response.status) {
        this.modalWarning.open('Se actualizó el usuario de manera correcta', 'success');
        this.close(true);
      } else {
        this.modalWarning.open(response.error);
      }
    } catch (error) {
      this.modalWarning.open('Ocurrió un error...');
    }
  }


  open(idUser: number): Promise<boolean> {

    this.isOpen = true;
    this.getUserById(idUser);

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
