import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDeleteRegionComponent } from './modal-delete-region.component';

describe('ModalDeleteRegionComponent', () => {
  let component: ModalDeleteRegionComponent;
  let fixture: ComponentFixture<ModalDeleteRegionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalDeleteRegionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalDeleteRegionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
