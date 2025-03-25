import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-modal-delete-participant',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal-delete-participant.component.html',
  styleUrl: './modal-delete-participant.component.css'
})
export class ModalDeleteParticipantComponent {
  isOpen = false;
  private responseSubject = new Subject<boolean>();

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
  }
}
