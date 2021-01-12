import { Options } from '@angular-slider/ngx-slider';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { GameConfig } from '../../interfaces/GameConfig';

@Component({
  selector: 'dph-food-settings',
  templateUrl: './food-settings.component.html',
  styleUrls: ['./food-settings.component.less'],
})
export class FoodSettingsComponent implements OnInit {
  public initialFoodCount: number = 10;
  public foodCountOptions: Options = {
    floor: 10,
    ceil: 500,
    showSelectionBar: true,
  };

  public initialAntCount: number = 1;
  public antCountOptions: Options = {
    floor: 1,
    ceil: 50,
    showSelectionBar: true,
  };

  public minSpeed: number = 1.3;
  public maxSpeed: number = 2.3;
  public speedOptions: Options = {
    floor: 1,
    ceil: 3,
    step: 0.1,
    minRange: 0.1,
    maxRange: 3,
    showTicks: false,
  };

  public minInventory: number = 1;
  public maxInventory: number = 10;
  public inventoryOptions: Options = {
    floor: 1,
    ceil: 10,
    step: 1,
    minRange: 1,
    maxRange: 10,
    showTicks: false,
  };

  public gameConfig: GameConfig = {
    foodCount: this.initialFoodCount,
    unitCount: this.initialAntCount,
    minSpeed: this.minSpeed,
    maxSpeed: this.maxSpeed,
    minInventory: this.minInventory,
    maxInventory: this.maxInventory,
  };

  constructor() {}

  ngOnInit(): void {}

  public foodCountChanged(value: number): void {
    this.gameConfig.foodCount = value;
  }

  public antCountChanged(value: number): void {
    this.gameConfig.unitCount = value;

    if (this.gameConfig.foodCount < this.gameConfig.unitCount) {
      this.gameConfig.foodCount = this.gameConfig.unitCount;
    }
  }

  public minSpeedChanged(value: number): void {
    this.gameConfig.minSpeed = value;
  }

  public maxSpeedChanged(value: number): void {
    this.gameConfig.maxSpeed = value;
  }

  public minInventoryChanged(value: number): void {
    this.gameConfig.minInventory = value;
  }

  public maxInventoryChanged(value: number): void {
    this.gameConfig.maxInventory = value;
  }
}
