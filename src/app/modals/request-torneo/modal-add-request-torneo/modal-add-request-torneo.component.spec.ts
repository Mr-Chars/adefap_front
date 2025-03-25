import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAddRequestTorneoComponent } from './modal-add-request-torneo.component';

describe('ModalAddRequestTorneoComponent', () => {
  let component: ModalAddRequestTorneoComponent;
  let fixture: ComponentFixture<ModalAddRequestTorneoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalAddRequestTorneoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalAddRequestTorneoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
