import { Component, Input, OnInit } from '@angular/core';
import { Feed } from 'src/app/interfaces/Feed';

@Component({
  selector: 'dph-my-feeds',
  templateUrl: './my-feeds.component.html',
  styleUrls: ['./my-feeds.component.less']
})
export class MyFeedsComponent implements OnInit {

  @Input() feeds: any[] | null = [];

  constructor() { }

  ngOnInit(): void {
  }

  public getViewMode(index: number): string {
    return index === 0 ? 'expanded' : 'compact';
  }
  
}
