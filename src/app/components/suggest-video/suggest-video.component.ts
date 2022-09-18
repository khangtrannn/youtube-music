import { Subject, takeUntil } from 'rxjs';
import { VideoService } from 'src/app/services/video.service';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Video } from 'src/app/models/video';

@Component({
  selector: 'app-suggest-video',
  templateUrl: './suggest-video.component.html',
  styleUrls: ['./suggest-video.component.scss']
})
export class SuggestVideoComponent {
  private onDestroy$ = new Subject<void>();

  @Input() set suggestVideos(value: Video[] | undefined) {
    if (value) {
      this.videos = value;
      this.isVideoLoad = false;
    }
  }

  videos: Video[] = [];

  isVideoLoad = true;
  numberOfSkeletons = 9;

  constructor(private router: Router, private videoService: VideoService) {}

  onVideoTouched(videoId: string): void {
    this.router.navigate([`/music/${videoId}`]);
  }

  onScroll(): void {
    if (this.videoService.haveMoreSuggestion()) {
      this.numberOfSkeletons = 6;
      this.isVideoLoad = true;

      this.videoService.getSuggestVideosContinuation()
        .pipe(takeUntil(this.onDestroy$))
        .subscribe((videos) => {
          this.isVideoLoad = false;
          this.videos.push(...videos);
        });
    }
  }
}
