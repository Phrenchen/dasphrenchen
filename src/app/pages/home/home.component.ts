import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FeedService } from 'src/app/services/feed.service';

import { Feed } from './../../interfaces/Feed';


@Component({
  selector: 'dph-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {

  public feeds: Observable<Feed[]>;

  constructor(private feedService: FeedService) {
    this.feeds = this.feedService.getFeeds();
   }

  ngOnInit(): void {
    
  }

  public addNewFeed(): void {
    this.feedService.addFeed();
  }
}
