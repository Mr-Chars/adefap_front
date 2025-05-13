import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { firstValueFrom, Subject } from 'rxjs';
import { CategoryService } from '../../../services/category.service';
import { ModalWarningComponent } from '../../modal-warning/modal-warning.component';
import { DisplayInputValidationMessageComponent } from '../../../components/display-input-validation-message/display-input-validation-message.component';

@Component({
  selector: 'app-modal-add-category',
  standalone: true,
  imports: [
    CommonModule,
    ModalWarningComponent,
    ReactiveFormsModule,
    DisplayInputValidationMessageComponent
  ],
  templateUrl: './modal-add-category.component.html',
  styleUrl: './modal-add-category.component.css'
})
export class ModalAddCategoryComponent {
  @ViewChild(ModalWarningComponent) modalWarning!: ModalWarningComponent;
  private responseSubject = new Subject<boolean>();
  isOpen = false;

  categoryForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
  });


  constructor(
    private categoryService: CategoryService,
  ) { }

  async addCategory() {
    try {
      const dataDecripted = JSON.parse(localStorage.getItem('user_logged')!);
      const body = {
        name: this.categoryForm.value.name,
        id_creator: dataDecripted.id,
      };
      const response: any = await firstValueFrom(this.categoryService.addCategory(body));
      if (response.status) {
        this.modalWarning.open('Se agregó la categoría de manera correcta', 'success');
        this.close(true);
      } else {
        this.modalWarning.open(response.error);
      }
    } catch (error) {
      this.modalWarning.open('Ocurrió un error...');
    }
  }

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
    this.categoryForm.reset();
  }
}
