import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { AntGameService } from './services/ant-game.service';


@Component({
  selector: 'dph-food-game',
  templateUrl: './food-game.component.html',
  styleUrls: ['./food-game.component.less']
})
export class FoodGameComponent implements OnInit, AfterViewInit, OnDestroy  {

  // Highcharts: typeof Highcharts = Highcharts; // required
  // chartConstructor: string = 'chart'; // optional string, defaults to 'chart'
  // chartOptions: Highcharts.Options = { ... }; // required
  // chartCallback: Highcharts.ChartCallbackFunction = function (chart) {
  //   console.log('chart callback', chart);
  //  } // optional function, defaults to null
  // updateFlag: boolean = false; // optional boolean
  // oneToOneFlag: boolean = true; // optional boolean, defaults to false
  // runOutsideAngular: boolean = false; // optional boolean, defaults to false

  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {
    series: [{
      data: [1, 2, 3],
      type: 'line'
    }]
  };


  get generation(): number {
    return this.antGameService.currentGeneration;
  }

  constructor(private readonly antGameService: AntGameService) { }



  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    this.antGameService.canvas = document.querySelector('#ants-canvas') as HTMLCanvasElement;
    this.antGameService.startGame();
  }

  ngOnDestroy(): void {
    this.antGameService.stopGame();
  }
  // LIFE CYCLE end

  public startGame(): void {
    this.antGameService.stopGame(); // reset
    this.antGameService.startGame();
  }
}
