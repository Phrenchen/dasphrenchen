import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ViewModeSwitchComponent } from './view-mode-switch.component';

describe('ViewModeSwitchComponent', () => {
  let component: ViewModeSwitchComponent;
  let fixture: ComponentFixture<ViewModeSwitchComponent>;

  beforeEach(waitForAsync(() => {
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
