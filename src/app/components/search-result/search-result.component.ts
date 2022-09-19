import { VideoService } from './../../services/video.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Video } from 'src/app/models/video';
import { Subject, switchMap, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss'],
})
export class SearchResultComponent implements OnInit, OnDestroy {
  private onDestroy$ = new Subject<void>();

  videos: Video[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private videoService: VideoService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams
      .pipe(
        switchMap((params) => this.videoService.searchVideo(params['keyword'])),
        takeUntil(this.onDestroy$)
      )
      .subscribe((videos) => {
        this.videos = videos;
      });
  }

  onSearchScroll(): void {
    this.videoService
      .searchVideoContinuation()
      .subscribe((videos) => this.videos.push(...videos));
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
