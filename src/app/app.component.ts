import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'dph-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements AfterViewInit {


  constructor() {
  }

  ngAfterViewInit(): void {
  }

  public onGameStateChange(gameIsActive: boolean): void {
  }
}
