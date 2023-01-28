import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of, Subject, takeUntil } from 'rxjs';
import { Video } from 'src/app/models/video';
import { VideoService } from 'src/app/services/video.service';
import { SuggestVideoService } from './../../services/suggest-video.service';

@Component({
  selector: 'app-suggest-video',
  templateUrl: './suggest-video.component.html',
  styleUrls: ['./suggest-video.component.scss'],
})
export class SuggestVideoComponent {
  private onDestroy$ = new Subject<void>();
  videoDetail: Video | undefined;

  constructor(
    private activatedRoute: ActivatedRoute,
    private suggestVideoService: SuggestVideoService
  ) {}

  ngOnInit() {
    this.activatedRoute.params
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((params) => this.getSuggestVideo(params['id']));
  }

  getSuggestVideo(id: string): void {
    this.suggestVideoService
      .initData(id)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe();
  }

  getInitVideos(): Observable<Video[]> {
    return this.suggestVideoService.getSuggestions();
  }

  getMoreVideos(): Observable<Video[]> {
    // if (this.suggestVideoService.hasMoreSuggestion()) {
    //   return this.suggestVideoService.getSuggestVideosContinuation();
    // }

    return of();
  }
}
