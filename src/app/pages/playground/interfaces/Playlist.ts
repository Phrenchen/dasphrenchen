export interface Playlist {
    id: string;
    name: string;
    playlistItems: PlaylistItems[];
}

export interface PlaylistItems {
    id: string;
    name: string;
    video: string;
    thumbNail: string;
}