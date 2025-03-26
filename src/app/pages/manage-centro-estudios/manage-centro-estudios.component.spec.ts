import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageCentroEstudiosComponent } from './manage-centro-estudios.component';

describe('ManageCentroEstudiosComponent', () => {
  let component: ManageCentroEstudiosComponent;
  let fixture: ComponentFixture<ManageCentroEstudiosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageCentroEstudiosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageCentroEstudiosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
