import { Subject, takeUntil } from 'rxjs';
import { FavoriteService } from './../../services/favorite.service';
import { VideoService } from 'src/app/services/video.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Video } from 'src/app/models/video';
import { trigger, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss'],
  providers: [VideoService],
  animations: [
    trigger('simpleFadeAnimation', [
      transition(
        ':leave',
        animate(
          400,
          style({
            opacity: 0,
            transform: 'translateX(-100%)',
          })
        )
      ),
    ]),
  ],
})
export class PlaylistComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  playingVideo: Video | undefined;
  favorites: Video[] = [];
  isLoading = true;

  constructor(
    public videoService: VideoService,
    private favoriteService: FavoriteService
  ) {}

  ngOnInit(): void {
    this.favoriteService
      .getAllFavorites()
      .pipe(takeUntil(this.destroy$))
      .subscribe((favorites) => {
        this.isLoading = false;
        this.favorites = favorites;
      });
  }

  removeFromFavorite(index: number, video: Video): void {
    this.favorites.splice(index, 1);
    this.favoriteService
      .removeFromFavorite(video)
      .pipe(takeUntil(this.destroy$))
      .subscribe();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
