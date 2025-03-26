import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-modal-warning',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal-warning.component.html',
  styleUrl: './modal-warning.component.css'
})
export class ModalWarningComponent {
  timeout: number = 1500;
  message = '';
  isVisible = false;
  classContent = 'error-content';
  constructor() { }

  showModal() {
    this.isVisible = true;
    setTimeout(() => {
      this.isVisible = false;
    }, this.timeout);
  }

  open(message: string, status = 'error') {
    this.isVisible = true;
    this.message = message;

    if (status === 'success') {
      this.classContent = 'success-content';
    }

    setTimeout(() => {
      this.isVisible = false;
      this.message = '';
      this.classContent = 'error-content';
    }, this.timeout);
  }
}
