import { ActivatedRoute } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Video, VideoLoading } from 'src/app/models/video';
import { SearchVideoService } from 'src/app/services/search-video.service';
import { VideoService } from 'src/app/services/video.service';

const KEY_WORD = 'study with me';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss'],
})
export class SearchResultComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  private videos: Video[] = [];

  numberVideosPerRow!: number;
  skeletons = Array(12)
    .fill(-1)
    .map(() => new VideoLoading());

  constructor(
    private videoService: VideoService,
    private searchVideoService: SearchVideoService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.searchVideoService
      .searchVideo(
        this.activatedRoute.snapshot.queryParamMap.get('keyword') || KEY_WORD
      )
      .pipe(takeUntil(this.destroy$))
      .subscribe((videos) => {
        this.skeletons = [];
        this.videos = videos;
        this.numberVideosPerRow = this.videoService.getNumberVideosPerRow();
      });
  }

  loadMore(): void {
    this.skeletons = Array(this.numberVideosPerRow * 2)
      .fill(-1)
      .map(() => new VideoLoading());

    this.searchVideoService
      .searchVideoContinuation()
      .pipe(takeUntil(this.destroy$))
      .subscribe((videos) => this.videos.push(...videos));
  }

  getDisplayedVideos(): Video[] {
    return this.videos.slice(
      0,
      this.videos.length - (this.videos.length % this.numberVideosPerRow)
    );
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
