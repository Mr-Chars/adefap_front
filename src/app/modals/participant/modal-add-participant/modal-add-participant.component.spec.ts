import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAddParticipantComponent } from './modal-add-participant.component';

describe('ModalAddParticipantComponent', () => {
  let component: ModalAddParticipantComponent;
  let fixture: ComponentFixture<ModalAddParticipantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalAddParticipantComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalAddParticipantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
