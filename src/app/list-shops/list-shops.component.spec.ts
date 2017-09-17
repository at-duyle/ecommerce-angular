import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListShopsComponent } from './list-shops.component';

describe('ListShopsComponent', () => {
  let component: ListShopsComponent;
  let fixture: ComponentFixture<ListShopsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListShopsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListShopsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
