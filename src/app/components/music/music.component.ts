import { BackgroundService } from './../../services/background.service';
import { SuggestVideoService } from './../../services/suggest-video.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Video } from 'src/app/models/video';
import { VideoService } from 'src/app/services/video.service';

@Component({
  selector: 'app-music',
  templateUrl: './music.component.html',
  styleUrls: ['./music.component.scss'],
  providers: [VideoService],
})
export class MusicComponent implements OnInit {
  private onDestroy$ = new Subject<void>();
  videoDetail: Video | undefined;

  constructor(
    private activatedRoute: ActivatedRoute,
    private videoService: VideoService,
    private suggestVideoService: SuggestVideoService,
    private backgroundService: BackgroundService,
    private router: Router
  ) {}

  ngOnInit() {
    this.activatedRoute.params
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((params) => this.getVideoDetail(params['id']));
  }

  getVideoDetail(id: string): void {
    this.videoService
      .getVideoDetail(id)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((videoDetail) => {
        this.videoDetail = videoDetail;
        this.backgroundService.setBackground(videoDetail.thumbnail);
      });
  }

  onNextVideo(): void {
    const suggestVideo = this.suggestVideoService.getNextVideo();
    this.router.navigate([`/music/${suggestVideo.id}`]);
  }
}
