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

    // this.onToggleFavorite$
    //   .pipe(
    //     debounceTime(200),
    //     switchMap((isFavorite) => {
    //       const dto = {
    //         userId: this.userId!,
    //         video: this.video!,
    //       };

    //       if (isFavorite) {
    //         return this.videoService.favoriteVideo(dto);
    //       }

    //       return this.videoService.unfavoriteVideo(dto);
    //     })
    //   )
    //   .subscribe();
  }

  ngOnChanges(changes: SimpleChanges): void {
    const video = changes['video']?.currentValue;
    if (video) {
      document.title = this.video?.title as string;

      this.videoService
        .isFavorite(video.id)
        .pipe(takeUntil(this.onDestroy$))
        .subscribe((isFavorite) => (this.isFavorite = isFavorite));
    }
  }

  nextVideo(): void {
    const suggestVideo = this.suggestVideoService.getNextVideo();
    this.router.navigate([`/music/${suggestVideo.id}`]);
  }

  ngOnDestroy(): void {
    document.title = 'KT Music';
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
