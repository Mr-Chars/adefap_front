import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEditParticipantComponent } from './modal-edit-participant.component';

describe('ModalEditParticipantComponent', () => {
  let component: ModalEditParticipantComponent;
  let fixture: ComponentFixture<ModalEditParticipantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalEditParticipantComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalEditParticipantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
