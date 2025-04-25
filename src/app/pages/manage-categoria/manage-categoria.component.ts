import { Component, ViewChild } from '@angular/core';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { CategoryService } from '../../services/category.service';
import { ModalWarningComponent } from '../../modals/modal-warning/modal-warning.component';
import { ModalAddCategoryComponent } from '../../modals/category/modal-add-category/modal-add-category.component';
import { ModalEditCategoryComponent } from '../../modals/category/modal-edit-category/modal-edit-category.component';
import { ModalDeleteCategoryComponent } from '../../modals/category/modal-delete-category/modal-delete-category.component';

@Component({
  selector: 'app-manage-categoria',
  standalone: true,
  imports: [
    CommonModule,
    SidebarComponent,
    FormsModule,
    ModalWarningComponent,
    ModalAddCategoryComponent,
    ModalEditCategoryComponent,
    ModalDeleteCategoryComponent,
  ],
  templateUrl: './manage-categoria.component.html',
  styleUrl: './manage-categoria.component.css'
})
export class ManageCategoriaComponent {
  @ViewChild(ModalWarningComponent) modalWarning!: ModalWarningComponent;
  @ViewChild(ModalAddCategoryComponent) modalAddCategory!: ModalAddCategoryComponent;
  @ViewChild(ModalEditCategoryComponent) modalEditCategory!: ModalEditCategoryComponent;
  @ViewChild(ModalDeleteCategoryComponent) modalDeleteCategory!: ModalDeleteCategoryComponent;

  isLoading = false;
  categoryWanted = '';
  categories: any = [];
  pagination = {
    current_page: 0,
    totalQuantity: 0,
    last_page: 0,
  };
  constructor(
    private categoryService: CategoryService,
  ) { }

  ngOnInit() {
    this.getCategory();
  }

  async openModalAddCategory() {
    await this.modalAddCategory.open();
    this.getCategory();
  }

  async openModalEditCategory(id: number) {
    try {
      await this.modalEditCategory.open(id);
      this.getCategory();

    } catch (error) {

    }
  }

  async deleteCategory(id: number) {
    try {
      const result = await this.modalDeleteCategory.open();
      if (result) {
        const response: any = await firstValueFrom(this.categoryService.deleteCategory(id));
        if (response.status) {
          this.getCategory();
          this.modalWarning.open('Se eliminó de manera correcta', 'success');
        } else {
          this.modalWarning.open('Ocurrió un error...');
        }
      }

    } catch (error) {
      this.modalWarning.open('Ocurrió un error...');
    }
  }

  async getCategory(pagination_step = 1) {
    this.isLoading = true;
    try {
      const dataToSend = {
        where: this.categoryWanted ? btoa(JSON.stringify([
          ['category.name', 'like', '%' + this.categoryWanted + '%']
        ])) : '',
        pagination_itemQuantity: 10,
        pagination_step,
      };
      const response: any = await firstValueFrom(this.categoryService.getCategory(dataToSend));

      if (response.data.data) {
        this.categories = response.data.data;
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
}
