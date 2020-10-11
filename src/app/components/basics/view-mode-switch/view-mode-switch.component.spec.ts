import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewModeSwitchComponent } from './view-mode-switch.component';

describe('ViewModeSwitchComponent', () => {
  let component: ViewModeSwitchComponent;
  let fixture: ComponentFixture<ViewModeSwitchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewModeSwitchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewModeSwitchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
