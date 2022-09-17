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
  isLoading = true;
  videos: Video[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private videoService: VideoService
  ) {}

  ngOnInit() {
    this.activatedRoute.queryParams
      .pipe(
        tap(() => (this.isLoading = true)),
        switchMap((params) => this.videoService.searchVideo(params['keyword']))
      )
      .subscribe((videos) => {
        this.isLoading = false;
        this.videos = videos;
      });
  }

  onSearchScroll(): void {
    this.videoService.searchVideoContinuation().subscribe((response) => {
      this.videos.push(...response.videos);
    });
  }
}
