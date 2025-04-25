import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-modal-delete-category',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal-delete-category.component.html',
  styleUrl: './modal-delete-category.component.css'
})
export class ModalDeleteCategoryComponent {
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
