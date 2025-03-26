import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEditCentroEstudioComponent } from './modal-edit-centro-estudio.component';

describe('ModalEditCentroEstudioComponent', () => {
  let component: ModalEditCentroEstudioComponent;
  let fixture: ComponentFixture<ModalEditCentroEstudioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalEditCentroEstudioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalEditCentroEstudioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
