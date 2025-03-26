import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDeleteCentroEstudioComponent } from './modal-delete-centro-estudio.component';

describe('ModalDeleteCentroEstudioComponent', () => {
  let component: ModalDeleteCentroEstudioComponent;
  let fixture: ComponentFixture<ModalDeleteCentroEstudioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalDeleteCentroEstudioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalDeleteCentroEstudioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
