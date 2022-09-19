import { SuggestVideoService } from './../../../../services/suggest-video.service';
import { Component, Input, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
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

  constructor(private suggestVideoService: SuggestVideoService, private router: Router) {}

  nextVideo(): void {
    this.suggestVideoService.getNextVideo().pipe(takeUntil(this.onDestroy$)).subscribe((video) => {
      this.router.navigate([`/music/${video.id}`]);
    })
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
