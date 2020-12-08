import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodGameComponent } from './food-game.component';

describe('FoodGameComponent', () => {
  let component: FoodGameComponent;
  let fixture: ComponentFixture<FoodGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FoodGameComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FoodGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
