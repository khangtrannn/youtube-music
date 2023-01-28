import { FavoriteService } from 'src/app/services/favorite.service';
import { UserService } from './../../../services/user.service';
import { Component, Input, OnDestroy } from '@angular/core';
import { Video } from 'src/app/models/video';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-video-card',
  templateUrl: './video-card.component.html',
  styleUrls: ['./video-card.component.scss'],
})
export class VideoCardComponent implements OnDestroy {
  private destroy$ = new Subject<void>();

  @Input() video!: Video;
  @Input() routerLink = '';

  constructor(
    public userService: UserService,
    public favoriteService: FavoriteService
  ) {}

  onToggleFavorite(video: Video): void {
    this.favoriteService
      .toggleFavorite(video)
      .pipe(takeUntil(this.destroy$))
      .subscribe();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
