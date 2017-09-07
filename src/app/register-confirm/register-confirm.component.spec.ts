import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterConfirmComponent } from './register-confirm.component';

describe('RegisterConfirmComponent', () => {
  let component: RegisterConfirmComponent;
  let fixture: ComponentFixture<RegisterConfirmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterConfirmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
