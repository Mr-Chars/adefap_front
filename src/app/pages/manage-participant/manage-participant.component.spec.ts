import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageParticipantComponent } from './manage-participant.component';

describe('ManageParticipantComponent', () => {
  let component: ManageParticipantComponent;
  let fixture: ComponentFixture<ManageParticipantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageParticipantComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageParticipantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
