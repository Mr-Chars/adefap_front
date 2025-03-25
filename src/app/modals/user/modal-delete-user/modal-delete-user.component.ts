import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-modal-delete-user',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal-delete-user.component.html',
  styleUrl: './modal-delete-user.component.css'
})
export class ModalDeleteUserComponent {
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
