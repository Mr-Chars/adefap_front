import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDeleteClubComponent } from './modal-delete-club.component';

describe('ModalDeleteClubComponent', () => {
  let component: ModalDeleteClubComponent;
  let fixture: ComponentFixture<ModalDeleteClubComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalDeleteClubComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalDeleteClubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
