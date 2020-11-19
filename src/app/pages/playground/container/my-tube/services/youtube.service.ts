import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { Playlist, PlaylistItems } from '../../../interfaces/Playlist';

import { Youtube } from './../constants/youtube';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {

  // Youtube API Key: AIzaSyBALgJMsSk4ur1joGhjrZDtaNIqSrsbUE8
  private apiKey = 'AIzaSyBALgJMsSk4ur1joGhjrZDtaNIqSrsbUE8';

  constructor(private http: HttpClient) { }


  public getPlaylists(userName: string): Observable<Playlist[]> {
    return this.getChannelIdByUserName(userName)
      .pipe(
        switchMap(result => {
          console.log('getChannelIdByUserName: ', result);
          return this.getLists(result, 5);
        }),
        tap(result => {
          console.log('got playlists: ', result);
        }),
        // switchMap(result => {
        //   const playlists: Playlist[] = [];
        //   if (!result[0]) {
        //     return of([]);
        //   }
        //   return this.getPlaylistItems(result[0].id, 10); // für jede playlist ihre items holen
        // }),
        map(result => {
          console.log('result', result);
          return result;  // TODO Playlist[]
        })
      );
  }


  public getChannelIdByUserName(userName: string): Observable<string> {
    const url: string = Youtube.baseUrl + 'channels?key=' + this.apiKey + '&forUsername=' + userName + '&part=id';
    return this.http.get<any>(url)
      .pipe(
        map(result => (result.items && result.items.length === 1) ? result.items[0].id : ''),
      );
  }

  // eigene hochgeladene videos?
  // public getVideosForChannel(channel: string, maxResults: number): Observable<any> {
  //   let url = Youtube.baseUrl + 'search?key=' + this.apiKey + '&channelId=' + channel + '&order=date&part=snippet &type=video,id&maxResults=' + maxResults

  //   return this.http.get(url)
  //     .pipe(
  //       map(res => {
  //         console.log('got videos:', res);
  //         return res;
  //       })
  //     )
  // }

  public getLists(channel: string, maxResults: number): Observable<Playlist[]> {
    let url = Youtube.baseUrl + 'playlists?key=' + this.apiKey + '&channelId=' + channel + '&order=date&part=id &type=video,id&maxResults=' + maxResults

    return this.http.get(url)
      .pipe(
        tap(result => console.log('getPlaylists:', result)),
        map(result => {
          return (result as any).items as [];
        })
      )
  }

  public getPlaylistItems(playlist: string, maxResults: number): Observable<PlaylistItems[]> {
    let url = Youtube.baseUrl + 'playlistItems?key=' + this.apiKey + '&playlistId=' + playlist + '&order=date&part=id &type=video,id&maxResults=' + maxResults

    console.log('getPlaylistItems', playlist);

    return this.http.get(url)
      .pipe(
        tap(result => console.log('getPlaylistItems for playlist:', result)),
        map(result => {
          return (result as any).items as [];
        })

      )
  }
}
