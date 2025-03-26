import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAddCentroEstudioComponent } from './modal-add-centro-estudio.component';

describe('ModalAddCentroEstudioComponent', () => {
  let component: ModalAddCentroEstudioComponent;
  let fixture: ComponentFixture<ModalAddCentroEstudioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalAddCentroEstudioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalAddCentroEstudioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
