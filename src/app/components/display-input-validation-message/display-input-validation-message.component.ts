import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-display-input-validation-message',
  templateUrl: './display-input-validation-message.component.html',
  styleUrls: ['./display-input-validation-message.component.css']
})
export class DisplayInputValidationMessageComponent {

  @Input() set type(value: any) {
    if (value.required) {
      this.mode = 'REQUIRED';
    }
    if (value.pattern) {
      this.mode = 'PATTERN';
    }

  }

  mode = '';

}
