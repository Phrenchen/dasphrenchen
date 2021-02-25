import { Injectable } from '@angular/core';
import { TeamConfig } from '../interfaces/GameConfig';

import * as Highcharts from 'highcharts';

@Injectable({
  providedIn: 'root',
})
export class ChartService {
  constructor() {}


  public getTeamColumnsStaticDefault(teams: TeamConfig[]): any {
    const teamColors: string[] = teams.map(team => team.color);

    return {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie',
        animation: false,
      },
      title: {
        text: 'Futter pro Team',
      },
      // tooltip: {
      //   pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
      // },
      accessibility: {
        point: {
          valueSuffix: '%',
        },
      },
      plotOptions: {
        pie: {
          colors: teamColors,
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: false,
          },
          showInLegend: true,
        },
      },
      series: this.updateTeamColumns(teams)
      // series: [
      //   {
      //     name: 'Brands',
      //     colorByPoint: true,
      //     data: this.updateTeamColumns(teams),
      //   },
      // ],
    };
  }

  private countTeamFood(team: TeamConfig): number {
    let totalInventory = 0;
    team.units.forEach((unit) => totalInventory + unit.currentInventory);
    return team.foodCount + totalInventory;
  }

  public updateTeamColumns(teams: TeamConfig[]): any {

    const seriesData: any[] = teams.map((team) => {
      return {
        name: team.name,
        y: this.countTeamFood(team),
        sliced: true,
        // selected: true,
      };
    });


    // return seriesData;


    return [{
      type: 'pie',
      name: 'Brands OMG!!!',
      colorByPoint: true,
      data: seriesData
      }];

  }
}
