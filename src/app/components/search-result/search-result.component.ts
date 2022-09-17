import { VideoService } from './../../services/video.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Video } from 'src/app/models/video';
import { switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss'],
})
export class SearchResultComponent implements OnInit {
  isVideoLoad = true;
  numberOfSkeletons = 9;
  videos: Video[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private videoService: VideoService
  ) {}

  ngOnInit() {
    this.activatedRoute.queryParams
      .pipe(
        tap(() => {
          this.isVideoLoad = true;
          this.numberOfSkeletons = 9;
        }),
        switchMap((params) => this.videoService.searchVideo(params['keyword']))
      )
      .subscribe((videos) => {
        this.isVideoLoad = false;
        this.videos = videos;
      });
  }

  onSearchScroll(): void {
    this.isVideoLoad = true;
    this.numberOfSkeletons = 6;
    this.videoService.searchVideoContinuation().subscribe((response) => {
      this.isVideoLoad = false;
      this.videos.push(...response.videos);
    });
  }
}
