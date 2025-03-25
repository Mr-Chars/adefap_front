import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAddClubComponent } from './modal-add-club.component';

describe('ModalAddClubComponent', () => {
  let component: ModalAddClubComponent;
  let fixture: ComponentFixture<ModalAddClubComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalAddClubComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalAddClubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
