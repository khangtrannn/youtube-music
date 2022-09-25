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
export class PlaylistComponent implements OnInit {
  private onDestroy$ = new Subject<void>();

  playingVideo: Video | undefined;
  favorites: Video[] = [];
  isLoading = true;

  constructor(private videoService: VideoService) {}

  ngOnInit() {
    this.videoService.getAllFavorites().pipe(takeUntil(this.onDestroy$)).subscribe((favorites) => {
      this.favorites = favorites;
      this.playingVideo = favorites[0];
      this.isLoading = false;
    });

    this.videoService.onVideoChanged().pipe(takeUntil(this.onDestroy$)).subscribe((videoId) => {
      const video = this.favorites.find((favorite) => favorite.id === videoId);
      this.playingVideo = video;
    });

    this.videoService.onUnfavorite().pipe(takeUntil(this.onDestroy$)).subscribe((videoId) => {
      this.favorites = this.favorites.filter((favorite) => favorite.id !== videoId);
    });
  }
}
