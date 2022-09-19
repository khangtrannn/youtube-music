import { Component, Input, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Video } from 'src/app/models/video';
import { SuggestVideoService } from './../../services/suggest-video.service';

@Component({
  selector: 'app-suggest-video',
  templateUrl: './suggest-video.component.html',
  styleUrls: ['./suggest-video.component.scss'],
})
export class SuggestVideoComponent implements OnInit {
  private onDestroy$ = new Subject<void>();
  videos: Video[] = [];
  isVideoLoading = true;

  constructor(private suggestVideoService: SuggestVideoService) {}

  ngOnInit(): void {
    this.suggestVideoService
      .getSuggestion()
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((videos) => {
        this.isVideoLoading = false;
        this.videos = videos;
      });
  }

  onLoadMore(): void {
    this.isVideoLoading = true;
    if (this.suggestVideoService.hasMoreSuggestion()) {
      this.suggestVideoService
        .getSuggestVideosContinuation()
        .pipe(takeUntil(this.onDestroy$))
        .subscribe((videos) => {
          this.isVideoLoading = false;
          this.videos.push(...videos);
        });
    }
  }
}
