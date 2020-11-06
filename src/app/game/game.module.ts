import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameComponent } from './game/game.component';
import { PixiComponent } from './pixi/pixi.component';
import { UnitService } from './services/unit.service';
import { PixiService } from './services/pixi.service';
import { UnitTweenService } from './services/unit-tween.service';

declare var PIXI2:any;

@NgModule({
  exports: [
    GameComponent
  ],
  declarations: [GameComponent, PixiComponent],
  imports: [
    CommonModule
  ],
  providers: [
    UnitService,
    UnitTweenService,
    PixiService
  ]
})
export class GameModule { }
