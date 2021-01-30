import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as Highcharts from 'highcharts';
import { Observable, of, Subject } from 'rxjs';
import { FoodSettingsComponent } from './components/food-settings/food-settings.component';
import { AntHillConfig, UnitConfig } from './interfaces/AntsConfig';
import { AntGameService } from './services/ant-game.service';
import { GameConfig } from './interfaces/GameConfig';

@Component({
  selector: 'dph-food-game',
  templateUrl: './food-game.component.html',
  styleUrls: ['./food-game.component.less'],
})
export class FoodGameComponent implements OnInit, AfterViewInit, OnDestroy {
  // Highcharts: typeof Highcharts = Highcharts; // required
  // chartConstructor: string = 'chart'; // optional string, defaults to 'chart'
  // chartOptions: Highcharts.Options = { ... }; // required
  // chartCallback: Highcharts.ChartCallbackFunction = function (chart) {
  //   console.log('chart callback', chart);
  //  } // optional function, defaults to null
  // updateFlag: boolean = false; // optional boolean
  // oneToOneFlag: boolean = true; // optional boolean, defaults to false
  // runOutsideAngular: boolean = false; // optional boolean, defaults to false


  @ViewChild('highchartUnits') highchartUnits: HTMLDivElement | null = null;


  Highcharts: typeof Highcharts = Highcharts;
  unitChartOptions: Highcharts.Options = {
    series: [
      {
        data: [],
        type: 'spline',
      },
    ],
  };

  anthillChartOptions: Highcharts.Options = {
    series: [
      {
        data: [],
        type: 'line',
      },
    ],
  };

  gameTickIntervalId: any = null; // NodeJS.Timeout;
  anthillData: any[] = [];
  tickCounter: number = 0;
  antHillUpdateCooldownTicks: number = 10;
  chartHoverHandlerUnits: Observable<Event> = of();
  public isSettingsVisible: boolean = true;

  get generation(): number {
    return this.antGameService.currentGeneration;
  }

  public highchartUpdateTick$$: Subject<any> = new Subject<any>();

  // url params
  // TODO: map into GameConfig
  public urlConfig: GameConfig = {
    foodCount: 2,
    unitCount: 1,
    minInventory: 1,
    maxInventory: 2,
    minSpeed: .1,
    maxSpeed: 1,
  }


  @ViewChild('foodSettings') foodSettings: FoodSettingsComponent | null = null;





  // LIFE CYCLE
  constructor(private route: ActivatedRoute,
    private readonly antGameService: AntGameService) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.urlConfig.foodCount = params['fc'] ?? 10;
      this.urlConfig.unitCount = params['uc'] ?? 2;
      this.urlConfig.minInventory = params['mini'] ?? 1;
      this.urlConfig.maxInventory = params['maxi'] ?? 3;
      this.urlConfig.minSpeed = params['mins'] ?? .1;
      this.urlConfig.maxSpeed = params['maxs'] ?? 3;
    });
  }

  ngAfterViewInit(): void {
    this.antGameService.canvas = document.querySelector(
      '#ants-canvas'
    ) as HTMLCanvasElement;

    // setTimeout(this.antGameService.startGame, 500);
      // console.log('highchartUnits', this.highchartUnits);

      // if(this.highchartUnits) {
      //   this.chartHoverHandlerUnits = fromEvent(this.highchartUnits.nativeElement, 'hover');
      //   this.chartHoverHandlerUnits.subscribe(hoverEvent => {
      //     console.log('hovering over unit charts');
      //   });

      // }

    // this.highchartUnits?.addEventListener('hover')
      setTimeout(() => {
        this.startGame();

      }, 100);
  }

  ngOnDestroy(): void {
    clearInterval(this.gameTickIntervalId);

    this.anthillData = [];
    this.antGameService.stopGame();
  }
  // LIFE CYCLE end

  public startGame(): void {
    this.tickCounter = 0;
    this.anthillData = [];
    this.antGameService.stopGame(); // reset
    // old game resetted



    // new game
    this.antGameService.startGame(this.foodSettings?.config || null);
    this.updateUnitChart();

    // GAME UI Update Ticks 1/s
    this.highchartUpdateTick$$.subscribe((tickCounter) => {
      // console.log('wohoo', tickCounter);
      this.updateUnitChart();

      if (tickCounter % this.antHillUpdateCooldownTicks === 0) {
        this.updateAnthillChart();
      }
    });

    this.gameTickIntervalId = setInterval(
      () => this.highchartUpdateTick$$.next(this.tickCounter++),
      1000
    );
  }

  public toggleSettings(): void {
    this.isSettingsVisible = !this.isSettingsVisible;
  }


  // PRIVATE

  // charts
  updateAnthillChart() {
    this.anthillData.push(this.anthill.currentFoodCount);

    this.anthillChartOptions = {
      title: {
        text:
          'Gesammeltes Futter im Ameisenhügel: ' +
          this.anthillData[this.anthillData.length - 1],
      },
      series: [
        {
          // data: [1, 2, 3],
          data: this.anthillData,
          type: 'spline',
          // xAxis: {
          //   minRange: 5,
          // },
        },
      ],
    };
  }

  private updateUnitChart(): void {
    const foodCounts: number[] = this.units.map(
      (unit) => unit.currentInventory
    );

    // if (this.chartOptions) {
    this.unitChartOptions = {
      title: { text: 'Futter pro Einheit transportiert' },
      series: [
        {
          // data: [1, 2, 3],
          data: foodCounts,
          type: 'spline',
          // xAxis: {
          //   minRange: 5,
          // },
        },
      ],
    };
    // }
  }
  // charts end

  public get showInfos(): boolean {
    // console.log('TODO: get showInfos');
    return false;
  }

  public get anthill(): AntHillConfig {
    return this.antGameService.anthill;
  }

  public get units(): UnitConfig[] {
    return this.antGameService.units;
  }
}
