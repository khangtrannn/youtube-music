import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil, Observable } from 'rxjs';
import { Video, VideoLoading } from 'src/app/models/video';
import { VideoService } from 'src/app/services/video.service';

@Component({
  selector: 'app-video-list',
  templateUrl: './video-list.component.html',
  styleUrls: ['./video-list.component.scss'],
})
export class VideoListComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  private videos: Video[] = [];

  numberVideosPerRow!: number;
  skeletons = Array(12)
    .fill(-1)
    .map(() => new VideoLoading());

  @Input() getInItVideos!: () => Observable<Video[]>;
  @Input() getMoreVideos!: () => Observable<Video[]>;

  constructor(private videoService: VideoService) {}

  ngOnInit(): void {
    console.log(this.getInItVideos);

    this.getInItVideos()
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

    this.getMoreVideos()
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
