import { SuggestVideoService } from './../../../../services/suggest-video.service';
import {
  Component,
  Input,
  OnDestroy,
  ViewChild,
  ElementRef,
  OnInit,
} from '@angular/core';
import { Video } from 'src/app/models/video';
import { Router } from '@angular/router';
import { debounce, filter, last, ReplaySubject, Subject, take, takeUntil, timer, switchMap, of, debounceTime } from 'rxjs';

@Component({
  selector: 'app-music-player',
  templateUrl: './music-player.component.html',
  styleUrls: ['./music-player.component.scss'],
})
export class MusicPlayerComponent implements OnInit, OnDestroy {
  private onDestroy$ = new Subject<void>();
  onToggleFavorite$ = new Subject<boolean>();

  @Input() video: Video | undefined;
  @ViewChild('audio') audio!: ElementRef<HTMLAudioElement>;

  isFavorite = false;

  constructor(
    private suggestVideoService: SuggestVideoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.onToggleFavorite$.pipe(debounceTime(200)).subscribe((value) => {
      console.log(value);
    })
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
