import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Feed } from './../interfaces/Feed';

@Injectable({
  providedIn: 'root'
})
export class FeedService {


  private feeds: Feed[] = this.createFeeds();

  constructor() { }


  public addFeed() {
    this.feeds.unshift(
      {
        title: 'no title ' + Math.round(Math.random() * 1000),
        description: 'no description ' + Math.round(Math.random() * 1000),
        images: []
      }
    );
  }

  public getFeeds(): Observable<Feed[]> {
    return of(this.feeds);
  }

  // PRIVATE
  private createFeeds(): Feed[] {
    return [
      {
        title: 'Hello World',
        description: 'first feed ever :)',
        images: ['assets/images/curious_zelda_5_portrait.png']
      },
      {
        title: 'note to self',
        description: 'must remember to...',
        images: [
          'assets/images/curious_zelda_1_portrait.png',
          'assets/images/curious_zelda_2_portrait.png',
          'assets/images/curious_zelda_3_portrait.png',
          'assets/images/curious_zelda_4_portrait.png',
          'assets/images/curious_zelda_6_portrait.png',
        ]
      }
    ];
  }
}
