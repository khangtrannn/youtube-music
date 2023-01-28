import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { debounceTime, of, Subject, switchMap, takeUntil } from 'rxjs';
import { Video } from 'src/app/models/video';
import { FavoriteService } from 'src/app/services/favorite.service';
import { VideoService } from 'src/app/services/video.service';
import { SuggestVideoService } from '../../../services/suggest-video.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-music-player',
  templateUrl: './music-player.component.html',
  styleUrls: ['./music-player.component.scss'],
})
export class MusicPlayerComponent implements OnInit, OnDestroy, OnChanges {
  private onDestroy$ = new Subject<void>();
  onToggleFavorite$ = new Subject<boolean>();

  @Input() video: Video | undefined;
  @Output() onNextVideo = new EventEmitter<void>();

  @ViewChild('audio') audio!: ElementRef<HTMLAudioElement>;

  isFavorite = false;
  userId: string | undefined;

  constructor(
    private userService: UserService,
    private suggestVideoService: SuggestVideoService,
    private router: Router,
    private favoriteService: FavoriteService
  ) {}

  ngOnInit(): void {
    this.userService
      .getUser()
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((user) => {
        if (user) {
          this.userId = user.id;
        }
      });
  }

  ngOnChanges(changes: SimpleChanges): void {
    const video = changes['video']?.currentValue;
    if (video) {
      document.title = this.video?.title as string;

      this.favoriteService
        .isFavorite(video.id)
        .pipe(takeUntil(this.onDestroy$))
        .subscribe((isFavorite) => (this.isFavorite = isFavorite));
    }
  }

  nextVideo(): void {
    this.onNextVideo.emit();
  }

  ngOnDestroy(): void {
    document.title = 'KT Music';
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
