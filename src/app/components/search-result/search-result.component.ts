import { VideoService } from 'src/app/services/video.service';
import { SearchVideoService } from './../../services/search-video.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Video } from 'src/app/models/video';
import { Subject, switchMap, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss'],
  providers: [VideoService],
})
export class SearchResultComponent implements OnInit, OnDestroy {
  private onDestroy$ = new Subject<void>();
  isVideoLoading = true;

  videos: Video[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private searchVideoService: SearchVideoService,
    private videoService: VideoService,
    private router: Router,
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

    this.videoService.onVideoChanged()
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((videoId) => this.router.navigate([`/music/${videoId}`]));
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
