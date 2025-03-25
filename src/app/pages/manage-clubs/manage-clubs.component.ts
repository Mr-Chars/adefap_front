import { Component, ViewChild } from '@angular/core';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { ModalAddClubComponent } from '../../modals/clubs/modal-add-club/modal-add-club.component';
import { ModalWarningComponent } from '../../modals/modal-warning/modal-warning.component';
import { ClubService } from '../../services/club.service';
import { firstValueFrom } from 'rxjs';
import { ModalEditClubComponent } from '../../modals/clubs/modal-edit-club/modal-edit-club.component';
import { ModalDeleteClubComponent } from '../../modals/clubs/modal-delete-club/modal-delete-club.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-manage-clubs',
  standalone: true,
  imports: [
    SidebarComponent,
    CommonModule,
    ModalAddClubComponent,
    ModalEditClubComponent,
    ModalDeleteClubComponent,
    ModalWarningComponent,
    FormsModule
  ],
  templateUrl: './manage-clubs.component.html',
  styleUrl: './manage-clubs.component.css'
})
export class ManageClubsComponent {
  @ViewChild(ModalWarningComponent) modalWarning!: ModalWarningComponent;
  @ViewChild(ModalAddClubComponent) modalAddClub!: ModalAddClubComponent;
  @ViewChild(ModalEditClubComponent) modalEditClub!: ModalEditClubComponent;
  @ViewChild(ModalDeleteClubComponent) modalDeleteClubComponent!: ModalDeleteClubComponent;

  clubs: any = [];

  clubWanted = '';
  constructor(
    private clubService: ClubService,
  ) { }

  ngOnInit(): void {
    this.getClubs();
  }

  async getClubs() {
    try {
      const dataToSend = {
        where: this.clubWanted ? btoa(JSON.stringify([
          ['clubs.name', 'like', '%' + this.clubWanted + '%']
        ])) : '',
      };
      const response: any = await firstValueFrom(this.clubService.getClub(dataToSend));
      if (response.data) {
        this.clubs = response.data;
      }
    } catch (error) {
      this.modalWarning.open('Ocurrió un error...');
    }
  }

  async openModalAddClub() {
    const result = await this.modalAddClub.open();
    this.getClubs();
  }

  async openModalEditClub(id: number) {
    try {
      const result = await this.modalEditClub.open(id);
      this.getClubs();

    } catch (error) {

    }
  }

  async deleteClub(id: number) {
    try {
      const result = await this.modalDeleteClubComponent.open();
      if (result) {
        const response: any = await firstValueFrom(this.clubService.deleteClub(id));
        if (response.status) {
          this.getClubs();
          this.modalWarning.open('Se eliminó el club de manera correcta', 'success');
        } else {
          this.modalWarning.open('Ocurrió un error...');
        }
      }

    } catch (error) {
      this.modalWarning.open('Ocurrió un error...');
    }
  }
}
