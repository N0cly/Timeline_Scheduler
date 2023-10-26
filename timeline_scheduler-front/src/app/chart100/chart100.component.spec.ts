import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Chart100Component } from './chart100.component';

describe('Chart100Component', () => {
  let component: Chart100Component;
  let fixture: ComponentFixture<Chart100Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Chart100Component]
    });
    fixture = TestBed.createComponent(Chart100Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
