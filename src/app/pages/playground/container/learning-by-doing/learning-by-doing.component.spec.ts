import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LearningByDoingComponent } from './learning-by-doing.component';

describe('LearningByDoingComponent', () => {
  let component: LearningByDoingComponent;
  let fixture: ComponentFixture<LearningByDoingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LearningByDoingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LearningByDoingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
