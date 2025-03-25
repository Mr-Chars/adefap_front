import { Component, ViewChild } from '@angular/core';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { ModalUserComponent } from '../../modals/modal-user/modal-user.component';
import { ModalWarningComponent } from '../../modals/modal-warning/modal-warning.component';
import { firstValueFrom } from 'rxjs';
import { UserService } from '../../services/user.service';
import { ModalDeleteUserComponent } from '../../modals/modal-delete-user/modal-delete-user.component';
import { ModalEditUserComponent } from '../../modals/modal-edit-user/modal-edit-user.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-manage-user',
  standalone: true,
  imports: [
    SidebarComponent,
    CommonModule,
    ModalUserComponent,
    ModalWarningComponent,
    ModalDeleteUserComponent,
    ModalEditUserComponent,
    FormsModule
  ],
  templateUrl: './manage-user.component.html',
  styleUrl: './manage-user.component.css'
})
export class ManageUserComponent {
  @ViewChild(ModalWarningComponent) modalWarning!: ModalWarningComponent;
  @ViewChild(ModalUserComponent) modal!: ModalUserComponent;
  @ViewChild(ModalDeleteUserComponent) modalDeleteUser!: ModalDeleteUserComponent;
  @ViewChild(ModalEditUserComponent) modalEditUser!: ModalEditUserComponent;

  users: any = [];

  userWanted = '';
  constructor(
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.getUsers();
  }

  async openModalEditUser(idUser: number) {
    try {
      const result = await this.modalEditUser.open(idUser);
      this.getUsers();

    } catch (error) {

    }
  }

  async deleteUser(id: number) {
    try {
      const result = await this.modalDeleteUser.open();

      if (result) {
        const response: any = await firstValueFrom(this.userService.deleteUser(id));
        if (response.status) {
          this.getUsers();
          this.modalWarning.open('Se eliminó el usuario de manera correcta', 'success');
        } else {
          this.modalWarning.open('Ocurrió un error...');
        }
      }

    } catch (error) {
      this.modalWarning.open('Ocurrió un error...');
    }
  }

  async getUsers() {
    try {
      const dataToSend = {
        where: this.userWanted ? btoa(JSON.stringify([
          ['user.name', 'like', '%' + this.userWanted + '%']
        ])) : '',
      };
      const response: any = await firstValueFrom(this.userService.getUser(dataToSend));
      if (response.data) {
        this.users = response.data;
      }
    } catch (error) {
      this.modalWarning.open('Ocurrió un error...');
    }
  }

  async openModalAddUser() {
    const result = await this.modal.open();
  }
}
