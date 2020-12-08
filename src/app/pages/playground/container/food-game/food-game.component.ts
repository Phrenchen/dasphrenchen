import { AfterViewInit, Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { ManuallyActivated } from '../../interfaces/ManuallyActivated';


@Component({
  selector: 'dph-food-game',
  templateUrl: './food-game.component.html',
  styleUrls: ['./food-game.component.less']
})
export class FoodGameComponent implements ManuallyActivated, OnInit, AfterViewInit  {

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





  private canvas: HTMLCanvasElement | null = null;
  private ctx: CanvasRenderingContext2D | null = null;

  constructor() { }


  ngOnInit(): void {
    this.activate();
  }

  ngAfterViewInit(): void {


    this.activate();
  }
  // LIFE CYCLE end

  public activate(): void {
    this.canvas = document.querySelector('#bezier-canvas');

    if (!this.canvas) return;


    this.ctx = this.canvas.getContext('2d');

    if(!this.ctx) return;

    this.ctx.lineWidth = 2;
    this.ctx.strokeStyle = '#ff0000';
    this.ctx.imageSmoothingEnabled = false;
    this.ctx.imageSmoothingQuality = "high" // low|medium|hight
  }
  public deactivate(): void {
    console.log('deactivate ants')
  }
}
