import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { mergeMap, takeUntil, tap } from 'rxjs/operators';
import { User } from '../../container/my-feeds/interfaces/User';
import { UserService } from '../../container/my-feeds/services/user.service';
import { Playlist } from '../../interfaces/Playlist';

import { ManuallyActivated } from './../../interfaces/ManuallyActivated';
import { YoutubeService } from './services/youtube.service';

@Component({
  selector: 'dph-my-tube',
  templateUrl: './my-tube.component.html',
  styleUrls: ['./my-tube.component.less']
})
export class MyTubeComponent implements OnInit, ManuallyActivated {

  userForm = new FormGroup({
    ytChannelName: new FormControl(''),
    ytChannelId: new FormControl(''),
  });

  public isEditingUser: boolean = true;
  public user: User = this.userService.createNewUser();
  public playlists: Playlist[] = [
    {
      id: '-',
      name: 'no playlists',
      playlistItems: []
    }
  ];

  private isDeactivated$$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  private isDeactivated$: Observable<boolean> = this.isDeactivated$$.asObservable();


  constructor(
    private readonly userService: UserService,
    private readonly youtube: YoutubeService) { }


  ngOnInit(): void {}
  // life cycle end

  // ManuallyActivated
  public activate(): void {
    this.isDeactivated$$.next(false);

    console.log('activating my tube');


    this.userForm.valueChanges
      .pipe(
        tap(result => console.log('tap ', result)),
        tap(result => {
          // this.user = { ...this.user, ...(result as User) }

          this.user = {
            name: result.name,
            ytChannelId: result.ytChannelId,
            ytChannelName: result.ytChannelName,
            playlists: this.user.playlists
          }

          console.log('user', this.user);
        }),
        takeUntil(this.isDeactivated$)
      )
      .subscribe();
  }

  public deactivate(): void {
    this.isDeactivated$$.next(true);
  }
  // ManuallyActivated end

  // USER
  public editUser(): void {
    this.isEditingUser = true;
  }

  public cancelUserEdit(): void {
    this.isEditingUser = false;
  }

  public updateUser(): void {
    // this.isEditingUser = true;
    this.user.ytChannelName = this.userForm.get('ytChannelName')?.value;
    this.user.name = this.userForm.get('userName')?.value;

    this.userService.updateUser(this.user)
      .pipe(
        mergeMap( result => {
          return this.youtube.getChannelIdByUserName(this.user.ytChannelName);
        }),
      )
      .subscribe(result => {
        console.log('received playlists: ', result);
      });
  }

  // YOUTUBE
  // public getChannelId(): void {
  //   const channelName: string = this.userForm.get('ytChannelName')?.value;

  //   console.log('get channel id for ', channelName);


  //   this.youtube.getChannelIdByUserName(channelName)
  //     // .pipe(
  //     // switchMap(result => {
  //     //   return this.youtube.getPlaylists(result, 5);
  //     // }),
  //     // tap(result => {
  //     //   console.log('got playlists: ', result);
  //     // }),
  //     // switchMap(result => {
  //     //   return this.youtube.getPlaylistItems(result.items[0].id, 10);
  //     // }),
  //     //   tap(result => console.log('got playlist items', result))
  //     // )
  //     .subscribe(result => {
  //       this.userForm.get('channelId')?.setValue(result);
  //       this.user.ytChannelId = result;
  //       this.user = {
  //         name: this.user.name,
  //         ytChannelId: this.user.ytChannelId,
  //         ytChannelName: this.user.ytChannelName,
  //         playlists: this.user.playlists
  //       }

  //       // this.getPlaylists();
  //     });
  // }

  // TODO: user.channelName benutzen
  public getPlaylists(): void {
    const channelName: string = this.userForm.get('ytChannelName')?.value;
    this.youtube.getPlaylists(channelName).subscribe(result => {
      console.log('received getPlaylists getPlaylists', result);
      this.playlists = result;
    });
  }

}
