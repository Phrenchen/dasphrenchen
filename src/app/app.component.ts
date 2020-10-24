import { Component, AfterViewInit } from '@angular/core';
import { GameService } from './game/services/game.service';

@Component({
  selector: 'dph-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements AfterViewInit {

  public isGameActive: boolean = false;

  constructor(private gameService: GameService) {
  }

  ngAfterViewInit(): void {
    this.gameService.init();

    // start game on init
    // setTimeout(() => {
    //   this.gameService.start();
      
    // }, 200);
  }

  public onGameStateChange(gameIsActive: boolean): void {
    // console.log('game is active: ', gameIsActive);
    this.isGameActive = gameIsActive;
  }
}
