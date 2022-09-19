import { SuggestVideoService } from './../../services/suggest-video.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, switchMap, takeUntil } from 'rxjs';
import { Video } from 'src/app/models/video';
import { VideoService } from 'src/app/services/video.service';

@Component({
  selector: 'app-music',
  templateUrl: './music.component.html',
  styleUrls: ['./music.component.scss'],
})
export class MusicComponent implements OnInit {
  private onDestroy$ = new Subject<void>();
  videoDetail: Video | undefined;

  constructor(
    private activatedRoute: ActivatedRoute,
    private videoService: VideoService,
    private suggestVideoService: SuggestVideoService,
  ) {}

  ngOnInit() {
    this.activatedRoute.params
      .pipe(
        switchMap((params) => this.videoService.getVideoDetail(params['id'])),
        takeUntil(this.onDestroy$)
      )
      .subscribe((videoDetail) => (this.videoDetail = videoDetail));

    this.activatedRoute.params
      .pipe(
        switchMap((params) => this.suggestVideoService.initData(params['id'])),
        takeUntil(this.onDestroy$)
      )
      .subscribe();
  }
}
