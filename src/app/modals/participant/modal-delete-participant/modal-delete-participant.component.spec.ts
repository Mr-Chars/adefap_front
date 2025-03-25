import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDeleteParticipantComponent } from './modal-delete-participant.component';

describe('ModalDeleteParticipantComponent', () => {
  let component: ModalDeleteParticipantComponent;
  let fixture: ComponentFixture<ModalDeleteParticipantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalDeleteParticipantComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalDeleteParticipantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
