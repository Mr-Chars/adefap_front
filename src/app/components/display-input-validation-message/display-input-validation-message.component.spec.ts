import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayInputValidationMessageComponent } from './display-input-validation-message.component';

describe('DisplayInputValidationMessageComponent', () => {
  let component: DisplayInputValidationMessageComponent;
  let fixture: ComponentFixture<DisplayInputValidationMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayInputValidationMessageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplayInputValidationMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
