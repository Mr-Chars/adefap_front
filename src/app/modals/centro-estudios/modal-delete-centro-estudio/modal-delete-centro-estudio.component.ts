import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-modal-delete-centro-estudio',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal-delete-centro-estudio.component.html',
  styleUrl: './modal-delete-centro-estudio.component.css'
})
export class ModalDeleteCentroEstudioComponent {
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
