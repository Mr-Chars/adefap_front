import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAddRegionComponent } from './modal-add-region.component';

describe('ModalAddRegionComponent', () => {
  let component: ModalAddRegionComponent;
  let fixture: ComponentFixture<ModalAddRegionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalAddRegionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalAddRegionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
