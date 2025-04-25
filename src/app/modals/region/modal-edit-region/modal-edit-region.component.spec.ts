import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEditRegionComponent } from './modal-edit-region.component';

describe('ModalEditRegionComponent', () => {
  let component: ModalEditRegionComponent;
  let fixture: ComponentFixture<ModalEditRegionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalEditRegionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalEditRegionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
