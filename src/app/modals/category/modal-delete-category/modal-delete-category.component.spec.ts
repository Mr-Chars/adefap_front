import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDeleteCategoryComponent } from './modal-delete-category.component';

describe('ModalDeleteCategoryComponent', () => {
  let component: ModalDeleteCategoryComponent;
  let fixture: ComponentFixture<ModalDeleteCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalDeleteCategoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalDeleteCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
