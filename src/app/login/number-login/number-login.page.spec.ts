import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NumberLoginPage } from './number-login.page';

describe('NumberLoginPage', () => {
  let component: NumberLoginPage;
  let fixture: ComponentFixture<NumberLoginPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NumberLoginPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NumberLoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
