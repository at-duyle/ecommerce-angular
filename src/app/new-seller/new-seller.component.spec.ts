import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewSellerComponent } from './new-seller.component';

describe('NewSellerComponent', () => {
  let component: NewSellerComponent;
  let fixture: ComponentFixture<NewSellerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewSellerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewSellerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
