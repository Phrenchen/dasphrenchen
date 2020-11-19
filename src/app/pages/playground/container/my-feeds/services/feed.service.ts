import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, Subscription } from 'rxjs';
import { catchError, map, shareReplay, tap } from 'rxjs/operators';
import { Feed } from './../interfaces/Feed';
import { User } from './../interfaces/User';
import { API } from './../../../../../constants/API';

@Injectable({
  providedIn: 'root'
})
export class FeedService {


  private feeds: Feed[] = this.createFeeds();

  constructor(private http: HttpClient) { }


  public createFeed(): any {
    return   {
      data: {
        id: 'phren´s-test',
        author: 'phren',
        title: 'no title ' + Math.round(Math.random() * 1000),
        description: 'no description ' + Math.round(Math.random() * 1000),
        images: []
      }
    };
  }

  public getUsers(): Observable<User[]> {
    return this.http.get<any>(API.host + '/users')
    .pipe(
      map(result => {
        return result.data;
      }),
      shareReplay()
    );
  }

  public getFeeds(): Observable<Feed[]> {
    return this.http.get<any>(API.host + '/feeds')
    .pipe(
      map(result => {
        return result.data;
      }),
      shareReplay()
    );

    // return this.http.get<Feed[]>(this.host + '/feeds');
    
    // this.http.get<Feed[]>(this.host + '/feeds').subscribe(result => {console.log('received feeds', result);});
    // return of(this.feeds);
  }

  public addFeed(feed: Feed): Observable<any> {
    return this.http.post(API.host + '/feed/', feed);
  }

  public deleteFeed(feed: any): Observable<any> {
    let httpParams = new HttpParams().set('id', feed.ref['@ref'].id);
    let options = { params: httpParams };
    return this.http.delete(API.host + '/feed/',options)
      .pipe(
        catchError(this.handleError),
        tap(result => {
          console.log('deleted feed:', result);
        })
      );
  }
  private handleError(e: any): any {
    console.log('error deleting feed', e);
  };

  // public addFeed(feed: Feed): Subscription{
  //   console.log('adding feed', feed);
  //   return this.http.post(this.host + '/feeds', feed).subscribe(result => {
  //     console.log('add feed success', result);
  //   });
  // }

  public updateFeed(feed: Feed): Subscription {
    return this.http.post(API.host + '/feeds', feed).subscribe(result => {
      // console.log('add feed success', result);
    });
  }


  // PRIVATE

  private createFeeds(): Feed[] {
    return [
      {
        id: 'test-1',
        author: 'phren',
        title: 'Hello World',
        description: 'first feed ever :)',
        images: ['assets/images/curious_zelda_5_portrait.png']
      },
      {
        id: 'test-2',
        author: 'phren',
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
