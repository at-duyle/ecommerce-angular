import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorCheckoutComponent } from './error-checkout.component';

describe('ErrorCheckoutComponent', () => {
  let component: ErrorCheckoutComponent;
  let fixture: ComponentFixture<ErrorCheckoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ErrorCheckoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorCheckoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
