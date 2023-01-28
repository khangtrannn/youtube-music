import { VideoService } from 'src/app/services/video.service';
import { Component, OnInit } from '@angular/core';
import { Video } from 'src/app/models/video';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss'],
  providers: [VideoService],
})
export class PlaylistComponent {
  playingVideo: Video | undefined;
  favorites$ = this.videoService.getAllFavorites();

  constructor(public videoService: VideoService) {}

  removeFromFavorite(id: string): void {
    // this.videoService.unfavoriteVideo(id);
  }
}
