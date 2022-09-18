import { VideoDetailResponse } from './../../models/video-detail-response';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { VideoService } from 'src/app/services/video.service';

@Component({
  selector: 'app-music',
  templateUrl: './music.component.html',
  styleUrls: ['./music.component.scss'],
})
export class MusicComponent implements OnInit {
  videoDetail: VideoDetailResponse | undefined;

  constructor(
    private activatedRoute: ActivatedRoute,
    private videoService: VideoService
  ) {}

  ngOnInit() {
    this.activatedRoute.params
      .pipe(switchMap((params) => this.videoService.getVideoDetail(params['id'])))
      .subscribe((videoDetail) => this.videoDetail = videoDetail);
  }
}
