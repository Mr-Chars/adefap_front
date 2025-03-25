import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageRequestTorneoComponent } from './manage-request-torneo.component';

describe('ManageRequestTorneoComponent', () => {
  let component: ManageRequestTorneoComponent;
  let fixture: ComponentFixture<ManageRequestTorneoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageRequestTorneoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageRequestTorneoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
