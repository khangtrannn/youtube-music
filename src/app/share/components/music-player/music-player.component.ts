import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { debounceTime, of, Subject, switchMap, takeUntil } from 'rxjs';
import { Video } from 'src/app/models/video';
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
  @ViewChild('audio') audio!: ElementRef<HTMLAudioElement>;

  isFavorite = false;
  userId: string | undefined;

  constructor(
    private userService: UserService,
    private suggestVideoService: SuggestVideoService,
    private router: Router,
    private videoService: VideoService
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

    this.onToggleFavorite$
      .pipe(
        debounceTime(200),
        switchMap((isFavorite) => {
          if (isFavorite) {
            return this.videoService.favoriteVideo({
              userId: this.userId!,
              video: this.video!,
            });
          }

          return of();
        })
      )
      .subscribe();
  }

  ngOnChanges(changes: SimpleChanges): void {
    const video = changes['video']?.currentValue;
    if (video) {
      this.videoService
        .isFavorite(video.id)
        .pipe(takeUntil(this.onDestroy$))
        .subscribe((isFavorite) => (this.isFavorite = isFavorite));
    }
  }

  nextVideo(): void {
    this.suggestVideoService
      .getNextVideo()
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((video) => {
        this.router.navigate([`/music/${video.id}`]);
      });
  }

  onVideoError(): void {
    this.audio.nativeElement.src = this.getAnotherStream();
    this.audio.nativeElement.play();
  }

  private getAnotherStream(): string {
    return `/api/stream/v2/${this.video?.id}`;
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
