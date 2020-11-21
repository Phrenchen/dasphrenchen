import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MemoryGameComponent } from './memory-game.component';

describe('MemoryGameComponent', () => {
  let component: MemoryGameComponent;
  let fixture: ComponentFixture<MemoryGameComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MemoryGameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemoryGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
