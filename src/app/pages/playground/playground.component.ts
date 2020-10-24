import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Feed } from 'src/app/interfaces/Feed';
import { User } from 'src/app/interfaces/User';
import { FeedService } from 'src/app/services/feed.service';

@Component({
  selector: 'dph-playground',
  templateUrl: './playground.component.html',
  styleUrls: ['./playground.component.less']
})
export class PlaygroundComponent implements OnInit {
  public feeds: Observable<any[]> = of([]);
  public users: Observable<any[]> = of([]);
  
  constructor(private feedService: FeedService) {
    this.users = this.feedService.getUsers();
    this.feeds = this.feedService.getFeeds();
   }

  ngOnInit(): void {
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
