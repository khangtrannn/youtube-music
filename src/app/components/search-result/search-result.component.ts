import { SearchVideoService } from './../../services/search-video.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Video } from 'src/app/models/video';
import { Subject, switchMap, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss'],
})
export class SearchResultComponent implements OnInit, OnDestroy {
  private onDestroy$ = new Subject<void>();
  isVideoLoading = true;

  videos: Video[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private searchVideoService: SearchVideoService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams
      .pipe(
        tap(() => this.isVideoLoading = true),
        switchMap((params) => this.searchVideoService.searchVideo(params['keyword'])),
        takeUntil(this.onDestroy$)
      )
      .subscribe((videos) => {

        this.isVideoLoading = false;
        this.videos = videos;
      });
  }

  loadMore(): void {
    this.searchVideoService
      .searchVideoContinuation()
      .subscribe((videos) => this.videos.push(...videos));
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
