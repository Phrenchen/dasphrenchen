import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyTubeComponent } from './my-tube.component';

describe('MyTubeComponent', () => {
  let component: MyTubeComponent;
  let fixture: ComponentFixture<MyTubeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyTubeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyTubeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
