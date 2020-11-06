import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { tap } from 'rxjs/operators';
import { User } from '../../interfaces/User';
import { UserService } from '../../services/user.service';
import { YoutubeService } from '../../services/youtube.service';

@Component({
  selector: 'dph-my-tube',
  templateUrl: './my-tube.component.html',
  styleUrls: ['./my-tube.component.less']
})
export class MyTubeComponent implements OnInit {
  
  userForm = new FormGroup({
    name: new FormControl(''),
    ytChannelName: new FormControl(''),
    ytChannelId: new FormControl(''),
  });

  public isEditingUser: boolean = true;
  public user: User = this.userService.createNewUser();


  constructor(
    private readonly userService: UserService,
    private readonly youtube: YoutubeService) { }

    
  ngOnInit(): void {
    this.userForm.valueChanges
    .pipe(
      tap(result => console.log('tap ', result)),
      tap(result => {
        this.user = {...this.user, ...(result as User) }

        this.user = {
          name: result.name,
          ytChannelId: result.ytChannelId,
          ytChannelName: result.ytChannelName,
          playlists: this.user.playlists
        }

        console.log('user', this.user);
      })
    )
    .subscribe();


    
    // this.youtube.getVideosForChannel(YoutubeService.channelIdThePhrenchen, 5).subscribe(result => {
      //   console.log('received channel videos', result);
      // });
    }

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
      .subscribe(result => {
        console.log('updated user: ', result);
      });
    }

    // YOUTUBE
    public getChannelId(): void {
      const channelName: string = this.userForm.get('ytChannelName')?.value;
      
      console.log('get channel id for ', channelName);


      this.youtube.getChannelIdByUserName(channelName)
        // .pipe(
          // switchMap(result => {
          //   return this.youtube.getPlaylists(result, 5);
          // }),
          // tap(result => {
          //   console.log('got playlists: ', result);
          // }),
          // switchMap(result => {
          //   return this.youtube.getPlaylistItems(result.items[0].id, 10);
          // }),
        //   tap(result => console.log('got playlist items', result))
        // )
        .subscribe(result => {
          this.userForm.get('channelId')?.setValue(result);
          this.user.ytChannelId = result;
          this.user = {
            name: this.user.name,
            ytChannelId: this.user.ytChannelId,
            ytChannelName: this.user.ytChannelName,
            playlists: this.user.playlists
          }
  
          // this.getPlaylists();
        });
    }

    // TODO: user.channelName benutzen
    public getPlaylists(): void {
      this.youtube.getPlayLists('ThePhrenchen').subscribe(result => {
        console.log('received channel id', result);
      });
  }

}
