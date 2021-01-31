import { Options } from '@angular-slider/ngx-slider';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TeamConfig } from '../../interfaces/GameConfig';

@Component({
  selector: 'dph-food-settings',
  templateUrl: './food-settings.component.html',
  styleUrls: ['./food-settings.component.less'],
})
export class FoodSettingsComponent implements OnInit {
  @Input() config: TeamConfig = {
    id: 'id',
    name: 'default-team',
    units: [],
    color: 'deeppink',
    wins: 0,
    foodCount: 1,
    unitCount: 1,
    minInventory: 1,
    maxInventory: 2,
    minSpeed: 0.1,
    maxSpeed: 1,
  };

  public foodCountOptions: Options = {
    floor: 10,
    ceil: 500,
    showSelectionBar: true,
  };

  public antCountOptions: Options = {
    floor: 1,
    ceil: 50,
    showSelectionBar: true,
  };

  public speedOptions: Options = {
    floor: 1,
    ceil: 10,
    step: 0.1,
    minRange: 0.1,
    maxRange: 10,
    showTicks: false,
  };

  public inventoryOptions: Options = {
    floor: 1,
    ceil: 10,
    step: 1,
    minRange: 1,
    maxRange: 10,
    showTicks: false,
  };


  constructor() {}

  ngOnInit(): void {}

  public foodCountChanged(value: number): void {
    this.config.foodCount = value;
  }

  public antCountChanged(value: number): void {
    this.config.unitCount = value;

    if (this.config.foodCount < this.config.unitCount) {
      this.config.foodCount = this.config.unitCount;
    }
  }

  public minSpeedChanged(value: number): void {
    this.config.minSpeed = value;
  }

  public maxSpeedChanged(value: number): void {
    this.config.maxSpeed = value;
  }

  public minInventoryChanged(value: number): void {
    this.config.minInventory = value;
  }

  public maxInventoryChanged(value: number): void {
    this.config.maxInventory = value;
  }
}
