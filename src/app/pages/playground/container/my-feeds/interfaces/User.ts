import { Playlist } from './../../../interfaces/Playlist';

export interface User {
    name: string;
    ytChannelName: string;
    ytChannelId: string;

    playlists: Playlist[];

}

