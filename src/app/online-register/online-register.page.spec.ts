import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OnlineRegisterPage } from './online-register.page';

describe('OnlineRegisterPage', () => {
  let component: OnlineRegisterPage;
  let fixture: ComponentFixture<OnlineRegisterPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnlineRegisterPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnlineRegisterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
