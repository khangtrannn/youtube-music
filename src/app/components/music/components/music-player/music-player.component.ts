import { SuggestVideoService } from './../../../../services/suggest-video.service';
import { Component, Input, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Video } from 'src/app/models/video';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-music-player',
  templateUrl: './music-player.component.html',
  styleUrls: ['./music-player.component.scss']
})
export class MusicPlayerComponent implements OnDestroy {
  private onDestroy$ = new Subject<void>();

  @Input() video: Video | undefined;
  @ViewChild('audio') audio!: ElementRef<HTMLAudioElement>;

  constructor(private suggestVideoService: SuggestVideoService, private router: Router) {}

  nextVideo(): void {
    this.suggestVideoService.getNextVideo().pipe(takeUntil(this.onDestroy$)).subscribe((video) => {
      this.router.navigate([`/music/${video.id}`]);
    })
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
