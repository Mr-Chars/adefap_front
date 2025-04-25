import { Component, ViewChild } from '@angular/core';
import { ModalWarningComponent } from '../../modal-warning/modal-warning.component';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DisplayInputValidationMessageComponent } from '../../../components/display-input-validation-message/display-input-validation-message.component';
import { firstValueFrom, Subject } from 'rxjs';
import { CategoryService } from '../../../services/category.service';

@Component({
  selector: 'app-modal-edit-category',
  standalone: true,
  imports: [
    CommonModule,
    ModalWarningComponent,
    ReactiveFormsModule,
    DisplayInputValidationMessageComponent
  ],
  templateUrl: './modal-edit-category.component.html',
  styleUrl: './modal-edit-category.component.css'
})
export class ModalEditCategoryComponent {
  @ViewChild(ModalWarningComponent) modalWarning!: ModalWarningComponent;
  private responseSubject = new Subject<boolean>();
  isOpen = false;

  categoryForm = new FormGroup({
    id: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
  });


  constructor(
    private categoryService: CategoryService,
  ) { }

  async updateCategory() {
    try {
      const body = {
        name: this.categoryForm.value.name,
      };
      const response: any = await firstValueFrom(this.categoryService.updateCategory(body, +this.categoryForm.value.id!));
      if (response.status) {
        this.modalWarning.open('Se actualizó la categoría de manera correcta', 'success');
        this.close(true);
      } else {
        this.modalWarning.open(response.error);
      }
    } catch (error) {
      this.modalWarning.open('Ocurrió un error...');
    }
  }

  async getCategoryById(id: number) {
    try {
      const dataToSend = {
        where: btoa(JSON.stringify([
          ['category.id', '=', id,]
        ])),
      };
      const response: any = await firstValueFrom(this.categoryService.getCategory(dataToSend));

      if (response.data) {
        this.categoryForm.controls.id.setValue(response.data[0].id);
        this.categoryForm.controls.name.setValue(response.data[0].name);
      }
    } catch (error) {
      this.modalWarning.open('Ocurrió un error...');
    }
  }

  open(idCategory: number): Promise<boolean> {
    this.isOpen = true;
    this.getCategoryById(idCategory);
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
