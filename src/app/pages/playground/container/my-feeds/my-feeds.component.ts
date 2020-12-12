import { Component, Input, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Feed } from './interfaces/Feed';

import { ManuallyActivated } from './../../interfaces/ManuallyActivated';
import { FeedService } from './services/feed.service';

@Component({
  selector: 'dph-my-feeds',
  templateUrl: './my-feeds.component.html',
  styleUrls: ['./my-feeds.component.less']
})
export class MyFeedsComponent implements OnInit, ManuallyActivated {

  public feeds$: Observable<any[]> = of([]);
  public users$: Observable<any[]> = of([]);


  constructor(private readonly feedService: FeedService,) { }

  ngOnInit(): void {
    this.activate();
  }
  // life cycle end

  // ManuallyActivated
  public activate(): void {
    this.users$ = this.feedService.getUsers();
    this.feeds$ = this.feedService.getFeeds();
  }
  public deactivate(): void {

  }
  // ManuallyActivated end

  public getViewMode(index: number): string {
    return index === 0 ? 'expanded' : 'compact';
  }

  public addNewFeed(): void {
    const feed: Feed = this.feedService.createFeed();
    feed.author = 'Das Phrenchen';  // TODO
    this.feedService.addFeed(feed).subscribe();
  }

}
