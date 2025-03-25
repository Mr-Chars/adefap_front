import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalUbigeosComponent } from './modal-ubigeos.component';

describe('ModalUbigeosComponent', () => {
  let component: ModalUbigeosComponent;
  let fixture: ComponentFixture<ModalUbigeosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalUbigeosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalUbigeosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
