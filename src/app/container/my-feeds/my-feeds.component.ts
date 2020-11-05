import { Component, Input, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Feed } from 'src/app/interfaces/Feed';
import { FeedService } from 'src/app/services/feed.service';

@Component({
  selector: 'dph-my-feeds',
  templateUrl: './my-feeds.component.html',
  styleUrls: ['./my-feeds.component.less']
})
export class MyFeedsComponent implements OnInit {

  public feeds: Observable<any[]> = of([]);
  public users: Observable<any[]> = of([]);


  constructor(private readonly feedService: FeedService,) { }

  ngOnInit(): void {
    this.users = this.feedService.getUsers();
    this.feeds = this.feedService.getFeeds();
  }

  public getViewMode(index: number): string {
    return index === 0 ? 'expanded' : 'compact';
  }

  public addNewFeed(): void {
    console.log('add new feed');
    const feed: Feed = this.feedService.createFeed();
    feed.author = 'Das Phrenchen';
    this.feedService.addFeed(feed).subscribe(result => {
      console.log('added feed', result);
    });
  }
  
}
