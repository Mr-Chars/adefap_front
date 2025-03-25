import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEditClubComponent } from './modal-edit-club.component';

describe('ModalEditClubComponent', () => {
  let component: ModalEditClubComponent;
  let fixture: ComponentFixture<ModalEditClubComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalEditClubComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalEditClubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
