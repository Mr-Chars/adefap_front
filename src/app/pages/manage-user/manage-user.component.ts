import { Component, ViewChild } from '@angular/core';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { ModalUserComponent } from '../../modals/user/modal-user/modal-user.component';
import { ModalWarningComponent } from '../../modals/modal-warning/modal-warning.component';
import { firstValueFrom } from 'rxjs';
import { UserService } from '../../services/user.service';
import { ModalDeleteUserComponent } from '../../modals/user/modal-delete-user/modal-delete-user.component';
import { ModalEditUserComponent } from '../../modals/user/modal-edit-user/modal-edit-user.component';
import { FormsModule } from '@angular/forms';
import { StfPaginationComponent, StfTextComponent } from 'stf-components';

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
    FormsModule,
    StfPaginationComponent,
    StfTextComponent
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
  isLoading = true;
  pagination = {
    current_page: 0,
    totalQuantity: 0,
    last_page: 0,
  };
  constructor(
    private userService: UserService,
  ) { }

  ngOnInit() {
    this.getUsers();
  }

  pageChangedPagination(event: any) {
    this.getUsers(event.currentPage)
  }

  async openModalEditUser(idUser: number) {
    try {
      const result = await this.modalEditUser.open(idUser);
      this.getUsers();

    } catch (error) {

    }
  }

  async deleteUser(id: number) {
    this.isLoading = true;
    try {
      const result = await this.modalDeleteUser.open();

      if (result) {
        const response: any = await firstValueFrom(this.userService.deleteUser(id));
        this.isLoading = false;
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

  async getUsers(pagination_step = 1) {
    this.isLoading = true;
    try {
      const dataToSend = {
        where: this.userWanted ? btoa(JSON.stringify([
          ['user.name', 'like', '%' + this.userWanted + '%']
        ])) : '',
        pagination_itemQuantity: 10,
        pagination_step,
      };
      const response: any = await firstValueFrom(this.userService.getUser(dataToSend));

      if (response.data.data) {
        this.users = response.data.data;
        this.pagination = {
          current_page: response.data.current_page,
          totalQuantity: response.data.total,
          last_page: response.data.last_page,
        };
      }
    } catch (error) {
      this.modalWarning.open('Ocurrió un error...');
    } finally {
      this.isLoading = false;
    }
  }

  async openModalAddUser() {
    await this.modal.open();
    this.getUsers();
  }
}
